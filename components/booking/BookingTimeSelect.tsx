"use client";

import { motion } from "framer-motion";

type BookingTimeSelectProps = {
  selectedTime: string;
  onSelectTime: (time: string) => void;
};

export default function BookingTimeSelect({
  selectedTime,
  onSelectTime,
}: BookingTimeSelectProps) {
  // Opening hours: 09:00 - 19:30 (closes 20:00), 30-minute intervals
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-4 gap-2"
    >
      {timeSlots.map((time) => (
        <motion.button
          key={time}
          onClick={() => onSelectTime(time)}
          className="py-2.5 px-2 rounded-lg font-medium text-sm transition-all"
          style={{
            background:
              selectedTime === time
                ? "rgba(255, 255, 255, 0.18)"
                : "rgba(255, 255, 255, 0.05)",
            border:
              selectedTime === time
                ? "1px solid rgba(255, 255, 255, 0.35)"
                : "1px solid rgba(255, 255, 255, 0.1)",
            color:
              selectedTime === time
                ? "#ffffff"
                : "#d6d3d0",
          }}
          whileHover={{
            background: "rgba(255, 255, 255, 0.12)",
            borderColor: "rgba(255, 255, 255, 0.25)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {time}
        </motion.button>
      ))}
    </motion.div>
  );
}
