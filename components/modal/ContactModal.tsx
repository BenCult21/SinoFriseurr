"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT, OPENING_HOURS, SALON_NAME } from "@/lib/config";
import BookingButton from "@/components/booking/BookingButton";
import MapsLink from "@/components/shared/MapsLink";
import PhoneLink from "@/components/shared/PhoneLink";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      dialogRef.current?.focus();
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-line bg-paper p-9 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] focus:outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-stone-500 transition-colors hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
              Willkommen bei
            </p>
            <h3
              id="contact-modal-title"
              className="mt-3 font-display text-2xl font-medium tracking-tight text-ink"
            >
              {SALON_NAME}
            </h3>

            <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6">
              <MapsLink showAddress />
              <PhoneLink />
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
                Öffnungszeiten
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {OPENING_HOURS.map((entry) => (
                  <li key={entry.day} className="flex justify-between text-sm text-stone-600">
                    <span>{entry.day}</span>
                    <span className={entry.hours === "geschlossen" ? "text-stone-400" : "text-ink"}>
                      {entry.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <BookingButton label="Termin buchen" className="w-full" />
            </div>

            <p className="mt-4 text-center text-xs text-stone-400">{CONTACT.fullAddress}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
