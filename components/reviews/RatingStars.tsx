"use client";

import { motion } from "framer-motion";

export default function RatingStars({ score = 5, size = 20 }: { score?: number; size?: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(score));

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${score} von 5 Sternen`}>
      {stars.map((filled, i) => (
        <motion.svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
          className={filled ? "glow-star" : "text-stone-300"}
          initial={filled ? { scale: 0, opacity: 0 } : { opacity: 0.4 }}
          animate={filled ? { scale: 1, opacity: 1 } : { opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: filled ? i * 0.08 : 0,
            ease: "easeOut",
          }}
          whileHover={filled ? { scale: 1.15 } : {}}
        >
          <path d="M12 2.8 14.7 9l6.8.6-5.1 4.5 1.5 6.6L12 17.4l-5.9 3.3 1.5-6.6-5.1-4.5L9.3 9 12 2.8Z" />
        </motion.svg>
      ))}
    </div>
  );
}
