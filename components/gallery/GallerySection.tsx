"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

type GalleryImage = {
  src: string;
  alt: string;
  height: string;
  colSpan?: number;
  rowSpan?: number;
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/salon-barber-row.jpg",
    alt: "Sino Friseurstudio – Barber Stühle",
    height: "300px",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/salon-reception.jpg",
    alt: "Sino Friseurstudio – Empfangsbereich",
    height: "300px",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/salon-lounge.jpg",
    alt: "Sino Friseurstudio – Lounge",
    height: "300px",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/salon-detail-cape.jpg",
    alt: "Sino Friseurstudio – Detail",
    height: "300px",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/salon-detail-leopard.jpg",
    alt: "Sino Friseurstudio – Dekoration",
    height: "300px",
    colSpan: 1,
    rowSpan: 1,
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="relative bg-paper px-6 py-28 lg:px-10 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Galerie"
          title="Digitale Ausstellung"
          description="Eine Sammlung unserer Studio-Impressionen. Jedes Bild erzählt eine Geschichte von Handwerk, Kreativität und unserem Engagement für Exzellenz."
        />

        {/* Desktop Gallery - Spatial Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:block mt-20"
        >
          {/* Custom spatial grid with varying sizes */}
          <div className="grid gap-6 w-full" style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(4, 280px)",
          }}>
            {/* Image 1: Large - left side, spans 2 columns */}
            <motion.div
              className="group col-span-5 row-span-2 relative overflow-hidden rounded-2xl bg-stone-200 shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: "radial-gradient(circle 200px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
                }}
              />
              <Image
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                fill
                sizes="50vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>

            {/* Image 2: Medium top - right side */}
            <motion.div
              className="group col-span-4 row-span-1 relative overflow-hidden rounded-xl bg-stone-200 shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: "radial-gradient(circle 150px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
                }}
              />
              <Image
                src={GALLERY_IMAGES[1].src}
                alt={GALLERY_IMAGES[1].alt}
                fill
                sizes="30vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>

            {/* Image 3: Small top right corner */}
            <motion.div
              className="group col-span-3 row-span-1 relative overflow-hidden rounded-lg bg-stone-200 shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: "radial-gradient(circle 120px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
                }}
              />
              <Image
                src={GALLERY_IMAGES[2].src}
                alt={GALLERY_IMAGES[2].alt}
                fill
                sizes="20vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>

            {/* Image 4: Medium bottom - spanning center */}
            <motion.div
              className="group col-span-4 row-span-2 relative overflow-hidden rounded-xl bg-stone-200 shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: "radial-gradient(circle 150px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
                }}
              />
              <Image
                src={GALLERY_IMAGES[3].src}
                alt={GALLERY_IMAGES[3].alt}
                fill
                sizes="30vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>

            {/* Image 5: Medium - right bottom */}
            <motion.div
              className="group col-span-4 row-span-2 relative overflow-hidden rounded-xl bg-stone-200 shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: "radial-gradient(circle 150px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
                }}
              />
              <Image
                src={GALLERY_IMAGES[4].src}
                alt={GALLERY_IMAGES[4].alt}
                fill
                sizes="30vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Gallery - Simplified */}
        <div className="md:hidden mt-20 space-y-4">
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg h-64 w-full bg-stone-200 shadow-lg group transition-all"
              whileHover={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
              }}
            >
              {/* Minimal Hover Light Overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: "radial-gradient(circle 120px at center, rgba(255, 255, 255, 0.006) 0%, transparent 70%)",
                }}
              />

              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>
          ))}
        </div>

        {/* Info Text Below Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-2xl text-center mx-auto"
        >
          <p className="font-inter text-sm text-stone-200 leading-relaxed">
            Eine Sammlung unserer Studio-Impressionen. Jedes Bild erzählt eine Geschichte von Handwerk, Kreativität und unserem Engagement für Exzellenz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
