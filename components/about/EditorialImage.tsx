"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type EditorialImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  delay?: number;
  priority?: boolean;
};

export default function EditorialImage({
  src,
  alt,
  sizes,
  className = "",
  delay = 0,
  priority = false,
}: EditorialImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-md bg-stone-100 ${className}`}
      whileHover={{
        boxShadow: "0 20px 60px rgba(255, 46, 59, 0.15), 0 0 40px rgba(0, 153, 255, 0.1)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
      />

      {/* Subtle hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-stone-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
      />
    </motion.div>
  );
}
