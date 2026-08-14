"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RotatingLogo3D from "@/components/hero/RotatingLogo3D";
import AnimatedScissors from "@/components/hero/AnimatedScissors";
import BarberPoleAccent from "@/components/hero/BarberPoleAccent";
import ContactModal from "@/components/modal/ContactModal";
import BookingButton from "@/components/booking/BookingButton";
import MapsLink from "@/components/shared/MapsLink";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="start"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper px-6 pb-20 pt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-5 text-stone-400"
      >
        <AnimatedScissors className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="h-6 w-px bg-line" aria-hidden="true" />
        <BarberPoleAccent className="h-10 w-10 sm:h-11 sm:w-11" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 text-xs font-medium uppercase tracking-[0.35em] text-stone-500"
      >
        Friseur in Kassel
      </motion.p>

      <div className="mt-4 w-full max-w-5xl">
        <RotatingLogo3D onOpen={() => setModalOpen(true)} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-md text-balance text-center text-sm leading-relaxed text-stone-500"
      >
        Modernes Styling, typgerechte Beratung und Wohlfühlambiente.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-6"
      >
        <BookingButton label="Termin buchen" />
        <MapsLink showAddress className="text-stone-500" />
      </motion.div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
