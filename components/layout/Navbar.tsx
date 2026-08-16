"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SALON_NAME, NAV_LINKS, CONTACT } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-paper/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-line)]" : "bg-paper/50 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="flex items-center justify-between gap-8">
          {/* Left: Logo */}
          <motion.a
            href="#start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-xs font-light uppercase tracking-[0.3em] text-ink hover:text-barber-red transition-colors whitespace-nowrap"
            whileHover={{
              letterSpacing: "0.35em",
              textShadow: "0 0 20px rgba(255, 46, 59, 0.5)",
            }}
          >
            {SALON_NAME}
          </motion.a>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-xs font-light uppercase tracking-wider text-stone-300 hover:text-barber-red transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-barber-red"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right: Contact Info */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {/* Phone */}
            <motion.a
              href={`tel:${CONTACT.phoneHref.replace("tel:", "")}`}
              className="text-right"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs text-stone-300 uppercase tracking-wider">Telefon</p>
              <p className="font-light text-sm text-ink hover:text-barber-red transition-colors">
                {CONTACT.phone}
              </p>
            </motion.a>

            {/* Divider */}
            <div className="h-8 w-px bg-stone-300" />

            {/* Address */}
            <motion.a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs text-stone-300 uppercase tracking-wider">Adresse</p>
              <p className="font-light text-sm text-ink hover:text-barber-blue transition-colors">
                {CONTACT.city}
              </p>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
