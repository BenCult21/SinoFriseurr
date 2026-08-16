"use client";

import { useState, useEffect } from "react";
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

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
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0"
            onClick={handleClose}
            aria-hidden="true"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: "rgba(0, 0, 0, 0.72)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-md flex flex-col overflow-hidden rounded-2xl"
            style={{
              maxHeight: "85vh",
              background: "linear-gradient(135deg, rgba(28, 28, 28, 0.98) 0%, rgba(12, 12, 12, 0.98) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.08)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Header */}
            <div
              className="flex justify-between items-center px-6 py-5 flex-shrink-0"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 100%)",
              }}
            >
              <h2 className="text-2xl font-semibold text-white">Termin buchen</h2>
              <motion.button
                onClick={handleClose}
                className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-8">
                {/* Step 1: Service */}
                {step === "service" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">1. Service wählen</h3>
                    <div className="space-y-2">
                      {SERVICES[0].items.map((service) => (
                        <motion.button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className="w-full text-left p-4 rounded-lg border-2 transition-all"
                          style={{
                            borderColor: selectedService?.name === service.name
                              ? "rgba(255, 255, 255, 0.3)"
                              : "rgba(255, 255, 255, 0.08)",
                            background: selectedService?.name === service.name
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(255, 255, 255, 0.02)",
                          }}
                          whileHover={{
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-semibold">{service.name}</p>
                              <p className="text-sm text-stone-400 mt-1">{service.duration}</p>
                            </div>
                            <p className="text-white font-semibold">{service.price}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Barber */}
                {step === "barber" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">2. Friseur wählen</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {TEAM.map((barber) => (
                        <motion.button
                          key={barber.name}
                          onClick={() => setSelectedBarber(barber.name)}
                          className="p-3 rounded-lg border-2 text-center transition-all"
                          style={{
                            borderColor: selectedBarber === barber.name
                              ? "rgba(255, 255, 255, 0.3)"
                              : "rgba(255, 255, 255, 0.08)",
                            background: selectedBarber === barber.name
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(255, 255, 255, 0.02)",
                          }}
                          whileHover={{
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <p className="text-sm font-semibold text-white">{barber.name}</p>
                          {barber.specialty && (
                            <p className="text-xs text-stone-400 mt-1">{barber.specialty}</p>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date & Time */}
                {step === "date" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">3. Datum & Uhrzeit</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-stone-200 mb-2 font-medium">Datum</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-600 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all text-sm"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            colorScheme: "dark"
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-200 mb-2 font-medium">Uhrzeit</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-600 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all text-sm"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            colorScheme: "dark"
                          }}
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

                {/* Step 4: Contact */}
                {step === "contact" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">4. Deine Daten</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-stone-200 mb-2 font-medium">Name *</label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => setContact({ ...contact, name: e.target.value })}
                          placeholder="Dein Name"
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-600 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all placeholder:text-stone-400 text-sm"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-200 mb-2 font-medium">Telefon *</label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          placeholder={CONTACT.phone}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-600 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all placeholder:text-stone-400 text-sm"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-200 mb-2 font-medium">E-Mail</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          placeholder="deine@email.de"
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-600 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all placeholder:text-stone-400 text-sm"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Confirmation */}
                {step === "confirmation" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-4"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Termin gebucht!</h3>
                    <p className="text-stone-300 mb-6">Eine Bestätigung wird versendet an:</p>
                    <div className="bg-stone-700/30 rounded-lg p-4 mb-6 border border-stone-600/50">
                      <p className="text-white font-semibold">{contact.email || contact.phone}</p>
                    </div>
                    <div className="bg-stone-700/20 rounded-lg p-4 space-y-3 text-sm border border-stone-600/30">
                      <div className="flex justify-between text-stone-300">
                        <span>Service:</span>
                        <span className="text-white font-semibold">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>Friseur:</span>
                        <span className="text-white font-semibold">{selectedBarber}</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>Datum:</span>
                        <span className="text-white font-semibold">{new Date(selectedDate).toLocaleDateString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>Uhrzeit:</span>
                        <span className="text-white font-semibold">{selectedTime} Uhr</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer - Buttons */}
            <div
              className="px-6 py-4 flex-shrink-0 flex gap-3 items-center justify-between flex-wrap"
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
              }}
            >
              {/* Back Button */}
              {step !== "service" && step !== "confirmation" && (
                <motion.button
                  onClick={() => {
                    if (step === "barber") setStep("service");
                    else if (step === "date") setStep("barber");
                    else if (step === "contact") setStep("date");
                  }}
                  className="px-6 py-2.5 text-stone-300 hover:text-white border border-stone-600 hover:border-stone-500 rounded-lg text-sm font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Zurück
                </motion.button>
              )}

              {/* Next Button */}
              {step === "service" && (
                <motion.button
                  onClick={() => setStep("barber")}
                  disabled={!isServiceValid}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ml-auto"
                  style={{
                    background: isServiceValid ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    color: isServiceValid ? "#000000" : "#999999",
                    cursor: isServiceValid ? "pointer" : "not-allowed",
                  }}
                  whileHover={isServiceValid ? { scale: 1.05 } : {}}
                  whileTap={isServiceValid ? { scale: 0.95 } : {}}
                >
                  Weiter →
                </motion.button>
              )}

              {step === "barber" && (
                <motion.button
                  onClick={() => setStep("date")}
                  disabled={!isBarberValid}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ml-auto"
                  style={{
                    background: isBarberValid ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    color: isBarberValid ? "#000000" : "#999999",
                    cursor: isBarberValid ? "pointer" : "not-allowed",
                  }}
                  whileHover={isBarberValid ? { scale: 1.05 } : {}}
                  whileTap={isBarberValid ? { scale: 0.95 } : {}}
                >
                  Weiter →
                </motion.button>
              )}

              {step === "date" && (
                <motion.button
                  onClick={() => setStep("contact")}
                  disabled={!isDateValid}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ml-auto"
                  style={{
                    background: isDateValid ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    color: isDateValid ? "#000000" : "#999999",
                    cursor: isDateValid ? "pointer" : "not-allowed",
                  }}
                  whileHover={isDateValid ? { scale: 1.05 } : {}}
                  whileTap={isDateValid ? { scale: 0.95 } : {}}
                >
                  Weiter →
                </motion.button>
              )}

              {step === "contact" && (
                <motion.button
                  onClick={() => setStep("confirmation")}
                  disabled={!isContactValid}
                  className="px-8 py-2.5 rounded-lg font-bold text-sm transition-all ml-auto"
                  style={{
                    background: isContactValid ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    color: isContactValid ? "#000000" : "#999999",
                    cursor: isContactValid ? "pointer" : "not-allowed",
                  }}
                  whileHover={isContactValid ? { scale: 1.05 } : {}}
                  whileTap={isContactValid ? { scale: 0.95 } : {}}
                >
                  ✓ TERMIN BESTÄTIGEN
                </motion.button>
              )}

              {step === "confirmation" && (
                <motion.button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm text-black ml-auto transition-all"
                  style={{
                    background: "#10b981",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fenster schließen
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
