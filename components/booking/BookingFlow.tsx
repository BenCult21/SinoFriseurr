"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, CONTACT } from "@/lib/config";
import type { ServiceItem } from "@/lib/config";

type BookingStep = "service" | "date" | "contact" | "confirmation";

export default function BookingFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  const handleReset = () => {
    setStep("service");
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setContact({ name: "", phone: "", email: "" });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-paper p-8 lg:p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-stone-500 hover:text-ink transition-colors"
              aria-label="Schließen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between gap-2 mb-4">
                {(["service", "date", "contact", "confirmation"] as const).map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      step === s ? "bg-barber-red" : ["service", "date", "contact"].indexOf(s) < ["service", "date", "contact"].indexOf(step) ? "bg-barber-blue" : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step: Service Selection */}
            <AnimatePresence mode="wait">
              {step === "service" && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-light text-ink mb-8">Service wählen</h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {SERVICES[0].items.map((service) => (
                      <motion.button
                        key={service.name}
                        onClick={() => {
                          setSelectedService(service);
                          setStep("date");
                        }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedService?.name === service.name
                            ? "border-barber-red bg-barber-red/5"
                            : "border-stone-200 hover:border-barber-blue"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-light text-ink">{service.name}</p>
                            <p className="text-xs text-stone-500 mt-1">{service.duration}</p>
                          </div>
                          <p className="font-light text-barber-red">{service.price}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step: Date & Time Selection */}
              {step === "date" && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-light text-ink mb-8">Datum & Uhrzeit</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-stone-500 mb-3 uppercase tracking-wide">Datum</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-paper text-ink focus:outline-none focus:border-barber-red"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-500 mb-3 uppercase tracking-wide">Uhrzeit</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-paper text-ink focus:outline-none focus:border-barber-red"
                      >
                        <option value="">Uhrzeit wählen</option>
                        {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => (
                          <option key={time} value={time}>
                            {time} Uhr
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <motion.button
                      onClick={() => setStep("service")}
                      className="flex-1 px-4 py-3 rounded-lg border border-stone-200 text-ink hover:border-barber-blue transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      Zurück
                    </motion.button>
                    <motion.button
                      onClick={() => selectedDate && selectedTime && setStep("contact")}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1 px-4 py-3 rounded-lg bg-barber-red text-paper hover:bg-barber-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      Weiter
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step: Contact Information */}
              {step === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-light text-ink mb-8">Kontaktdaten</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-stone-500 mb-2 uppercase tracking-wide">Name</label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="Ihr Name"
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-paper text-ink focus:outline-none focus:border-barber-red placeholder:text-stone-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-500 mb-2 uppercase tracking-wide">Telefon</label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder={CONTACT.phone}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-paper text-ink focus:outline-none focus:border-barber-red placeholder:text-stone-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-500 mb-2 uppercase tracking-wide">E-Mail</label>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="ihre@email.de"
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-paper text-ink focus:outline-none focus:border-barber-red placeholder:text-stone-600"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <motion.button
                      onClick={() => setStep("date")}
                      className="flex-1 px-4 py-3 rounded-lg border border-stone-200 text-ink hover:border-barber-blue transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      Zurück
                    </motion.button>
                    <motion.button
                      onClick={() => contact.name && contact.phone && setStep("confirmation")}
                      disabled={!contact.name || !contact.phone}
                      className="flex-1 px-4 py-3 rounded-lg bg-barber-blue text-paper hover:bg-barber-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      Bestätigen
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step: Confirmation */}
              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2 }}
                    className="w-16 h-16 rounded-full border-2 border-barber-green bg-barber-green/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-barber-green">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>

                  <h2 className="text-3xl font-light text-ink mb-4">Termin gebucht!</h2>
                  <p className="text-stone-600 mb-8">
                    Vielen Dank für Ihre Buchung. Eine Bestätigung wird in Kürze an{" "}
                    <span className="text-barber-red font-light">{contact.email}</span> versendet.
                  </p>

                  <div className="bg-stone-50 rounded-lg p-6 mb-8 text-left">
                    <p className="text-sm text-stone-500 mb-4">Ihre Buchung:</p>
                    <div className="space-y-2 text-ink font-light">
                      <p>
                        <span className="text-stone-500">Service:</span> {selectedService?.name}
                      </p>
                      <p>
                        <span className="text-stone-500">Datum:</span> {new Date(selectedDate).toLocaleDateString("de-DE")}
                      </p>
                      <p>
                        <span className="text-stone-500">Uhrzeit:</span> {selectedTime} Uhr
                      </p>
                      <p>
                        <span className="text-stone-500">Name:</span> {contact.name}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleClose}
                    className="w-full px-4 py-3 rounded-lg bg-barber-red text-paper hover:bg-barber-red/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    Schließen
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
