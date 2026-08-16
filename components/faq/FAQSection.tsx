"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const FAQ_ITEMS = [
  {
    question: "Wie buche ich einen Termin?",
    answer:
      "Klick auf den 'Termin buchen' Button, wähle deinen gewünschten Service, Datum und Uhrzeit aus. Danach gibst du deine Kontaktdaten ein und erhältst eine Bestätigung per E-Mail.",
  },
  {
    question: "Kann ich auch spontan vorbeikommen?",
    answer:
      "Ja, gerne! Wir nehmen auch Walk-in Kunden an, je nach Auslastung. Für eine bessere Planung empfehlen wir aber, einen Termin zu buchen.",
  },
  {
    question: "Wie lange dauert ein Haarschnitt?",
    answer:
      "Die Dauer variiert je nach Service. Ein klassischer Herrenhaarschnitt dauert etwa 30-35 Minuten. Bei komplexeren Frisuren kann es auch länger sein.",
  },
  {
    question: "Welche Zahlungsarten akzeptiert ihr?",
    answer:
      "Wir akzeptieren Bargeld, Kartenzahlung (EC/Kreditkarte) und kontaktloses Bezahlen. Bei Fragen ruf uns einfach an.",
  },
  {
    question: "Muss ich eine Stornierungsgebühr bezahlen?",
    answer:
      "Wenn du deinen Termin bis 24 Stunden vorher absagst, entstehen keine Kosten. Bei kurzfristigen Absagen können Gebühren anfallen.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-paper px-6 py-28 lg:px-10 lg:py-40 border-t border-line">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Häufig gestellte Fragen"
          align="center"
          description="Alle Antworten auf deine wichtigsten Fragen"
        />

        <div className="mt-16 space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-stone-200 rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-stone-50/50 transition-colors group"
              >
                <h3 className="font-heading text-base lg:text-lg font-light text-ink text-left group-hover:text-barber-red transition-colors">
                  {item.question}
                </h3>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-stone-300 flex-shrink-0 ml-4"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M19 14l-7-7-7 7" />
                </motion.svg>
              </motion.button>

              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-stone-50/30"
              >
                <p className="px-6 py-4 text-sm text-stone-200 leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
