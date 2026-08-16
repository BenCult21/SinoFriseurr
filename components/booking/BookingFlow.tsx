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
          {/* Backdrop - Animated with gradient */}
          <motion.div
            className="absolute inset-0"
            onClick={handleClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "radial-gradient(circle at 30% 50%, rgba(255, 46, 59, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 153, 255, 0.08) 0%, transparent 50%), rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal - Glassmorphism Design */}
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl flex flex-col overflow-hidden"
            style={{
              maxHeight: "90vh",
              minHeight: "500px",
              background: "linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.06), 0 0 40px 0 rgba(255, 46, 59, 0.08), 0 0 60px 0 rgba(0, 153, 255, 0.05)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Shimmer effect overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)",
              }}
            />

            {/* Header - Glossy gradient */}
            <div
              className="flex justify-between items-center px-6 sm:px-8 py-6 flex-shrink-0 relative z-10"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
              }}
            >
              <h2 className="text-2xl font-light text-ink tracking-wide">Termin buchen</h2>
              <motion.button
                onClick={handleClose}
                className="text-stone-400 hover:text-ink p-2 rounded-lg transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.1)",
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12 relative z-10">
              <div className="max-w-2xl mx-auto space-y-10">
                {/* Step 1: Service Selection */}
                {step === "service" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-light text-ink mb-6">1. Service wählen</h3>
                    <div className="space-y-3">
                      {SERVICES[0].items.map((service) => (
                        <motion.button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className="w-full text-left p-4 rounded-xl border transition-all"
                          style={{
                            border: selectedService?.name === service.name
                              ? "2px solid rgba(255, 46, 59, 0.8)"
                              : "2px solid rgba(255, 255, 255, 0.1)",
                            background: selectedService?.name === service.name
                              ? "linear-gradient(135deg, rgba(255, 46, 59, 0.15) 0%, rgba(255, 46, 59, 0.05) 100%)"
                              : "rgba(255, 255, 255, 0.03)",
                            backdropFilter: "blur(10px)",
                          }}
                          whileHover={{
                            borderColor: "rgba(0, 153, 255, 0.6)",
                            background: selectedService?.name === service.name
                              ? "linear-gradient(135deg, rgba(255, 46, 59, 0.2) 0%, rgba(255, 46, 59, 0.08) 100%)"
                              : "rgba(255, 255, 255, 0.06)",
                            scale: 1.02,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-ink font-light">{service.name}</p>
                              <p className="text-sm text-stone-500 mt-1">{service.duration}</p>
                            </div>
                            <p className="text-barber-red font-light">{service.price}</p>
                          </div>
                        </motion.button>
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
                        <motion.button
                          key={barber.name}
                          onClick={() => setSelectedBarber(barber.name)}
                          className="p-4 rounded-xl text-center border transition-all"
                          style={{
                            border: selectedBarber === barber.name
                              ? "2px solid rgba(255, 46, 59, 0.8)"
                              : "2px solid rgba(255, 255, 255, 0.1)",
                            background: selectedBarber === barber.name
                              ? "linear-gradient(135deg, rgba(255, 46, 59, 0.15) 0%, rgba(255, 46, 59, 0.05) 100%)"
                              : "rgba(255, 255, 255, 0.03)",
                            backdropFilter: "blur(10px)",
                          }}
                          whileHover={{
                            borderColor: "rgba(0, 153, 255, 0.6)",
                            background: selectedBarber === barber.name
                              ? "linear-gradient(135deg, rgba(255, 46, 59, 0.2) 0%, rgba(255, 46, 59, 0.08) 100%)"
                              : "rgba(255, 255, 255, 0.06)",
                            scale: 1.05,
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-barber-red to-barber-blue flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <span className="text-sm font-light text-white">{barber.name[0]}</span>
                          </div>
                          <p className="text-sm font-light text-ink">{barber.name}</p>
                          {barber.specialty && (
                            <p className="text-xs text-stone-500 mt-1">{barber.specialty}</p>
                          )}
                        </motion.button>
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
                        <label className="block text-sm text-stone-300 mb-3 uppercase tracking-wide font-light">Datum</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-5 py-4 rounded-lg border border-stone-600/50 text-ink focus:outline-none focus:border-barber-red focus:ring-2 focus:ring-barber-red/30 transition-all"
                          style={{
                            background: "rgba(20, 20, 20, 0.6)",
                            backdropFilter: "blur(8px)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide font-light">Uhrzeit</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-5 py-4 rounded-lg border border-stone-600/50 text-ink focus:outline-none focus:border-barber-red focus:ring-2 focus:ring-barber-red/30 transition-all"
                          style={{
                            background: "rgba(20, 20, 20, 0.6)",
                            backdropFilter: "blur(8px)",
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

                {/* Step 4: Contact Information */}
                {step === "contact" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-light text-ink mb-6">4. Kontaktdaten</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide font-light">Name *</label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => setContact({ ...contact, name: e.target.value })}
                          placeholder="Ihr Name"
                          className="w-full px-4 py-3 rounded-lg border border-stone-600/50 text-ink focus:outline-none focus:border-barber-red focus:ring-2 focus:ring-barber-red/20 transition-all placeholder:text-stone-600"
                          style={{
                            background: "rgba(20, 20, 20, 0.6)",
                            backdropFilter: "blur(8px)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide font-light">Telefon *</label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          placeholder={CONTACT.phone}
                          className="w-full px-4 py-3 rounded-lg border border-stone-600/50 text-ink focus:outline-none focus:border-barber-red focus:ring-2 focus:ring-barber-red/20 transition-all placeholder:text-stone-600"
                          style={{
                            background: "rgba(20, 20, 20, 0.6)",
                            backdropFilter: "blur(8px)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone-400 mb-2 uppercase tracking-wide font-light">E-Mail</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          placeholder="ihre@email.de"
                          className="w-full px-4 py-3 rounded-lg border border-stone-600/50 text-ink focus:outline-none focus:border-barber-red focus:ring-2 focus:ring-barber-red/20 transition-all placeholder:text-stone-600"
                          style={{
                            background: "rgba(20, 20, 20, 0.6)",
                            backdropFilter: "blur(8px)",
                          }}
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
            <div
              className="px-6 sm:px-8 py-6 flex-shrink-0 flex flex-col sm:flex-row gap-4 items-center justify-between relative z-10"
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
                backdropFilter: "blur(10px)",
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
                  className="w-full sm:w-auto px-6 py-3 text-ink border border-stone-600/50 rounded-xl text-sm font-light transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                  whileHover={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(0, 153, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Zurück
                </motion.button>
              )}

              {/* Next/Confirm Buttons */}
              {step === "service" && (
                <motion.button
                  onClick={() => setStep("barber")}
                  disabled={!isServiceValid}
                  className="flex-1 sm:flex-initial px-8 py-3 rounded-xl font-light text-white transition-all"
                  style={{
                    background: isServiceValid
                      ? "linear-gradient(135deg, #ff2e3b 0%, #ff6b78 100%)"
                      : "rgba(120, 113, 108, 0.5)",
                    backdropFilter: isServiceValid ? "blur(10px)" : "blur(5px)",
                    border: isServiceValid ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  whileHover={isServiceValid ? { scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 59, 0.5)" } : {}}
                  whileTap={isServiceValid ? { scale: 0.98 } : {}}
                >
                  Weiter →
                </motion.button>
              )}

              {step === "barber" && (
                <motion.button
                  onClick={() => setStep("date")}
                  disabled={!isBarberValid}
                  className="flex-1 sm:flex-initial px-8 py-3 rounded-xl font-light text-white transition-all"
                  style={{
                    background: isBarberValid
                      ? "linear-gradient(135deg, #ff2e3b 0%, #ff6b78 100%)"
                      : "rgba(120, 113, 108, 0.5)",
                    backdropFilter: isBarberValid ? "blur(10px)" : "blur(5px)",
                    border: isBarberValid ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  whileHover={isBarberValid ? { scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 59, 0.5)" } : {}}
                  whileTap={isBarberValid ? { scale: 0.98 } : {}}
                >
                  Weiter →
                </motion.button>
              )}

              {step === "date" && (
                <motion.button
                  onClick={() => setStep("contact")}
                  disabled={!isDateValid}
                  className="flex-1 sm:flex-initial px-8 py-3 rounded-xl font-light text-white transition-all"
                  style={{
                    background: isDateValid
                      ? "linear-gradient(135deg, #ff2e3b 0%, #ff6b78 100%)"
                      : "rgba(120, 113, 108, 0.5)",
                    backdropFilter: isDateValid ? "blur(10px)" : "blur(5px)",
                    border: isDateValid ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  whileHover={isDateValid ? { scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 59, 0.5)" } : {}}
                  whileTap={isDateValid ? { scale: 0.98 } : {}}
                >
                  Weiter →
                </motion.button>
              )}

              {step === "contact" && (
                <motion.button
                  onClick={() => setStep("confirmation")}
                  disabled={!isContactValid}
                  className="flex-1 sm:flex-initial px-8 py-4 rounded-xl font-bold text-lg text-black transition-all"
                  style={{
                    background: isContactValid
                      ? "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)"
                      : "rgba(120, 113, 108, 0.3)",
                    border: isContactValid
                      ? "2px solid rgba(0, 0, 0, 0.3)"
                      : "2px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: isContactValid ? "0 0 30px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)" : "none",
                  }}
                  whileHover={isContactValid ? {
                    scale: 1.08,
                    boxShadow: "0 0 40px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
                  } : {}}
                  whileTap={isContactValid ? { scale: 0.95 } : {}}
                >
                  ✓ TERMIN BESTÄTIGEN
                </motion.button>
              )}

              {step === "confirmation" && (
                <motion.button
                  onClick={handleClose}
                  className="flex-1 px-8 py-3 rounded-xl text-white font-light transition-all"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
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
