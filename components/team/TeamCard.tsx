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
      className="group flex flex-col items-start text-left cursor-pointer"
      aria-haspopup="dialog"
    >
      {/* Card Container with Glassmorphism */}
      <div
        className="p-5 rounded-lg w-full transition-all duration-300 relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        {/* Subtle Hover Light */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle 150px at center, rgba(255, 255, 255, 0.04) 0%, transparent 70%)",
          }}
        />

        {/* Image Container */}
        <motion.div
          layoutId={`team-tile-${member.name}`}
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 transition-all duration-300"
          whileHover={{
            scale: 1.02,
          }}
        >
          <motion.span
            className="font-heading text-6xl lg:text-7xl font-light text-white/60 group-hover:text-white/40 transition-colors duration-300"
            whileHover={{ scale: 0.95 }}
          >
            {member.name.charAt(0)}
          </motion.span>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent flex items-end p-6"
            transition={{ duration: 0.2 }}
          >
            <motion.p
              className="font-heading text-sm font-light text-white tracking-wide"
              initial={{ opacity: 0, y: 8 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {member.role ?? "Friseur"}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Name */}
      <motion.p
        layoutId={`team-name-${member.name}`}
        className="mt-6 font-heading text-lg lg:text-xl font-semibold text-white tracking-tight group-hover:text-stone-100 transition-colors"
        whileHover={{ x: 4, letterSpacing: "0.1em" }}
      >
        {member.name}
      </motion.p>

      {/* Subtitle */}
      <motion.p
        className="mt-2 text-xs font-light text-stone-200 group-hover:text-white transition-colors"
        whileHover={{ x: -2 }}
      >
        {member.role ?? "Team Sino Friseurstudio"}
      </motion.p>
    </motion.button>
  );
}
