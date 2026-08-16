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

        {/* Gallery Grid - Desktop and Tablet */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:grid mt-20 gap-6 w-full grid-cols-3"
        >
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-lg bg-stone-200 shadow-lg h-80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow:
                  "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)",
                scale: 1.02,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Gallery */}
        <div className="md:hidden mt-20 space-y-4">
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg h-64 w-full bg-stone-200 shadow-lg"
            >
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
