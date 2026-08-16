"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/config";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import BookingButton from "@/components/booking/BookingButton";

type ExpandedService = `${number}-${number}`;

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<ExpandedService | null>(null);

  return (
    <section id="leistungen" className="bg-paper px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Leistungen"
          title="Unsere Services"
          align="center"
          description="Professionelle Haarschnitte und Treatments, exakt auf Ihren Typ abgestimmt."
        />

        <div className="mt-24 space-y-6 sm:space-y-12">
          {SERVICES.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <motion.h3
                className="font-heading text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {category.category}
              </motion.h3>

              {/* Services List */}
              <div className="space-y-2 sm:space-y-3">
                {category.items.map((item, index) => {
                  const serviceKey = `${catIndex}-${index}` as ExpandedService;
                  const isExpanded = expandedService === serviceKey;

                  return (
                    <motion.div
                      key={`${category.category}-${item.name}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        onClick={() =>
                          setExpandedService(isExpanded ? null : serviceKey)
                        }
                        className="group relative w-full px-3 py-3.5 sm:p-6 rounded-lg transition-all text-left"
                        style={{
                          background: isExpanded
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(255, 255, 255, 0.06)",
                          border: isExpanded
                            ? "1px solid rgba(255, 255, 255, 0.16)"
                            : "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                        whileHover={{
                          background: "rgba(255, 255, 255, 0.07)",
                          borderColor: "rgba(255, 255, 255, 0.13)",
                        }}
                      >
                        {/* Minimal Hover Light */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                          style={{
                            background: "radial-gradient(circle 120px at center, rgba(255, 255, 255, 0.012) 0%, transparent 70%)",
                          }}
                        />

                        {/* Service Header - Compact on Mobile */}
                        <div className="relative flex items-center justify-between gap-3 sm:gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 sm:gap-4">
                              <span className="font-heading text-xs sm:text-sm font-semibold text-stone-300 group-hover:text-stone-200 transition-colors flex-shrink-0">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <h4 className="font-heading text-sm sm:text-base lg:text-lg font-semibold text-white group-hover:text-stone-100 transition-colors truncate">
                                {item.name}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                            <p className="font-heading text-xs sm:text-base lg:text-lg font-semibold text-white group-hover:text-stone-100 transition-colors">
                              {item.price}
                            </p>
                            <motion.svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-stone-300 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </motion.svg>
                          </div>
                        </div>

                        {/* Mobile: Expandable Details - Only render when open */}
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="sm:hidden pt-2 mt-2 border-t border-stone-600/50 space-y-2"
                          >
                            <div className="flex justify-between items-start gap-6 text-xs">
                              <div>
                                <p className="font-light text-stone-400 uppercase tracking-wide mb-1">
                                  Dauer
                                </p>
                                <p className="text-stone-200">
                                  {item.duration}
                                </p>
                              </div>
                              <div>
                                <p className="font-light text-stone-400 uppercase tracking-wide mb-1">
                                  Preis
                                </p>
                                <p className="text-stone-200 font-medium">
                                  {item.price}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 mt-2 border-t border-stone-600/30">
                              <BookingButton
                                label="→ Termin buchen"
                                modal
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Desktop: Animated Expandable Details */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="hidden sm:block overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-stone-600/50 space-y-2">
                            <div className="flex justify-between items-start gap-6">
                              <div>
                                <p className="text-xs font-light text-stone-400 uppercase tracking-wide mb-1">
                                  Dauer
                                </p>
                                <p className="text-sm text-stone-200">
                                  {item.duration}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-light text-stone-400 uppercase tracking-wide mb-1">
                                  Preis
                                </p>
                                <p className="text-sm text-stone-200 font-medium">
                                  {item.price}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 mt-2 border-t border-stone-600/30">
                              <BookingButton
                                label="→ Termin buchen"
                                modal
                              />
                            </div>
                          </div>
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* General Booking CTA */}
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
