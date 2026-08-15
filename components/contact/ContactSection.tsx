"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT, OPENING_HOURS, SALON_NAME } from "@/lib/config";
import BookingButton from "@/components/booking/BookingButton";

export default function ContactSection() {
  const [showMap, setShowMap] = useState(false);

  return (
    <section
      id="standort"
      className="relative border-t border-line bg-paper px-6 py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl">
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
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-6xl lg:text-7xl font-thin tracking-wide text-stone-400 mb-4">
                  KASSEL
                </h2>
                <div className="space-y-1 text-sm lg:text-base font-light text-ink">
                  <p>{CONTACT.street}</p>
                  <p>{CONTACT.postalCode} {CONTACT.city}</p>
                </div>
              </div>

              {/* Map Link */}
              <motion.a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display text-sm font-light tracking-wide text-ink hover:text-barber-red transition-colors"
                whileHover={{ x: 4 }}
              >
                <span className="relative">
                  Route öffnen
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-barber-red"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 4 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
              </motion.a>
            </div>

            {/* Opening Hours - Desktop Only */}
            <div className="hidden lg:block space-y-4">
              <h3 className="font-display text-sm font-light uppercase tracking-[0.2em] text-stone-500">
                Öffnungszeiten
              </h3>
              <div className="space-y-2 text-sm text-ink">
                {OPENING_HOURS.map((hour, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between gap-8 group cursor-default"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span className="font-light group-hover:text-barber-red transition-colors">
                      {hour.day}
                    </span>
                    <span className="font-light text-stone-500 group-hover:text-stone-400 transition-colors">
                      {hour.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Phone & Booking */}
          <div className="flex flex-col items-start justify-between lg:items-end">
            {/* Phone */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-light uppercase tracking-[0.2em] text-stone-500">
                Telefon
              </h3>
              <motion.a
                href={CONTACT.phoneHref}
                className="inline-block font-display text-3xl lg:text-4xl font-thin tracking-wide text-ink hover:text-barber-blue transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {CONTACT.phone}
              </motion.a>
            </div>

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
        <div className="mt-20 lg:mt-32 h-px bg-line" />

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="font-display text-xs font-light uppercase tracking-[0.2em] text-stone-400">
            {SALON_NAME}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
