"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, CONTACT, TEAM } from "@/lib/config";
import type { ServiceItem } from "@/lib/config";
import BookingCalendar from "./BookingCalendar";
import BookingTimeSelect from "./BookingTimeSelect";

type BookingStep = "service" | "barber" | "date" | "contact" | "confirmation";

const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(25px)",
    transition: { duration: 0.6 }
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.4 }
  },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    transition: { duration: 0.4 }
  },
};

export default function BookingFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [hoverLight, setHoverLight] = useState({ x: 0, y: 0, isHovering: false });

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
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime("");
    setContact({ name: "", phone: "", email: "" });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const isServiceValid = selectedService;
  const isBarberValid = selectedBarber;
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

  const stepOrder = ["service", "barber", "date", "contact"];
  const currentStepIndex = stepOrder.indexOf(step as any);
  const progressSteps = ["Service", "Friseur", "Datum", "Kontakt"];

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Premium Backdrop - Liquid Glass Effect */}
          <motion.div
            className="fixed inset-0 z-[39]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            style={{
              background: "rgba(0, 0, 0, 0.84)",
              WebkitBackdropFilter: "blur(25px)",
            }}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none overflow-y-auto py-8 lg:py-12">
            <motion.div
              className="w-full max-w-[680px] pointer-events-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Premium Glass Container */}
              <div
                className="relative flex flex-col rounded-[32px] overflow-hidden"
                style={{
                  maxHeight: "90vh",
                  background: "linear-gradient(135deg, rgba(18, 18, 20, 0.92) 0%, rgba(12, 12, 14, 0.95) 100%)",
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  boxShadow: "0 25px 60px -10px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 0 60px rgba(255, 46, 59, 0.08)",
                }}
              >
                {/* Subtle Inner Light Highlight */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[32px]"
                  style={{
                    background: "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Header */}
                <div
                  className="relative z-10 flex items-start justify-between px-8 py-7 flex-shrink-0"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 100%)",
                  }}
                >
                  <div className="flex-1 pr-4">
                    <motion.h2
                      className="text-2xl lg:text-3xl font-light text-white tracking-tight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Termin vereinbaren
                    </motion.h2>

                    {/* Minimalist Progress Indicator */}
                    <motion.div
                      className="flex gap-3 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {progressSteps.map((label, idx) => (
                        <div key={label} className="flex items-center gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full transition-all"
                            style={{
                              background: idx <= currentStepIndex ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.2)",
                            }}
                          />
                          {idx < progressSteps.length - 1 && (
                            <div className="w-6 h-px" style={{ background: "rgba(255, 255, 255, 0.1)" }} />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Premium Close Button */}
                  <motion.button
                    onClick={handleClose}
                    className="p-2.5 rounded-xl transition-all flex-shrink-0 group"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white"
                      whileHover={{ rotate: 90 }}
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </motion.svg>
                  </motion.button>
                </div>

                {/* Content - Scrollable */}
                <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8">
                  {/* Step: Service Selection */}
                  {step === "service" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="space-y-3"
                    >
                      <h3 className="text-sm font-light text-white/80 mb-6">Wählen Sie Ihre Leistung</h3>
                      {SERVICES[0].items.map((service, idx) => (
                        <motion.button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className="w-full text-left p-5 rounded-2xl transition-all relative overflow-hidden group"
                          layout
                          whileHover={selectedService?.name !== service.name ? { y: -2 } : {}}
                          style={{
                            background: selectedService?.name === service.name
                              ? "rgba(255, 255, 255, 0.12)"
                              : "rgba(255, 255, 255, 0.06)",
                            border: selectedService?.name === service.name
                              ? "1px solid rgba(255, 255, 255, 0.3)"
                              : "1px solid rgba(255, 255, 255, 0.12)",
                            boxShadow: selectedService?.name === service.name
                              ? "0 0 30px rgba(255, 46, 59, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
                              : "inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                          }}
                          onHoverStart={() => setHoverLight({ x: 0, y: 0, isHovering: true })}
                          onHoverEnd={() => setHoverLight({ x: 0, y: 0, isHovering: false })}
                        >
                          {/* Hover Light Effect */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                            style={{
                              background: "radial-gradient(circle 200px at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
                            }}
                          />

                          <div className="relative flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-white font-light text-base group-hover:text-stone-100 transition-colors">
                                {service.name}
                              </h4>
                              <p className="text-xs text-white/60 mt-1.5">
                                {service.duration}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <p className="text-white font-light text-lg">
                                {service.price}
                              </p>
                              {selectedService?.name === service.name && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 rounded-full bg-barber-red flex items-center justify-center flex-shrink-0"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Step: Barber Selection */}
                  {step === "barber" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="space-y-4"
                    >
                      <h3 className="text-sm font-light text-white/80 mb-6">Wählen Sie Ihren Friseur</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {TEAM.map((barber) => (
                          <motion.button
                            key={barber.name}
                            onClick={() => setSelectedBarber(barber.name)}
                            className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all relative overflow-hidden group"
                            layout
                            whileHover={selectedBarber !== barber.name ? { y: -4 } : {}}
                            style={{
                              background: selectedBarber === barber.name
                                ? "rgba(255, 255, 255, 0.14)"
                                : "rgba(255, 255, 255, 0.06)",
                              border: selectedBarber === barber.name
                                ? "1.5px solid rgba(255, 255, 255, 0.35)"
                                : "1px solid rgba(255, 255, 255, 0.12)",
                              boxShadow: selectedBarber === barber.name
                                ? "0 0 30px rgba(255, 46, 59, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.12)"
                                : "inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            {/* Hover Light Effect */}
                            <motion.div
                              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                              style={{
                                background: "radial-gradient(circle 150px at center, rgba(255, 255, 255, 0.12) 0%, transparent 70%)",
                              }}
                            />

                            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center flex-shrink-0 mb-2 border border-white/15">
                              <span className="text-white font-light text-lg">
                                {barber.name.charAt(0)}
                              </span>
                            </div>
                            <p className="text-xs text-white font-light text-center">
                              {barber.name}
                            </p>

                            {selectedBarber === barber.name && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2"
                              >
                                <div className="w-4 h-4 rounded-full bg-barber-red flex items-center justify-center">
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Date & Time Selection */}
                  {step === "date" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="space-y-7"
                    >
                      <div>
                        <label className="block text-sm font-light text-white/80 mb-5">Datum wählen</label>
                        <BookingCalendar
                          selectedDate={selectedDate}
                          onSelectDate={setSelectedDate}
                        />
                      </div>

                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <label className="block text-sm font-light text-white/80">Uhrzeit wählen</label>
                          <BookingTimeSelect
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                          />
                        </motion.div>
                      )}

                      {selectedDate && selectedTime && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-5 rounded-2xl"
                          style={{
                            background: "rgba(16, 185, 129, 0.12)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <p className="text-sm text-white/90">
                            Gewählter Termin: <span className="text-green-300 font-light">{formatDate(selectedDate)} um {selectedTime} Uhr</span>
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step: Contact Information */}
                  {step === "contact" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="space-y-5"
                    >
                      <h3 className="text-sm font-light text-white/80 mb-6">Ihre Kontaktdaten</h3>

                      <div>
                        <label className="block text-xs font-light text-white/70 mb-2.5 uppercase tracking-wide">Name *</label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => setContact({ ...contact, name: e.target.value })}
                          placeholder="Ihr Name"
                          className="w-full px-5 py-3.5 rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.14)",
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-light text-white/70 mb-2.5 uppercase tracking-wide">Telefon *</label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          placeholder="+49 (0) 123 456789"
                          className="w-full px-5 py-3.5 rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.14)",
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-light text-white/70 mb-2.5 uppercase tracking-wide">E-Mail (optional)</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          placeholder="ihr@email.de"
                          className="w-full px-5 py-3.5 rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.14)",
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
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center space-y-7 py-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
                        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                        style={{
                          background: "rgba(16, 185, 129, 0.2)",
                          border: "2px solid rgba(16, 185, 129, 0.5)",
                          boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)",
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
                        <h3 className="text-2xl font-light text-white mb-2">Termin gebucht!</h3>
                        <p className="text-white/70 text-sm">Bestätigung wird versendet an</p>
                      </div>

                      <div
                        className="p-4 rounded-2xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "1px solid rgba(255, 255, 255, 0.14)",
                        }}
                      >
                        <p className="text-white/90 font-light text-sm break-all">
                          {contact.email || contact.phone}
                        </p>
                      </div>

                      <div
                        className="p-5 rounded-2xl space-y-3"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="text-left space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Leistung</span>
                            <span className="text-white/90 font-light">{selectedService?.name}</span>
                          </div>
                          <div className="h-px" style={{ background: "rgba(255, 255, 255, 0.08)" }} />
                          <div className="flex justify-between">
                            <span className="text-white/70">Friseur</span>
                            <span className="text-white/90 font-light">{selectedBarber}</span>
                          </div>
                          <div className="h-px" style={{ background: "rgba(255, 255, 255, 0.08)" }} />
                          <div className="flex justify-between">
                            <span className="text-white/70">Termin</span>
                            <span className="text-white/90 font-light">{selectedDate && formatDate(selectedDate)} {selectedTime}</span>
                          </div>
                          <div className="h-px" style={{ background: "rgba(255, 255, 255, 0.08)" }} />
                          <div className="flex justify-between">
                            <span className="text-white/70">Name</span>
                            <span className="text-white/90 font-light">{contact.name}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer - Action Buttons */}
                <div
                  className="relative z-10 flex gap-3 px-8 py-7 flex-shrink-0"
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%)",
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
                      className="px-6 py-3.5 rounded-xl font-light text-sm transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        color: "#e7e5e4",
                      }}
                      whileHover={{
                        background: "rgba(255, 255, 255, 0.12)",
                        borderColor: "rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Zurück
                    </motion.button>
                  )}

                  {/* Next/Confirm Button - Premium CTA */}
                  <motion.button
                    onClick={() => {
                      if (step === "service" && isServiceValid) setStep("barber");
                      else if (step === "barber" && isBarberValid) setStep("date");
                      else if (step === "date" && isDateTimeValid) setStep("contact");
                      else if (step === "contact" && isContactValid) setStep("confirmation");
                    }}
                    className="ml-auto px-8 py-3.5 rounded-xl font-light text-sm transition-all relative overflow-hidden group"
                    style={{
                      background:
                        (step === "service" && isServiceValid) ||
                        (step === "barber" && isBarberValid) ||
                        (step === "date" && isDateTimeValid) ||
                        (step === "contact" && isContactValid)
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(255, 255, 255, 0.1)",
                      color:
                        (step === "service" && isServiceValid) ||
                        (step === "barber" && isBarberValid) ||
                        (step === "date" && isDateTimeValid) ||
                        (step === "contact" && isContactValid)
                          ? "#000000"
                          : "#888888",
                      cursor:
                        (step === "service" && isServiceValid) ||
                        (step === "barber" && isBarberValid) ||
                        (step === "date" && isDateTimeValid) ||
                        (step === "contact" && isContactValid)
                          ? "pointer"
                          : "not-allowed",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    whileHover={
                      (step === "service" && isServiceValid) ||
                      (step === "barber" && isBarberValid) ||
                      (step === "date" && isDateTimeValid) ||
                      (step === "contact" && isContactValid)
                        ? { scale: 1.05, boxShadow: "0 0 30px rgba(255, 46, 59, 0.2)" }
                        : {}
                    }
                    whileTap={
                      (step === "service" && isServiceValid) ||
                      (step === "barber" && isBarberValid) ||
                      (step === "date" && isDateTimeValid) ||
                      (step === "contact" && isContactValid)
                        ? { scale: 0.95 }
                        : {}
                    }
                    disabled={
                      (step === "service" && !isServiceValid) ||
                      (step === "barber" && !isBarberValid) ||
                      (step === "date" && !isDateTimeValid) ||
                      (step === "contact" && !isContactValid)
                    }
                  >
                    {/* Light Sweep Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)",
                      }}
                      animate={{ x: ["−100%", "200%"] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                    <span className="relative">
                      {step === "service" && "Weiter →"}
                      {step === "barber" && "Weiter →"}
                      {step === "date" && "Weiter →"}
                      {step === "contact" && "✓ TERMIN BESTÄTIGEN"}
                    </span>
                  </motion.button>

                  {/* Close Button (Confirmation) */}
                  {step === "confirmation" && (
                    <motion.button
                      onClick={handleClose}
                      className="ml-auto px-8 py-3.5 rounded-xl font-light text-sm transition-all"
                      style={{
                        background: "rgba(16, 185, 129, 0.85)",
                        color: "#ffffff",
                        border: "1px solid rgba(16, 185, 129, 0.5)",
                        boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                      }}
                      whileHover={{
                        background: "rgba(16, 185, 129, 0.95)",
                        boxShadow: "0 0 30px rgba(16, 185, 129, 0.35)"
                      }}
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
