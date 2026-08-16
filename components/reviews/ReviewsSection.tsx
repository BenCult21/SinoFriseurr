"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RATING } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import RatingStars from "@/components/reviews/RatingStars";

export default function ReviewsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeCategory = RATING.categories[selectedIndex];

  return (
    <section
      id="rezensionen"
      className="relative px-6 py-28 lg:px-10 lg:py-40 border-t border-line overflow-hidden"
      style={{
        backgroundImage: "url('/images/salon-reception.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-paper/90" />

      {/* Background Typography - Large "5.0" */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
      >
        <div className="text-8xl lg:text-9xl font-thin text-white absolute -top-20 -right-40 select-none">
          5.0
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="Bewertungen" title="Was Gäste sagen" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          {/* Overall Rating Display */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <RatingStars score={RATING.overall} size={40} />
            </motion.div>

            <motion.p
              className="font-display text-6xl lg:text-7xl font-thin tracking-wide text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {RATING.overall.toFixed(1)}
            </motion.p>

            <motion.p
              className="mt-3 font-light text-stone-200 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              basierend auf {RATING.reviewCount} Bewertungen
            </motion.p>
          </div>

          {/* Category Navigation & Display */}
          <div className="max-w-3xl mx-auto">
            {/* Category Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {RATING.categories.map((cat, idx) => (
                <motion.button
                  key={cat.label}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative p-4 rounded-xl transition-all"
                  style={{
                    background: selectedIndex === idx
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(255, 255, 255, 0.06)",
                    border: selectedIndex === idx
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  whileHover={{
                    background: "rgba(255, 255, 255, 0.08)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 + 0.3 }}
                >
                  {/* Minimal Hover Light */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 rounded-xl"
                    style={{
                      background: "radial-gradient(circle 80px at center, rgba(255, 255, 255, 0.01) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative text-center">
                    <div className="flex justify-center mb-2">
                      <RatingStars score={cat.score} size={14} />
                    </div>
                    <p className="text-xs font-light text-stone-200 group-hover:text-stone-100 transition-colors leading-tight">
                      {cat.label}
                    </p>
                  </div>

                  {/* Active indicator line */}
                  {selectedIndex === idx && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Active Category Detail */}
            <motion.div
              key={activeCategory.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center p-8 rounded-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mb-4"
              >
                <RatingStars score={activeCategory.score} size={28} />
              </motion.div>

              <motion.p
                className="font-display text-4xl lg:text-5xl font-thin text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {activeCategory.score.toFixed(1)}
              </motion.p>

              <motion.p
                className="text-stone-200 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {activeCategory.label}
              </motion.p>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {RATING.categories.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className="rounded-full transition-all"
                  style={{
                    width: selectedIndex === idx ? 8 : 6,
                    height: 6,
                    background: selectedIndex === idx
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(255, 255, 255, 0.2)",
                  }}
                  whileHover={{
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                  aria-label={`Select category ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
