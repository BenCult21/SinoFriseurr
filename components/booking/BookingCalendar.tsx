"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type BookingCalendarProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

export default function BookingCalendar({
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const [viewDate, setViewDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const daysInMonth = getDaysInMonth(viewDate);
  const firstDay = getFirstDayOfMonth(viewDate);

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), i);
      days.push(date);
    }

    return days;
  }, [viewDate, daysInMonth, firstDay]);

  const monthName = viewDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const handlePrevMonth = () => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-300"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h3 className="text-sm font-semibold text-white capitalize">
          {monthName}
        </h3>

        <motion.button
          onClick={handleNextMonth}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-300"
          >
            <path d="M9 19l7-7-7-7" />
          </svg>
        </motion.button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-stone-300 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <motion.button
            key={index}
            onClick={() => {
              if (date && !isPast(date)) {
                onSelectDate(date);
              }
            }}
            disabled={!date || isPast(date)}
            className="aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all"
            style={{
              background:
                date && isSelected(date)
                  ? "rgba(16, 185, 129, 0.5)"
                  : date && isToday(date)
                    ? "rgba(255, 255, 255, 0.08)"
                    : "transparent",
              border:
                date && isSelected(date)
                  ? "1px solid rgba(16, 185, 129, 0.8)"
                  : date && isToday(date)
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid transparent",
              color:
                date && (isPast(date) || isWeekend(date))
                  ? "#888888"
                  : "#ffffff",
              cursor: !date || isPast(date) ? "not-allowed" : "pointer",
              opacity: !date || isPast(date) ? 0.4 : 1,
            }}
            whileHover={
              date && !isPast(date)
                ? {
                    background: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    scale: 1.05,
                  }
                : {}
            }
            whileTap={
              date && !isPast(date)
                ? { scale: 0.95 }
                : {}
            }
          >
            {date && date.getDate()}
          </motion.button>
        ))}
      </div>

      {/* Info Text */}
      <p className="text-xs text-stone-300 text-center mt-4">
        Verfügbar: Montag–Samstag
      </p>
    </motion.div>
  );
}
