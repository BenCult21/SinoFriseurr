"use client";

import { motion } from "framer-motion";
import { RATING } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import RatingStars from "@/components/reviews/RatingStars";

export default function ReviewsSection() {
  return (
    <section id="rezensionen" className="bg-paper px-6 py-28 lg:px-10 lg:py-40 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Bewertungen" title="Was Gäste sagen" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <div className="flex justify-center">
            <RatingStars score={RATING.overall} size={32} />
          </div>
          <p className="mt-6 font-display text-5xl font-thin tracking-wide text-ink">
            {RATING.overall.toFixed(1)} von 5
          </p>
          <p className="mt-3 font-light text-stone-500">{RATING.reviewCount} Bewertungen</p>

          <div className="mt-16 grid grid-cols-2 gap-8 max-w-2xl mx-auto md:grid-cols-4">
            {RATING.categories.map((cat) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <RatingStars score={cat.score} size={16} />
                <p className="text-xs font-light text-stone-500">{cat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
