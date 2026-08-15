"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, CONTACT, TEAM } from "@/lib/config";
import type { ServiceItem } from "@/lib/config";

type BookingStep = "service" | "barber" | "date" | "contact" | "confirmation";

export default function BookingFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<BookingStep>("service");
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

  const isServiceValid = selectedService;
  const isBarberValid = selectedBarber;
  const isDateValid = selectedDate && selectedTime;
  const isContactValid = contact.name && contact.phone;

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-md"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl bg-paper border border-stone-700 rounded-lg shadow-2xl flex flex-col"
            style={{ maxHeight: "90vh", minHeight: "500px" }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 sm:px-8 py-6 border-b border-stone-700 flex-shrink-0">
              <h2 className="text-2xl font-light text-ink">Termin buchen</h2>
              <button
                onClick={handleClose}
                className="text-stone-500 hover:text-ink p-1 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8">
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Step 1: Service Selection */}
                {step === "service" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-light text-ink mb-6">1. Service wählen</h3>
                    <div className="space-y-3">
                      {SERVICES[0].items.map((service) => (
                        <button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedService?.name === service.name
                              ? "border-barber-red bg-barber-red/10"
                              : "border-stone-600 hover:border-barber-blue"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-ink font-light">{service.name}</p>
                              <p className="text-sm text-stone-500 mt-1">{service.duration}</p>
                            </div>
                            <p className="text-barber-red font-light">{service.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Barber Selection */}
                {step === "barber" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-light text-ink mb-6">2. Friseur wählen</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {TEAM.map((barber) => (
                        <button
                          key={barber.name}
                          onClick={() => setSelectedBarber(barber.name)}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            selectedBarber === barber.name
                              ? "border-barber-red bg-barber-red/10"
                              : "border-stone-600 hover:border-barber-blue"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-barber-red to-barber-blue flex items-center justify-center mx-auto mb-2">
                            <span className="text-sm font-light text-white">{barber.name[0]}</span>
                          </div>
                          <p className="text-sm font-light text-ink">{barber.name}</p>
                          {barber.specialty && (
                            <p className="text-xs text-stone-500 mt-1">{barber.specialty}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date & Time */}
                {step === "date" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-light text-ink mb-6">3. Datum & Uhrzeit</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide">Datum</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-600 bg-paper text-ink focus:outline-none focus:border-barber-red"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide">Uhrzeit</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-600 bg-paper text-ink focus:outline-none focus:border-barber-red"
                        >
                          <option value="">-- Uhrzeit wählen --</option>
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

                {/* Step 4: Contact Information */}
                {step === "contact" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-light text-ink mb-6">4. Kontaktdaten</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide">Name *</label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => setContact({ ...contact, name: e.target.value })}
                          placeholder="Ihr Name"
                          className="w-full px-4 py-3 rounded-lg border border-stone-600 bg-paper text-ink focus:outline-none focus:border-barber-red placeholder:text-stone-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide">Telefon *</label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          placeholder={CONTACT.phone}
                          className="w-full px-4 py-3 rounded-lg border border-stone-600 bg-paper text-ink focus:outline-none focus:border-barber-red placeholder:text-stone-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide">E-Mail</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          placeholder="ihre@email.de"
                          className="w-full px-4 py-3 rounded-lg border border-stone-600 bg-paper text-ink focus:outline-none focus:border-barber-red placeholder:text-stone-600"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Confirmation */}
                {step === "confirmation" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                    <div className="w-16 h-16 rounded-full border-2 border-barber-green bg-barber-green/10 flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-barber-green">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-ink mb-2">Termin bestätigt!</h3>
                    <p className="text-stone-400 mb-8">
                      Vielen Dank für Ihre Buchung. Eine Bestätigung wird an{" "}
                      <span className="text-barber-red">{contact.email || contact.phone}</span> versendet.
                    </p>
                    <div className="bg-stone-900/50 rounded-lg p-6 text-left space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Service:</span>
                        <span className="text-barber-red font-light">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Friseur:</span>
                        <span className="text-barber-blue font-light">{selectedBarber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Datum:</span>
                        <span className="text-ink font-light">{new Date(selectedDate).toLocaleDateString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Uhrzeit:</span>
                        <span className="text-ink font-light">{selectedTime} Uhr</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer - Action Buttons */}
            <div className="border-t border-stone-700 px-6 sm:px-8 py-6 bg-paper flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* Back Button */}
                {step !== "service" && step !== "confirmation" && (
                  <button
                    onClick={() => {
                      if (step === "barber") setStep("service");
                      else if (step === "date") setStep("barber");
                      else if (step === "contact") setStep("date");
                    }}
                    className="w-full sm:w-auto px-6 py-3 text-ink border border-stone-600 rounded-lg hover:border-barber-blue transition-colors text-sm font-light"
                  >
                    ← Zurück
                  </button>
                )}

                {/* Next/Confirm Buttons */}
                {step === "service" && (
                  <button
                    onClick={() => setStep("barber")}
                    disabled={!isServiceValid}
                    className={`flex-1 sm:flex-initial px-8 py-3 rounded-lg font-light transition-all ${
                      isServiceValid
                        ? "bg-barber-red hover:bg-barber-red/90 text-white"
                        : "bg-stone-700 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    Weiter →
                  </button>
                )}

                {step === "barber" && (
                  <button
                    onClick={() => setStep("date")}
                    disabled={!isBarberValid}
                    className={`flex-1 sm:flex-initial px-8 py-3 rounded-lg font-light transition-all ${
                      isBarberValid
                        ? "bg-barber-red hover:bg-barber-red/90 text-white"
                        : "bg-stone-700 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    Weiter →
                  </button>
                )}

                {step === "date" && (
                  <button
                    onClick={() => setStep("contact")}
                    disabled={!isDateValid}
                    className={`flex-1 sm:flex-initial px-8 py-3 rounded-lg font-light transition-all ${
                      isDateValid
                        ? "bg-barber-red hover:bg-barber-red/90 text-white"
                        : "bg-stone-700 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    Weiter →
                  </button>
                )}

                {step === "contact" && (
                  <button
                    onClick={() => setStep("confirmation")}
                    disabled={!isContactValid}
                    className={`flex-1 sm:flex-initial px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                      isContactValid
                        ? "bg-white text-black border-2 border-black hover:bg-stone-100"
                        : "bg-stone-700 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    ✓ TERMIN BESTÄTIGEN
                  </button>
                )}

                {step === "confirmation" && (
                  <button
                    onClick={handleClose}
                    className="flex-1 px-8 py-3 rounded-lg bg-barber-green hover:bg-barber-green/90 text-white font-light transition-all"
                  >
                    Fenster schließen
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
