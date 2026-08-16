"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CONTACT, OPENING_HOURS, SALON_NAME } from "@/lib/config";
import BookingButton from "@/components/booking/BookingButton";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="standort"
      className="relative border-t border-line bg-paper px-6 py-32 lg:py-48 overflow-hidden"
    >
      {/* Animated Coordinate Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal animated lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.03) 80%, transparent 100%)`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Vertical animated lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{
              background: `linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.03) 80%, transparent 100%)`,
              left: `${20 + i * 20}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Subtle moving gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 800px 400px at 20% 50%, rgba(255, 100, 90, 0.02) 0%, transparent 60%)",
          }}
          animate={{
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid gap-20 lg:grid-cols-2 lg:gap-40"
        >
          {/* Left: Address & Opening Hours */}
          <div className="flex flex-col justify-between">
            {/* Address */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="font-display text-7xl lg:text-8xl font-thin tracking-widest text-white mb-8 leading-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  KASSEL
                </motion.h2>

                {/* Coordinate-style address display */}
                <div className="space-y-4">
                  <motion.div
                    className="font-mono text-xs uppercase tracking-widest text-stone-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <p className="text-stone-500">Adresse</p>
                    <p className="text-stone-200 mt-2 font-light">{CONTACT.street}</p>
                  </motion.div>

                  <motion.div
                    className="font-mono text-xs uppercase tracking-widest text-stone-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  >
                    <p className="text-stone-500">PLZ / Stadt</p>
                    <p className="text-stone-200 mt-2 font-light">{CONTACT.postalCode} {CONTACT.city}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Map Link */}
              <motion.a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display text-sm font-light tracking-wide text-stone-300 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="relative group-hover:text-white transition-colors">
                  Route öffnen
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-barber-red"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.svg
                  className="w-4 h-4 text-stone-300 group-hover:text-barber-red transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
              </motion.a>
            </div>

            {/* Opening Hours - Desktop Only */}
            <motion.div
              className="hidden lg:block space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-stone-500">
                Öffnungszeiten
              </h3>
              <div className="space-y-2 text-sm">
                {OPENING_HOURS.map((hour, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between gap-8 group cursor-default px-4 py-3 rounded-lg transition-all"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                    whileHover={{
                      background: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <span className="font-light text-stone-300 group-hover:text-white transition-colors">
                      {hour.day}
                    </span>
                    <span className="font-light text-white group-hover:text-stone-100 transition-colors">
                      {hour.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Phone & Booking */}
          <div className="flex flex-col items-start justify-between lg:items-end">
            {/* Phone */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-stone-500">
                Telefon
              </h3>
              <motion.a
                href={CONTACT.phoneHref}
                className="inline-flex flex-col items-start lg:items-end"
              >
                <motion.span
                  className="font-display text-3xl lg:text-4xl font-thin tracking-wide text-white group"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="group-hover:text-barber-blue transition-colors">{CONTACT.phone}</span>
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Booking Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 lg:mt-0"
            >
              <BookingButton label="Termin buchen" />
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-20 lg:mt-32 h-px"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
            {SALON_NAME}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
