"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, CONTACT } from "@/lib/config";
import type { ServiceItem } from "@/lib/config";
import BookingCalendar from "./BookingCalendar";
import BookingTimeSelect from "./BookingTimeSelect";

type BookingStep = "service" | "date" | "contact" | "confirmation";

export default function BookingFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleReset = () => {
    setStep("service");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime("");
    setContact({ name: "", phone: "", email: "" });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const isServiceValid = selectedService;
  const isDateTimeValid = selectedDate && selectedTime;
  const isContactValid = contact.name && contact.phone;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop - behind everything */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={handleClose}
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            aria-hidden="true"
          />

          {/* Modal Container - centered on screen */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="w-full max-w-[650px] pointer-events-auto"
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Glass Container */}
              <div
                className="relative flex flex-col rounded-3xl overflow-hidden"
                style={{
                  maxHeight: "90vh",
                  background: "linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.06)",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-start justify-between px-8 py-6 flex-shrink-0"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)",
                  }}
                >
                  <div className="flex-1 pr-4">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                      Termin vereinbaren
                    </h2>
                    <p className="text-sm text-stone-300 mt-1">
                      {step === "service" && "Wählen Sie Ihre Leistung"}
                      {step === "date" && "Wählen Sie Datum & Uhrzeit"}
                      {step === "contact" && "Ihre Kontaktdaten"}
                      {step === "confirmation" && "Buchung bestätigt"}
                    </p>
                  </div>
                  <motion.button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-stone-300 hover:text-white transition-colors"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-8">
                  {/* Step: Service Selection */}
                  {step === "service" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {SERVICES[0].items.map((service) => (
                        <motion.button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className="w-full text-left p-4 rounded-xl transition-all"
                          style={{
                            background:
                              selectedService?.name === service.name
                                ? "rgba(255, 255, 255, 0.12)"
                                : "rgba(255, 255, 255, 0.04)",
                            border:
                              selectedService?.name === service.name
                                ? "1px solid rgba(255, 255, 255, 0.25)"
                                : "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                          whileHover={{
                            background: "rgba(255, 255, 255, 0.08)",
                            borderColor: "rgba(255, 255, 255, 0.18)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-base">
                                {service.name}
                              </h3>
                              <p className="text-xs text-stone-400 mt-1">
                                {service.duration}
                              </p>
                            </div>
                            <div className="text-right ml-4 flex-shrink-0">
                              <p className="text-white font-semibold text-lg">
                                {service.price}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Step: Date & Time Selection */}
                  {step === "date" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Calendar */}
                      <div>
                        <label className="block text-sm font-semibold text-white mb-4">
                          Datum wählen
                        </label>
                        <BookingCalendar
                          selectedDate={selectedDate}
                          onSelectDate={setSelectedDate}
                        />
                      </div>

                      {/* Time Selection */}
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="block text-sm font-semibold text-white mb-4">
                            Uhrzeit wählen
                          </label>
                          <BookingTimeSelect
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                          />
                        </motion.div>
                      )}

                      {/* Selected Date & Time Display */}
                      {selectedDate && selectedTime && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4 rounded-xl"
                          style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          <p className="text-sm text-stone-300">
                            Termin: <span className="text-green-300 font-semibold">{formatDate(selectedDate)} um {selectedTime} Uhr</span>
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step: Contact Information */}
                  {step === "contact" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                          }
                          placeholder="Ihr Name"
                          className="w-full px-4 py-3 rounded-lg text-white placeholder:text-stone-400 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255, 255, 255, 0.06)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) =>
                            setContact({ ...contact, phone: e.target.value })
                          }
                          placeholder="+49 (0) 123 456789"
                          className="w-full px-4 py-3 rounded-lg text-white placeholder:text-stone-400 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255, 255, 255, 0.06)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          E-Mail (optional)
                        </label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) =>
                            setContact({ ...contact, email: e.target.value })
                          }
                          placeholder="ihr@email.de"
                          className="w-full px-4 py-3 rounded-lg text-white placeholder:text-stone-400 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255, 255, 255, 0.06)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Confirmation */}
                  {step === "confirmation" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-center space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 100 }}
                        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                        style={{
                          background: "rgba(16, 185, 129, 0.15)",
                          border: "2px solid rgba(16, 185, 129, 0.4)",
                        }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-green-400"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>

                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          Termin gebucht!
                        </h3>
                        <p className="text-stone-300 text-sm">
                          Eine Bestätigung wird versendet an
                        </p>
                      </div>

                      <div
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                      >
                        <p className="text-white font-semibold break-all">
                          {contact.email || contact.phone}
                        </p>
                      </div>

                      <div className="space-y-3 pt-4">
                        <div
                          className="p-4 rounded-xl"
                          style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <div className="text-left space-y-2.5 text-sm">
                            <div className="flex justify-between">
                              <span className="text-stone-300">Leistung</span>
                              <span className="text-white font-semibold">
                                {selectedService?.name}
                              </span>
                            </div>
                            <div
                              className="h-px"
                              style={{
                                background: "rgba(255, 255, 255, 0.08)",
                              }}
                            />
                            <div className="flex justify-between">
                              <span className="text-stone-300">Datum & Zeit</span>
                              <span className="text-white font-semibold">
                                {selectedDate && formatDate(selectedDate)} {selectedTime}
                              </span>
                            </div>
                            <div
                              className="h-px"
                              style={{
                                background: "rgba(255, 255, 255, 0.08)",
                              }}
                            />
                            <div className="flex justify-between">
                              <span className="text-stone-300">Name</span>
                              <span className="text-white font-semibold">
                                {contact.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer - Action Buttons */}
                <div
                  className="flex gap-3 px-8 py-6 flex-shrink-0"
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%)",
                  }}
                >
                  {/* Back Button */}
                  {step !== "service" && step !== "confirmation" && (
                    <motion.button
                      onClick={() => {
                        if (step === "date") setStep("service");
                        else if (step === "contact") setStep("date");
                      }}
                      className="px-6 py-3 rounded-lg font-medium text-sm transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#e7e5e4",
                      }}
                      whileHover={{ background: "rgba(255, 255, 255, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Zurück
                    </motion.button>
                  )}

                  {/* Next/Confirm Button */}
                  <motion.button
                    onClick={() => {
                      if (step === "service" && isServiceValid) setStep("date");
                      else if (step === "date" && isDateTimeValid) setStep("contact");
                      else if (step === "contact" && isContactValid) setStep("confirmation");
                    }}
                    className="ml-auto px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background:
                        (step === "service" && isServiceValid) ||
                        (step === "date" && isDateTimeValid) ||
                        (step === "contact" && isContactValid)
                          ? "#ffffff"
                          : "rgba(255, 255, 255, 0.1)",
                      color:
                        (step === "service" && isServiceValid) ||
                        (step === "date" && isDateTimeValid) ||
                        (step === "contact" && isContactValid)
                          ? "#000000"
                          : "#999999",
                      cursor:
                        (step === "service" && isServiceValid) ||
                        (step === "date" && isDateTimeValid) ||
                        (step === "contact" && isContactValid)
                          ? "pointer"
                          : "not-allowed",
                    }}
                    whileHover={
                      (step === "service" && isServiceValid) ||
                      (step === "date" && isDateTimeValid) ||
                      (step === "contact" && isContactValid)
                        ? { scale: 1.05 }
                        : {}
                    }
                    whileTap={
                      (step === "service" && isServiceValid) ||
                      (step === "date" && isDateTimeValid) ||
                      (step === "contact" && isContactValid)
                        ? { scale: 0.95 }
                        : {}
                    }
                    disabled={
                      (step === "service" && !isServiceValid) ||
                      (step === "date" && !isDateTimeValid) ||
                      (step === "contact" && !isContactValid)
                    }
                  >
                    {step === "service" && "Weiter →"}
                    {step === "date" && "Weiter →"}
                    {step === "contact" && "✓ TERMIN BESTÄTIGEN"}
                  </motion.button>

                  {/* Close Button (Confirmation) */}
                  {step === "confirmation" && (
                    <motion.button
                      onClick={handleClose}
                      className="ml-auto px-8 py-3 rounded-lg font-semibold text-sm transition-all text-white"
                      style={{
                        background: "rgba(16, 185, 129, 0.8)",
                      }}
                      whileHover={{ background: "rgba(16, 185, 129, 1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Fenster schließen
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
