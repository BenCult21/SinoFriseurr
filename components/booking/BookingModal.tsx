"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CALENDLY_URL, CALENDLY_URL_IS_PLACEHOLDER } from "@/lib/config";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function BookingModal({ open, onClose }: BookingModalProps) {
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Load Calendly script
  useEffect(() => {
    if (open && typeof window !== "undefined" && !(window as any).Calendly) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-paper rounded-xl shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Schließen"
              >
                <svg
                  className="h-5 w-5 text-ink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Header */}
              <div className="border-b border-line px-8 py-6">
                <h2 className="font-display text-2xl font-light tracking-wide text-ink">
                  Termin vereinbaren
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Wählen Sie einen passenden Termin für Ihren Besuch
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                {CALENDLY_URL_IS_PLACEHOLDER ? (
                  <div className="rounded-lg bg-stone-50 border border-line p-8 text-center">
                    <p className="font-display text-sm font-light text-stone-600 mb-4">
                      ⏳ Calendly-Anbindung folgt in Kürze
                    </p>
                    <p className="text-xs text-stone-500 mb-6">
                      Rufen Sie uns unter <strong>0561 76602459</strong> an oder nutzen Sie den
                      direkten Link zum Terminbuchen.
                    </p>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-lg font-light text-sm hover:bg-ink/90 transition-colors"
                    >
                      Zu Calendly
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <div
                    className="calendly-inline-widget"
                    data-url={CALENDLY_URL}
                    style={{ minHeight: "600px" }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
