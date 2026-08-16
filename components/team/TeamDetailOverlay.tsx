"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TeamMember } from "@/lib/config";

type TeamDetailOverlayProps = {
  member: TeamMember | null;
  onClose: () => void;
};

export default function TeamDetailOverlay({ member, onClose }: TeamDetailOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!member) return;
    panelRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            layoutId={`team-card-${member.name}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-detail-name"
            tabIndex={-1}
            transition={{ duration: 0.5 }}
            className="relative flex w-full max-w-md flex-col items-center overflow-hidden rounded-[28px] p-9 text-center focus:outline-none"
            style={{
              background: "linear-gradient(135deg, rgba(18, 18, 20, 0.92) 0%, rgba(12, 12, 14, 0.95) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              backdropFilter: "blur(25px)",
              boxShadow: "0 25px 60px -10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
            }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-stone-300 transition-colors hover:text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </motion.button>

            <motion.div
              layoutId={`team-tile-${member.name}`}
              className="flex h-32 w-32 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(60, 40, 35, 0.5) 0%, rgba(40, 30, 25, 0.7) 100%)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="font-heading text-5xl font-light text-stone-100">
                {member.name.charAt(0)}
              </span>
            </motion.div>

            <motion.h3
              layoutId={`team-name-${member.name}`}
              id="team-detail-name"
              className="mt-8 font-heading text-3xl lg:text-4xl font-semibold tracking-tight text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {member.name}
            </motion.h3>
            <motion.p
              className="mt-3 text-xs uppercase tracking-[0.15em] text-stone-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {member.role ?? "Team Sino Friseurstudio"}
            </motion.p>

            <motion.p
              className="mt-8 max-w-xs text-sm leading-relaxed text-stone-200"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {member.bio ??
                "Weitere Informationen zu Spezialisierung und Erfahrung folgen in Kürze."}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
