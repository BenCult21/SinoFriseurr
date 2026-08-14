"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/config";

type TeamCardProps = {
  member: TeamMember;
  onOpen: () => void;
  index?: number;
};

const TEAM_IMAGES = [
  "/images/salon-barber-row.jpg",
  "/images/salon-reception.jpg",
  "/images/salon-detail-leopard.jpg",
];

export default function TeamCard({ member, onOpen, index = 0 }: TeamCardProps) {
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
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-stone-200 transition-all duration-500 group-hover:bg-stone-300 group-hover:shadow-lg"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 15px 40px rgba(255, 46, 59, 0.1), 0 0 30px rgba(0, 153, 255, 0.05)",
        }}
      >
        <Image
          src={TEAM_IMAGES[index % TEAM_IMAGES.length]}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay for letter */}
        <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center group-hover:bg-stone-900/50 transition-colors duration-300" />

        <motion.span
          className="font-heading text-6xl lg:text-7xl font-light text-white/60 group-hover:text-white/40 transition-colors duration-300 relative z-10"
          whileHover={{ scale: 0.9, y: -10 }}
        >
          {member.name.charAt(0)}
        </motion.span>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-6"
        >
          <motion.p
            className="font-heading text-sm font-light text-white tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {member.role ?? "Friseur"}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.p
        layoutId={`team-name-${member.name}`}
        className="mt-6 font-heading text-lg lg:text-xl font-light text-ink tracking-tight group-hover:text-barber-red transition-colors"
        whileHover={{ x: 4, letterSpacing: "0.1em" }}
      >
        {member.name}
      </motion.p>

      {/* Subtitle */}
      <motion.p
        className="mt-2 text-xs font-light text-stone-500 group-hover:text-barber-blue transition-colors"
        whileHover={{ x: -2 }}
      >
        {member.role ?? "Team Sino Friseurstudio"}
      </motion.p>
    </motion.button>
  );
}
