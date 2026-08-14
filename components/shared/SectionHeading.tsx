"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <motion.p
          className={`mb-4 text-xs font-medium uppercase tracking-[0.3em] ${
            invert ? "text-stone-400" : "text-stone-500"
          }`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={`text-balance font-display text-5xl font-thin tracking-wide leading-[1.2] sm:text-6xl ${
          invert ? "text-paper" : "text-ink"
        }`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-5 text-balance text-base leading-relaxed sm:text-lg ${
            invert ? "text-stone-300" : "text-stone-600"
          }`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
