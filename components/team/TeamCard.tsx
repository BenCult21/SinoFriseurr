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
      {/* Image Container */}
      <motion.div
        layoutId={`team-tile-${member.name}`}
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-stone-200 transition-all duration-500 group-hover:bg-stone-300"
        whileHover={{ scale: 1.01 }}
      >
        <span className="font-heading text-6xl lg:text-7xl font-light text-white/60 group-hover:text-white/40 transition-colors duration-300">
          {member.name.charAt(0)}
        </span>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent flex items-end p-6"
        >
          <p className="font-heading text-sm font-light text-white tracking-wide">
            {member.role ?? "Friseur"}
          </p>
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.p
        layoutId={`team-name-${member.name}`}
        className="mt-6 font-heading text-lg lg:text-xl font-light text-ink tracking-tight group-hover:text-stone-600 transition-colors"
      >
        {member.name}
      </motion.p>

      {/* Subtitle */}
      <p className="mt-2 text-xs font-light text-stone-500 group-hover:text-stone-600 transition-colors">
        {member.role ?? "Team Sino Friseurstudio"}
      </p>
    </motion.button>
  );
}
