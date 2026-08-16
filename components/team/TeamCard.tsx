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
      className="group flex flex-col items-start text-left cursor-pointer focus:outline-none"
      aria-haspopup="dialog"
    >
      {/* Name - Appears first on scroll */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-heading text-xl lg:text-2xl font-semibold text-white tracking-tight group-hover:text-stone-50 transition-colors duration-300"
      >
        {member.name}
      </motion.p>

      {/* Role subtitle - Subtle reveal */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="mt-2 text-xs font-light text-stone-300 group-hover:text-stone-100 transition-colors duration-300"
      >
        {member.role ?? "Team Sino Friseurstudio"}
      </motion.p>

      {/* Image Container - Appears gradually */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="mt-8 w-full relative"
      >
        <div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(60, 40, 35, 0.6) 0%, rgba(40, 30, 25, 0.8) 100%)",
          }}
        >
          {/* Character Initial - Grows on hover */}
          <motion.span
            className="font-heading text-7xl lg:text-8xl font-light text-white/50 group-hover:text-white/70 transition-colors duration-300"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            {member.name.charAt(0)}
          </motion.span>

          {/* Minimal Hover Light */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle 150px at center, rgba(255, 255, 255, 0.006) 0%, transparent 70%)",
            }}
          />

          {/* Role Overlay - Fades in on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.p
              className="font-heading text-sm font-light text-stone-100 tracking-wide"
              initial={{ y: 4, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {member.role ?? "Friseur"}
            </motion.p>
          </motion.div>

          {/* Background glow on hover - very subtle */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255, 100, 90, 0.03) 0%, transparent 60%)",
            }}
          />
        </div>
      </motion.div>

      {/* Bio Preview - Optional tertiary text */}
      {member.bio && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 text-xs font-light text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors max-w-xs"
        >
          {member.bio.substring(0, 80)}
          {member.bio.length > 80 ? "…" : ""}
        </motion.p>
      )}
    </motion.button>
  );
}
