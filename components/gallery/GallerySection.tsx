"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

type ImageLayer = {
  src: string;
  alt: string;
  depth: number;
  x: string;
  y: string;
  width: string;
  height: string;
  sizes: string;
};

const GALLERY_IMAGES: ImageLayer[] = [
  {
    src: "/images/salon-barber-row.jpg",
    alt: "Sino Friseurstudio – Barber Stühle",
    depth: 0.8,
    x: "5%",
    y: "10%",
    width: "45%",
    height: "280px",
    sizes: "(min-width: 1024px) 45vw, 90vw",
  },
  {
    src: "/images/salon-reception.jpg",
    alt: "Sino Friseurstudio – Empfangsbereich",
    depth: 0.5,
    x: "52%",
    y: "0%",
    width: "43%",
    height: "240px",
    sizes: "(min-width: 1024px) 43vw, 90vw",
  },
  {
    src: "/images/salon-lounge.jpg",
    alt: "Sino Friseurstudio – Lounge",
    depth: 0.9,
    x: "55%",
    y: "280px",
    width: "40%",
    height: "300px",
    sizes: "(min-width: 1024px) 40vw, 90vw",
  },
  {
    src: "/images/salon-detail-cape.jpg",
    alt: "Sino Friseurstudio – Detail",
    depth: 0.3,
    x: "10%",
    y: "350px",
    width: "35%",
    height: "280px",
    sizes: "(min-width: 1024px) 35vw, 90vw",
  },
  {
    src: "/images/salon-detail-leopard.jpg",
    alt: "Sino Friseurstudio – Dekoration",
    depth: 0.7,
    x: "48%",
    y: "550px",
    width: "47%",
    height: "320px",
    sizes: "(min-width: 1024px) 47vw, 90vw",
  },
];

export default function GallerySection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = 1 - (sectionTop + sectionHeight) / (windowHeight + sectionHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getParallaxOffset = (depth: number) => {
    const scrollOffset = scrollProgress * 120;
    const mouseOffset = mousePosition.x + mousePosition.y;
    return scrollOffset * depth + mouseOffset * depth * 0.3;
  };

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

        {/* 3D Parallax Gallery Container - Desktop Only */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-20 hidden lg:block h-[1000px] w-full"
          style={{
            perspective: "1000px",
          }}
        >
          {/* Background gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/5 to-transparent pointer-events-none" />

          {/* Image Layers */}
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={i}
              className="absolute overflow-hidden rounded-lg bg-stone-200 shadow-2xl"
              style={{
                left: image.x,
                top: image.y,
                width: image.width,
                height: image.height,
                zIndex: Math.round(image.depth * 100),
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow:
                  "0 25px 50px rgba(255, 46, 59, 0.2), 0 0 40px rgba(0, 153, 255, 0.1)",
                scale: 1.02,
              }}
              animate={{
                y: getParallaxOffset(image.depth),
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.sizes}
                className="object-cover"
                quality={85}
              />

              {/* Depth Indicator Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-xs font-light text-white tracking-wide">
                  {Math.round(image.depth * 100)}% Tiefe
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>

        {/* Mobile Gallery */}
        <div className="lg:hidden mt-20 space-y-4">
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
          <p className="font-inter text-sm text-stone-400 leading-relaxed">
            Eine Sammlung unserer Studio-Impressionen. Jedes Bild erzählt eine Geschichte von Handwerk, Kreativität und unserem Engagement für Exzellenz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
