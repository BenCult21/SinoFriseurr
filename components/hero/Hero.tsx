"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import BookingButton from "@/components/booking/BookingButton";
import { CONTACT } from "@/lib/config";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scroll = window.scrollY;
      const progress = Math.min(scroll / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="start"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
      style={{
        backgroundImage: "url('/images/salon-lounge.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-paper/85" />
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 1 - scrollProgress * 0.5,
        }}
      >
        {/* Red accent glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-barber-red blur-3xl opacity-8"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Blue accent glow */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-barber-blue blur-3xl opacity-8"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center text-center relative z-20 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main Headline - Editorial Character */}
        <div className="space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              y: scrollProgress * -100,
            }}
          >
            <h1 className="font-hero text-7xl sm:text-8xl lg:text-[150px] xl:text-[180px] font-light tracking-tight leading-[0.85] text-ink glow-title">
              SINO
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
            style={{
              y: scrollProgress * -60,
            }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-regular tracking-wide text-stone-400">
              FRISEURSTUDIO
            </h2>
          </motion.div>

          {/* Location - with red accent */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex items-center justify-center gap-4 pt-4"
            style={{
              y: scrollProgress * -40,
            }}
          >
            <motion.div
              className="h-px w-12 bg-barber-red"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <p className="font-heading text-xl font-medium text-ink tracking-wider">
              KASSEL
            </p>
            <motion.div
              className="h-px w-12 bg-barber-blue"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Premium Booking CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-20"
        >
          <BookingButton label="TERMIN VEREINBAREN" modal />
        </motion.div>

        {/* Contact Info - Clickable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 space-y-3 text-center"
        >
          <motion.a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-inter text-sm text-stone-500 hover:text-barber-red transition-colors"
            whileHover={{ x: 8 }}
          >
            {CONTACT.street}
            <br />
            {CONTACT.postalCode} {CONTACT.city}
          </motion.a>

          <motion.a
            href={CONTACT.phoneHref}
            className="block font-inter text-sm text-stone-400 hover:text-barber-blue transition-colors"
            whileHover={{ x: -8 }}
          >
            {CONTACT.phone}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - Hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          opacity: 1 - scrollProgress,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-stone-600 tracking-widest uppercase">
            Scroll
          </p>
          <motion.div className="h-6 w-px bg-gradient-to-b from-barber-red to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
