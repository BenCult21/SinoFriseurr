"use client";

import { motion } from "framer-motion";
import type { ServiceItem } from "@/lib/config";

export default function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-baseline justify-between gap-6 border-b border-line py-6 transition-colors hover:border-ink"
    >
      <div>
        <p className="font-display text-lg font-light text-ink sm:text-xl">{item.name}</p>
        <p className="mt-2 text-xs font-light text-stone-500">{item.duration}</p>
      </div>
      <p className="whitespace-nowrap font-display text-lg font-light text-stone-600 sm:text-xl">{item.price}</p>
    </motion.div>
  );
}
