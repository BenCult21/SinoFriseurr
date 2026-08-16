"use client";

import { ABOUT_VALUES } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import EditorialImage from "@/components/about/EditorialImage";
import { motion } from "framer-motion";

const scrollToGallery = () => {
  const galleryElement = document.getElementById("galerie");
  if (galleryElement) {
    galleryElement.scrollIntoView({ behavior: "smooth" });
  }
};

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

        {/* Editorial Story Section */}
        <div className="mt-32 space-y-16 lg:space-y-24">
          {/* Story Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="font-light text-lg lg:text-xl text-stone-200 leading-relaxed mb-6">
              Sino Friseurstudio ist mehr als ein Salon. Es ist ein Ort, an dem Handwerk auf Leidenschaft trifft.
            </p>
            <p className="font-light text-base text-stone-300 leading-relaxed">
              Unser Team bringt Jahre an Erfahrung und eine tiefe Liebe zum Detail mit. Wir verstehen, dass jeder Haarschnitt eine Geschichte ist – eine Gelegenheit, Persönlichkeit zum Ausdruck zu bringen und Vertrauen zu schaffen.
            </p>
          </motion.div>

          {/* Hero Image - Full Width - Clickable to Gallery */}
          <motion.button
            type="button"
            onClick={scrollToGallery}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl h-80 lg:h-[500px] group cursor-pointer w-full text-left"
            aria-label="Zur Galerie"
          >
            <EditorialImage
              src="/images/salon-barber-row.jpg"
              alt="Sino Friseurstudio – Barber Stühle"
              sizes="100vw"
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
              priority
            />

            {/* Minimal Hover Light */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
              style={{
                background: "radial-gradient(circle 300px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
              }}
            />

            {/* Text Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-paper/70 via-transparent to-transparent flex flex-col justify-end p-8"
            >
              <motion.h3
                className="font-heading text-3xl lg:text-5xl text-white max-w-2xl font-light"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Unser Salon
              </motion.h3>
              <motion.p
                className="text-sm text-stone-200 mt-3 max-w-sm font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                Ein Ort der Kreativität und Handwerkskunst
              </motion.p>
            </motion.div>
          </motion.button>

          {/* Story Continuation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="font-light text-base text-stone-300 leading-relaxed">
              Ob Haarschnitt, Bart-Design oder komplette Umgestaltung – wir nehmen uns Zeit, Ihre Wünsche zu verstehen und eine Lösung zu schaffen, die zu Ihnen passt. Qualität, Service und persönliche Beratung sind die Pfeiler unserer Arbeit.
            </p>
          </motion.div>

          {/* Secondary Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center"
          >
            <div className="relative overflow-hidden rounded-xl h-80 md:h-96 order-2 md:order-1 group">
              <EditorialImage
                src="/images/salon-lounge.jpg"
                alt="Sino Friseurstudio – Lounge"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
              {/* Minimal Hover Light */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle 200px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
                }}
              />
            </div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-sm font-light text-stone-400 uppercase tracking-wide mb-3">
                Ambiente
              </p>
              <h4 className="font-display text-2xl lg:text-3xl text-white font-light mb-4">
                Wohlfühl-Atmosphäre
              </h4>
              <p className="font-light text-base text-stone-300 leading-relaxed">
                Unser Studio ist designed als Rückzugsort – ein Ort, wo Sie sich entspannen und aufgehoben fühlen. Moderne Einrichtung, angenehme Musik und aufmerksames Team schaffen das perfekte Ambiente für Ihren Besuch.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
