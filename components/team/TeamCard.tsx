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
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col items-start text-left"
      aria-haspopup="dialog"
    >
      <motion.div
        layoutId={`team-tile-${member.name}`}
        className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-ink transition-transform duration-500 group-hover:scale-[1.02]"
      >
        <span className="font-display text-6xl font-medium text-paper">
          {member.name.charAt(0)}
        </span>
      </motion.div>
      <motion.p
        layoutId={`team-name-${member.name}`}
        className="mt-5 font-display text-xl font-medium tracking-tight text-ink"
      >
        {member.name}
      </motion.p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">
        {member.role ?? "Team Sino Friseurstudio"}
      </p>
    </motion.button>
  );
}
