"use client";

import { ABOUT_VALUES } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import EditorialImage from "@/components/about/EditorialImage";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="bg-paper px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Über uns"
          title="Handwerk, das man spürt"
          description="Sino Friseurstudio steht für modernes Styling, typgerechte Beratung und ein Ambiente, in dem man sich wohlfühlt. Unser Team verbindet Kreativität, Handwerkskunst und Leidenschaft für Haare."
        />

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {ABOUT_VALUES.map((value, i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group flex flex-col gap-2 border-l-2 border-stone-300 pl-6 hover:border-barber-red transition-colors duration-300 cursor-default"
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="font-heading text-sm font-light text-ink tracking-wide group-hover:text-barber-red transition-colors"
                whileHover={{ letterSpacing: "0.1em" }}
              >
                {value}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Editorial Image Gallery */}
        <div className="mt-32 space-y-8">
          {/* Hero Image - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg h-96 lg:h-[500px]"
          >
            <EditorialImage
              src="/images/salon-barber-row.jpg"
              alt="Sino Friseurstudio – Barber Stühle"
              sizes="100vw"
              className="w-full h-full object-cover"
              priority
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-paper/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="font-heading text-3xl lg:text-4xl text-ink max-w-md font-light">
                Unser Salon
              </h3>
              <p className="text-sm text-stone-400 mt-2 max-w-sm">
                Ein Ort der Kreativität, wo Handwerk auf Leidenschaft trifft
              </p>
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <EditorialImage
                src="/images/salon-reception.jpg"
                alt="Sino Friseurstudio – Empfangsbereich"
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="aspect-video"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <EditorialImage
                src="/images/salon-lounge.jpg"
                alt="Sino Friseurstudio – Lounge"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="aspect-square"
              />
            </motion.div>
          </div>

          {/* Detail Images */}
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <EditorialImage
                src="/images/salon-detail-cape.jpg"
                alt="Sino Friseurstudio – Detail"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-square"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <EditorialImage
                src="/images/salon-detail-leopard.jpg"
                alt="Sino Friseurstudio – Dekoration"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-square"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
