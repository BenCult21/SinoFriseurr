"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import BookingButton from "@/components/booking/BookingButton";

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
      className="relative min-h-screen flex flex-col items-center justify-center bg-paper px-6 py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 1 - scrollProgress * 0.5,
        }}
      >
        {/* Red accent glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-barber-red blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Blue accent glow */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-barber-blue blur-3xl opacity-5"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center text-center relative z-10 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main Headline - VERY LARGE */}
        <div className="space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              y: scrollProgress * -100,
            }}
          >
            <h1 className="font-heading text-8xl sm:text-9xl lg:text-[180px] xl:text-[220px] font-bold tracking-tighter leading-[0.8] text-ink">
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
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-stone-400">
              FRISEURSTUDIO
            </h2>
          </motion.div>

          {/* Location - with red accent */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex items-center justify-center gap-4"
            style={{
              y: scrollProgress * -40,
            }}
          >
            <div className="h-px w-8 bg-barber-red" />
            <p className="font-heading text-2xl font-semibold text-ink tracking-wide">
              KASSEL
            </p>
            <div className="h-px w-8 bg-barber-blue" />
          </motion.div>
        </div>

        {/* Booking CTA - Premium style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-20"
        >
          <motion.a
            href="#booking"
            className="group inline-flex items-center gap-4 font-heading text-lg font-semibold text-ink hover:text-barber-red transition-colors duration-300 border-b-2 border-stone-400 hover:border-barber-red pb-2"
            whileHover={{ x: 10 }}
            whileTap={{ x: 5 }}
          >
            TERMIN VEREINBAREN
            <motion.span
              className="text-barber-red"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Address info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-inter text-sm text-stone-500 tracking-wide">
            Kurt-Schumacher-Straße 31, 34117 Kassel
          </p>
          <p className="font-inter text-sm text-stone-500 tracking-wide mt-2">
            0561 76602459
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
