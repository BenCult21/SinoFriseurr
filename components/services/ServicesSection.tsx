"use client";

import { SERVICES } from "@/lib/config";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import BookingButton from "@/components/booking/BookingButton";

export default function ServicesSection() {
  return (
    <section id="leistungen" className="bg-paper px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Leistungen"
          title="Unsere Services"
          align="center"
          description="Professionelle Haarschnitte und Treatments, exakt auf Ihren Typ abgestimmt."
        />

        <div className="mt-24 space-y-20">
          {SERVICES.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start"
            >
              {/* Left: Services List */}
              <div className="lg:col-span-2">
                <h3 className="font-heading text-2xl lg:text-3xl font-light text-ink tracking-tight mb-10">
                  {category.category}
                </h3>

                <div className="space-y-6">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="flex items-start justify-between gap-6 pb-6 border-b transition-all duration-300 group-hover:border-barber-red/50">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-4">
                          <motion.span
                            className="font-heading text-sm font-light text-stone-400 tracking-wide"
                            whileHover={{ scale: 1.2, color: "rgb(255, 46, 59)" }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </motion.span>
                          <h4 className="font-heading text-base lg:text-lg font-light text-ink group-hover:text-barber-red transition-colors">
                            {item.name}
                          </h4>
                        </div>
                        <motion.p
                          className="mt-2 text-sm font-light text-stone-500 ml-14"
                          whileHover={{ x: 4 }}
                        >
                          {item.duration}
                        </motion.p>
                      </div>
                      <div className="whitespace-nowrap">
                        <motion.p
                          className="font-heading text-base lg:text-lg font-light text-stone-600 group-hover:text-barber-blue transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.price}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>

              {/* Right: Image */}
              <motion.div
                className="hidden lg:block overflow-hidden rounded-lg bg-stone-200 aspect-square sticky top-32"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={catIndex === 0 ? "/images/salon-barber-row.jpg" : "/images/salon-detail-cape.jpg"}
                  alt={category.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <BookingButton label="Termin buchen" modal />
        </motion.div>
      </div>
    </section>
  );
}
