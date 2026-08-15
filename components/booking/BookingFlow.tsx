"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, CONTACT, TEAM } from "@/lib/config";
import type { ServiceItem } from "@/lib/config";

type BookingStep = "service" | "barber" | "date" | "contact" | "review" | "confirmation";

export default function BookingFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<BookingStep>("service");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  const handleReset = () => {
    setStep("service");
    setSelectedService(null);
    setSelectedBarber(null);
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-md"
            onClick={handleClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl rounded-2xl bg-paper shadow-2xl border border-stone-700 flex flex-col"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ maxHeight: "90vh" }}
          >
            {/* Header: Close Button & Progress Bar */}
            <div className="px-6 lg:px-10 pt-6 lg:pt-10 pb-0">
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
                  {(["service", "barber", "date", "contact", "review", "confirmation"] as const).map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        step === s ? "bg-barber-red" : ["service", "barber", "date", "contact", "review"].indexOf(s) < ["service", "barber", "date", "contact", "review"].indexOf(step) ? "bg-barber-blue" : "bg-stone-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content: Scrollable Steps */}
            <div className="overflow-y-auto flex-1 px-6 lg:px-10">
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
                  <div className="space-y-3">
                    {SERVICES[0].items.map((service) => (
                      <motion.button
                        key={service.name}
                        onClick={() => setSelectedService(service)}
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

              {/* Step: Barber Selection */}
              {step === "barber" && (
                <motion.div
                  key="barber"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-light text-ink mb-8">Wähle deinen Friseur</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TEAM.map((barber) => (
                      <motion.button
                        key={barber.name}
                        onClick={() => setSelectedBarber(barber.name)}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          selectedBarber === barber.name
                            ? "border-barber-red bg-barber-red/10"
                            : "border-stone-200 hover:border-barber-blue"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-barber-red to-barber-blue flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-light text-paper">{barber.name[0]}</span>
                        </div>
                        <p className="font-light text-ink text-lg">{barber.name}</p>
                        {barber.specialty && (
                          <p className="text-xs text-stone-500 mt-2">{barber.specialty}</p>
                        )}
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
                </motion.div>
              )}

              {/* Step: Review & Confirm */}
              {step === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-light text-ink mb-8">Buchung überprüfen</h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glassmorphism rounded-lg p-8 mb-8 space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-stone-700">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Service</span>
                        <span className="text-barber-red font-light text-lg">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-stone-700">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Dauer</span>
                        <span className="text-ink font-light">{selectedService?.duration}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-stone-700">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Preis</span>
                        <span className="text-barber-blue font-light text-lg">{selectedService?.price}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-stone-700">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Friseur</span>
                        <span className="text-ink font-light">{selectedBarber}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-stone-700">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Datum</span>
                        <span className="text-ink font-light">{new Date(selectedDate).toLocaleDateString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-stone-700">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Uhrzeit</span>
                        <span className="text-ink font-light">{selectedTime} Uhr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400 text-sm uppercase tracking-wide">Name</span>
                        <span className="text-ink font-light">{contact.name}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step: Confirmation */}
              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="w-20 h-20 rounded-full border-2 border-barber-green bg-barber-green/10 flex items-center justify-center mx-auto mb-8"
                  >
                    <motion.svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-barber-green"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </motion.svg>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-light text-ink mb-4"
                  >
                    Termin bestätigt!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-stone-400 mb-10 leading-relaxed"
                  >
                    Vielen Dank für Ihre Buchung. Eine Bestätigung wird in Kürze an{" "}
                    <span className="text-barber-red font-light">{contact.email}</span> versendet.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glassmorphism rounded-lg p-8 mb-10 text-left"
                  >
                    <p className="text-xs text-stone-400 mb-6 uppercase tracking-wide">Ihre Buchung:</p>
                    <div className="space-y-3 text-ink font-light">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Service:</span>
                        <span className="text-barber-red">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Friseur:</span>
                        <span className="text-barber-blue">{selectedBarber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Datum:</span>
                        <span>{new Date(selectedDate).toLocaleDateString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Uhrzeit:</span>
                        <span>{selectedTime} Uhr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Name:</span>
                        <span>{contact.name}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Footer: Action Buttons */}
            <div className="border-t border-stone-700 px-6 lg:px-10 py-6 lg:py-8 bg-paper">
              <div className="flex flex-col gap-4">
                {step !== "service" && step !== "confirmation" && (
                  <motion.button
                    onClick={() => {
                      if (step === "barber") setStep("service");
                      else if (step === "date") setStep("barber");
                      else if (step === "contact") setStep("date");
                      else if (step === "review") setStep("contact");
                    }}
                    className="w-24 sm:flex-1 px-4 py-3 rounded-lg border border-stone-200 text-ink hover:border-barber-blue transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    Zurück
                  </motion.button>
                )}

                {step === "service" && selectedService && (
                  <motion.button
                    onClick={() => setStep("barber")}
                    className="flex-1 px-4 py-3 rounded-lg bg-barber-red text-paper hover:bg-barber-red/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    Weiter
                  </motion.button>
                )}

                {step === "barber" && selectedBarber && (
                  <motion.button
                    onClick={() => setStep("date")}
                    className="flex-1 px-4 py-3 rounded-lg bg-barber-red text-paper hover:bg-barber-red/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    Weiter
                  </motion.button>
                )}

                {step === "date" && selectedDate && selectedTime && (
                  <motion.button
                    onClick={() => setStep("contact")}
                    className="flex-1 px-4 py-3 rounded-lg bg-barber-red text-paper hover:bg-barber-red/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    Weiter
                  </motion.button>
                )}

                {step === "contact" && (
                  <motion.button
                    onClick={() => {
                      if (contact.name && contact.phone) {
                        setStep("review");
                      }
                    }}
                    disabled={!contact.name || !contact.phone}
                    className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                      contact.name && contact.phone
                        ? "bg-barber-blue text-white hover:bg-barber-blue/90 shadow-lg"
                        : "bg-stone-400 text-stone-600 cursor-not-allowed opacity-60"
                    }`}
                    whileHover={contact.name && contact.phone ? { scale: 1.03 } : {}}
                  >
                    Überprüfen
                  </motion.button>
                )}

                {step === "review" && (
                  <motion.button
                    onClick={() => setStep("confirmation")}
                    className="w-full px-8 py-6 rounded-xl bg-white text-black font-bold tracking-wider text-lg shadow-2xl hover:shadow-white/50 transition-all border-4 border-black font-display"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✓ TERMIN VEREINBAREN
                  </motion.button>
                )}

                {step === "confirmation" && (
                  <motion.button
                    onClick={handleClose}
                    className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-barber-red to-barber-red/80 text-paper hover:shadow-lg hover:shadow-barber-red/50 transition-all font-light tracking-wide"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Fenster schließen
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
