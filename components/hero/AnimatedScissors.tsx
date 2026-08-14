"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedScissors({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const bladeTransition = reduceMotion
    ? undefined
    : {
        duration: 2.4,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
      };

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.g
        style={{ originX: "32px", originY: "32px" }}
        animate={reduceMotion ? {} : { rotate: [0, -7, 0] }}
        transition={bladeTransition}
      >
        <path d="M32 32 12 12" />
        <circle cx="10" cy="10" r="4.2" />
      </motion.g>
      <motion.g
        style={{ originX: "32px", originY: "32px" }}
        animate={reduceMotion ? {} : { rotate: [0, 7, 0] }}
        transition={bladeTransition}
      >
        <path d="M32 32 12 52" />
        <circle cx="10" cy="54" r="4.2" />
      </motion.g>
      <path d="M32 32 56 32" />
    </svg>
  );
}
