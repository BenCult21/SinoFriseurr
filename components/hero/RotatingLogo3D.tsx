"use client";

import { useMemo } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { SALON_NAME } from "@/lib/config";

const LAYER_COUNT = 14;
const DEPTH_STEP = 0.9; // px per layer – subtle bevel, not a gimmick

type RotatingLogo3DProps = {
  onOpen: () => void;
};

export default function RotatingLogo3D({ onOpen }: RotatingLogo3DProps) {
  const reduceMotion = useReducedMotion();

  // Solid-looking 3D extrusion via stacked text-shadow layers on a single
  // text node (keeps the accessible name matching the one visible label).
  const textShadow = useMemo(() => {
    const bevel = Array.from({ length: LAYER_COUNT }, (_, i) => {
      const depth = (i + 1) * DEPTH_STEP;
      const t = i / (LAYER_COUNT - 1);
      const shade = Math.round(10 + t * 110);
      return `${depth}px ${depth}px 0 rgb(${shade} ${shade} ${shade})`;
    }).join(", ");
    const glow = "0 0 24px rgba(10,10,10,0.16), 0 0 52px rgba(10,10,10,0.10)";
    return `${glow}, ${bevel}`;
  }, []);

  return (
    <div className="perspective-hero flex w-full justify-center">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`${SALON_NAME} – Kontakt und Informationen öffnen`}
        className="group relative inline-block cursor-pointer bg-transparent px-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-stone-400"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduceMotion ? { rotateY: 0 } : { rotateY: [-20, 20, -20] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.015 }}
      >
        <span
          className="block font-display text-[13vw] font-semibold leading-none tracking-tight text-ink sm:text-[8vw] lg:text-[6.4vw]"
          style={{ textShadow }}
        >
          {SALON_NAME}
        </span>
      </motion.button>
    </div>
  );
}
