"use client";

import { motion } from "framer-motion";
import { RATING } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import RatingStars from "@/components/reviews/RatingStars";

export default function ReviewsSection() {
  return (
    <section
      id="rezensionen"
      className="relative px-6 py-28 lg:px-10 lg:py-40 border-t border-line"
      style={{
        backgroundImage: "url('/images/salon-reception.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-paper/90" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="Bewertungen" title="Was Gäste sagen" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="flex justify-center">
            <RatingStars score={RATING.overall} size={32} />
          </div>
          <p className="mt-6 font-display text-5xl font-thin tracking-wide text-ink">
            {RATING.overall.toFixed(1)} von 5
          </p>
          <p className="mt-3 font-light text-stone-200">{RATING.reviewCount} Bewertungen</p>

          {/* Glass Category Cards */}
          <div className="mt-16 grid grid-cols-2 gap-4 max-w-3xl mx-auto md:grid-cols-4">
            {RATING.categories.map((cat, idx) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-2xl p-5 transition-all relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.07)",
                  borderColor: "rgba(255, 255, 255, 0.14)",
                }}
              >
                {/* Minimal Hover Light */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle 100px at center, rgba(255, 255, 255, 0.015) 0%, transparent 70%)",
                  }}
                />

                <div className="relative flex flex-col items-center gap-2.5">
                  <div>
                    <RatingStars score={cat.score} size={16} />
                  </div>
                  <p className="text-xs font-light text-stone-200 group-hover:text-stone-100 transition-colors">
                    {cat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
