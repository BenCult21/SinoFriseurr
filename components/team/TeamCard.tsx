"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/config";

type TeamCardProps = {
  member: TeamMember;
  onOpen: () => void;
};

export default function TeamCard({ member, onOpen }: TeamCardProps) {
  return (
    <motion.button
      type="button"
      layoutId={`team-card-${member.name}`}
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group flex flex-col items-start text-left cursor-pointer w-full"
      aria-haspopup="dialog"
    >
      {/* Card Container - includes image and text overlay */}
      <div
        className="p-5 rounded-lg w-full transition-all duration-300 relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        {/* Minimal Hover Light */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle 120px at center, rgba(255, 255, 255, 0.008) 0%, transparent 70%)",
          }}
        />

        {/* Image Container with Text Overlay */}
        <div
          className="relative flex flex-col items-center justify-between overflow-hidden rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 transition-all duration-300 h-64 sm:h-72 lg:h-80"
        >
          {/* Character Initial */}
          <div className="flex items-center justify-center flex-1 w-full">
            <span className="font-heading text-6xl lg:text-7xl font-light text-white/60 group-hover:text-white/50 transition-colors duration-300">
              {member.name.charAt(0)}
            </span>
          </div>

          {/* Text Overlay at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
            <div className="space-y-1">
              <p className="font-heading text-sm sm:text-base lg:text-lg font-semibold text-white tracking-tight">
                {member.name}
              </p>
              <p className="text-xs sm:text-xs font-light text-stone-300">
                {member.role ?? "Team Sino Friseurstudio"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
