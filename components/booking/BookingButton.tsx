"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingFlow from "./BookingFlow";
import { CALENDLY_URL } from "@/lib/config";

type BookingButtonProps = {
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
  modal?: boolean;
};

export default function BookingButton({
  label = "Termin buchen",
  variant = "solid",
  className = "",
  onClick,
  modal = true,
}: BookingButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-3 sm:py-4 text-sm font-light tracking-wide transition-all duration-300 ease-out min-h-[48px]";
  const solid = "bg-gradient-to-r from-ink to-stone-800 text-paper hover:from-ink hover:to-stone-900 border border-stone-600/30";
  const outline = "border-2 border-ink text-ink hover:bg-ink/5";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault?.();
      onClick();
    }
    if (modal) {
      e.preventDefault?.();
      setModalOpen(true);
    }
  };

  if (!modal) {
    return (
      <motion.a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick as any}
        className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 15px 40px rgba(255, 46, 59, 0.3), 0 0 20px rgba(0, 153, 255, 0.1)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{label}</span>
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="transition-transform duration-300"
          whileHover={{ x: 4 }}
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </motion.svg>
      </motion.a>
    );
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 15px 40px rgba(255, 46, 59, 0.3), 0 0 20px rgba(0, 153, 255, 0.1)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{label}</span>
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="transition-transform duration-300"
          whileHover={{ x: 4 }}
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </motion.svg>
      </motion.button>
      <BookingFlow open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
