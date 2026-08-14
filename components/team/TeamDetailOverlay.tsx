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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full max-w-md flex-col items-center overflow-hidden rounded-2xl bg-paper p-9 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] focus:outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-stone-500 transition-colors hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <motion.div
              layoutId={`team-tile-${member.name}`}
              className="flex h-28 w-28 items-center justify-center rounded-xl bg-ink"
            >
              <span className="font-display text-4xl font-medium text-paper">
                {member.name.charAt(0)}
              </span>
            </motion.div>

            <motion.h3
              layoutId={`team-name-${member.name}`}
              id="team-detail-name"
              className="mt-6 font-display text-2xl font-medium tracking-tight text-ink"
            >
              {member.name}
            </motion.h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">
              {member.role ?? "Team Sino Friseurstudio"}
            </p>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone-500">
              {member.bio ??
                "Weitere Informationen zu Spezialisierung und Erfahrung folgen in Kürze."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
