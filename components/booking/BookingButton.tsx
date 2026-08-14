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
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 ease-out";
  const solid = "bg-ink text-paper hover:bg-ink/90";
  const outline = "border border-ink text-ink hover:bg-stone-50";

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
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(255, 46, 59, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
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
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(255, 46, 59, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
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
