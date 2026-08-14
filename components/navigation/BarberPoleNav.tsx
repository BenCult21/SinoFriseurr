"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/config";

export default function BarberPoleNav() {
  const [isOpen, setIsOpen] = useState(false);

  const stripeCount = 24;
  const stripeWidth = 100 / stripeCount;

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
      {/* Barber Pole Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-20 w-20 overflow-hidden rounded-full bg-paper shadow-lg border border-stone-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotating Stripes */}
        <motion.div
          animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, ease: "linear", repeat: isOpen ? Infinity : 0 }}
          className="absolute inset-0"
        >
          {Array.from({ length: stripeCount }).map((_, i) => (
            <div
              key={i}
              className={`absolute h-full ${
                i % 3 === 0
                  ? "bg-barber-red"
                  : i % 3 === 1
                    ? "bg-paper border-l border-stone-200"
                    : "bg-barber-blue"
              }`}
              style={{
                width: `${stripeWidth}%`,
                left: `${i * stripeWidth}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center bg-paper/80 backdrop-blur">
          <motion.span
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            className="text-xs font-thin uppercase tracking-wider text-ink"
          >
            Menu
          </motion.span>
        </div>
      </motion.button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-32 w-56 rounded-lg bg-paper shadow-xl border border-stone-200 overflow-hidden"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-6 py-4 font-display text-sm font-light tracking-wide text-ink border-b border-stone-100 last:border-b-0 hover:bg-stone-50 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
