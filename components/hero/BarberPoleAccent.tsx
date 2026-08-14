"use client";

import { motion, useReducedMotion } from "framer-motion";

const STRIPE_SPACING = 12;
const STRIPE_Y_START = -24;
const STRIPE_COUNT = 8;

export default function BarberPoleAccent({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 40 64"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="barber-pole-clip">
          <rect x="12" y="4" width="16" height="56" rx="8" />
        </clipPath>
      </defs>

      <rect x="12" y="4" width="16" height="56" rx="8" strokeWidth="1.4" />
      <circle cx="20" cy="4" r="2" strokeWidth="1.2" />
      <circle cx="20" cy="60" r="2" strokeWidth="1.2" />

      <motion.g
        clipPath="url(#barber-pole-clip)"
        strokeWidth="1.2"
        animate={reduceMotion ? {} : { y: [STRIPE_Y_START, STRIPE_Y_START + STRIPE_SPACING] }}
        transition={reduceMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: STRIPE_COUNT }, (_, i) => {
          const y = STRIPE_Y_START + i * STRIPE_SPACING;
          return <path key={i} d={`M8 ${y + 16} L32 ${y}`} />;
        })}
      </motion.g>
    </svg>
  );
}
