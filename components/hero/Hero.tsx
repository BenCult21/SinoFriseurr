"use client";

import { motion } from "framer-motion";
import BookingButton from "@/components/booking/BookingButton";

export default function Hero() {
  return (
    <section
      id="start"
      className="relative min-h-screen flex flex-col items-center justify-center bg-paper px-6 py-32"
    >
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main Headline */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="font-display text-7xl sm:text-8xl lg:text-9xl font-thin tracking-wide leading-[1.1] text-ink"
          >
            SINO
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-thin tracking-wide leading-[1.1] text-ink"
          >
            Friseurstudio
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-thin tracking-wide leading-[1.1] text-stone-400"
          >
            Kassel
          </motion.p>
        </div>

        {/* Booking Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-16"
        >
          <BookingButton label="Termin buchen" modal />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-widest text-stone-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="h-px w-px bg-stone-300" />
            <div className="h-4 w-px bg-gradient-to-b from-stone-300 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
