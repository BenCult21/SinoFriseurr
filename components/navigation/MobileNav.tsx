"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SALON_NAME } from "@/lib/config";

const scrollToSection = (href: string) => {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

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

  const menuItems = [
    { label: "START", href: "#" },
    ...NAV_LINKS,
  ];

  return (
    <div className="lg:hidden fixed right-4 top-6 z-50">
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center"
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6 text-white transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-paper/95 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel - Slide in from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-paper px-6 py-8 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-xl font-light tracking-wide text-white"
                >
                  {SALON_NAME}
                </motion.h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-white transition-colors"
                  whileTap={{ scale: 0.95 }}
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
              </div>

              {/* Menu Items */}
              <nav className="space-y-1 mb-12">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 0.3,
                    }}
                    className="block w-full text-left px-3 py-2.5 rounded-lg transition-all group"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.0)",
                    }}
                    whileHover={{
                      background: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <span className="text-base font-light text-white group-hover:text-stone-100 transition-colors">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Booking CTA */}
              <motion.button
                onClick={() => {
                  const bookingElement = document.querySelector(
                    'button[aria-label*="Termin"]'
                  );
                  if (bookingElement instanceof HTMLButtonElement) {
                    bookingElement.click();
                  }
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="w-full px-4 py-3 rounded-lg font-light text-white transition-all"
                style={{
                  background: "rgba(255, 46, 59, 0.9)",
                  border: "1px solid rgba(255, 46, 59, 0.6)",
                }}
                whileHover={{
                  background: "rgba(255, 46, 59, 1)",
                }}
              >
                Termin vereinbaren
              </motion.button>

              {/* Divider */}
              <motion.div
                className="mt-10 pt-8 border-t border-stone-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs font-light text-stone-400 text-center">
                  SINO Friseurstudio
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
