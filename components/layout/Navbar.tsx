"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SALON_NAME } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-paper/80 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-line)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Logo */}
        <motion.a
          href="#start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs font-light uppercase tracking-[0.3em] text-ink hover:text-barber-red transition-colors"
          whileHover={{
            letterSpacing: "0.35em",
            textShadow: "0 0 20px rgba(255, 46, 59, 0.5)",
          }}
        >
          {SALON_NAME}
        </motion.a>

        {/* Empty Space */}
        <div />
      </div>
    </header>
  );
}
