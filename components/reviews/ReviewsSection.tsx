"use client";

import { motion } from "framer-motion";
import { RATING } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import RatingStars from "@/components/reviews/RatingStars";

export default function ReviewsSection() {
  return (
    <section id="rezensionen" className="bg-stone-50 px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Rezensionen" title="Was Kunden sagen" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col items-center rounded-2xl border border-line bg-paper px-8 py-14 text-center"
        >
          <RatingStars score={RATING.overall} size={30} />
          <p className="mt-5 font-display text-4xl font-medium tracking-tight text-ink">
            {RATING.overall.toFixed(1)} / 5,0
          </p>
          <p className="mt-2 text-sm text-stone-500">{RATING.reviewCount} Bewertungen</p>

          <div className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {RATING.categories.map((cat) => (
              <div key={cat.label} className="flex flex-col items-center gap-2">
                <RatingStars score={cat.score} size={14} />
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500">{cat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
