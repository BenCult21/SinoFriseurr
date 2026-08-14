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
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
      />
    </motion.div>
  );
}
