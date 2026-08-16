"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/config";

export default function BarberPoleNav() {
  const [isOpen, setIsOpen] = useState(false);
  const stripeCount = 24;
  const stripeWidth = 100 / stripeCount;

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { label: "START", href: "#" },
    ...NAV_LINKS,
  ];

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
      {/* Barber Pole Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-20 w-20 overflow-hidden rounded-full bg-paper shadow-lg border border-stone-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Navigation schließen" : "Navigation öffnen"}
        aria-expanded={isOpen}
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

      {/* Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-paper/95 backdrop-blur-lg"
              onClick={() => setIsOpen(false)}
            />

            {/* Background Typography Animation */}
            <motion.div
              className="fixed inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Large background text elements */}
              {["SINO", "FRISEURSTUDIO", "KASSEL"].map((text, idx) => (
                <motion.div
                  key={text}
                  className="absolute text-white font-display font-thin pointer-events-none select-none"
                  style={{
                    fontSize: "clamp(80px, 20vw, 400px)",
                    opacity: 0.02,
                    top: `${30 + idx * 35}%`,
                    left: `${idx % 2 === 0 ? "-10%" : "50%"}`,
                  }}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 0.02, x: 0 }}
                  exit={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {text}
                </motion.div>
              ))}

              {/* Animated grid background */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute w-full h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.02), transparent)`,
                    top: `${20 + i * 20}%`,
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Navigation Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="fixed inset-0 pointer-events-none flex items-center justify-center z-20"
            >
              <div className="pointer-events-auto max-w-2xl px-6 w-full">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-16"
                >
                  <h2 className="font-display text-5xl lg:text-6xl font-thin tracking-wider text-white">
                    Navigation
                  </h2>
                  <motion.div
                    className="mt-4 h-px w-20 bg-barber-red"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </motion.div>

                {/* Nav Items Grid */}
                <nav className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + i * 0.08,
                        ease: "easeOut",
                      }}
                      className="group flex items-baseline gap-6 py-3 px-4 rounded-lg transition-all"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.0)",
                      }}
                      whileHover={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Item Number */}
                      <motion.span
                        className="font-mono text-xs font-thin tracking-widest text-stone-400 group-hover:text-barber-red transition-colors min-w-12"
                        whileHover={{ scale: 1.1 }}
                      >
                        {String(i).padStart(2, "0")}
                      </motion.span>

                      {/* Item Label */}
                      <motion.span
                        className="font-heading text-lg lg:text-xl font-light text-white group-hover:text-white transition-colors flex-1"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>

                      {/* Arrow Indicator */}
                      <motion.svg
                        className="w-4 h-4 text-stone-400 group-hover:text-barber-red transition-colors opacity-0 group-hover:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ x: -8, opacity: 0 }}
                        whileHover={{ x: 4, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </motion.svg>
                    </motion.a>
                  ))}
                </nav>

                {/* Close Hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-16 text-xs font-light text-stone-400 text-center"
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ESC zum Schließen
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="fixed right-6 top-6 z-30 flex h-10 w-10 items-center justify-center text-white hover:text-barber-red transition-colors pointer-events-auto"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              aria-label="Schließen"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
