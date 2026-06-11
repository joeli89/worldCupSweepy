"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { DrawTeam } from "@/lib/draw-teams";
import { WorldCupTrophy } from "@/components/ui/WorldCupTrophy";

interface DrawRevealProps {
  team: DrawTeam;
  show: boolean;
}

export function DrawReveal({ team, show }: DrawRevealProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center py-6"
    >
      {/* Trophy glow backdrop */}
      <motion.div
        className="absolute top-0 h-48 w-48 rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0.4, 0.8, 0.5],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(124,58,237,0.15) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative mb-4 h-28 w-28"
      >
        <WorldCupTrophy className="h-full w-full" />
      </motion.div>

      {/* Winning team card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ delay: 0.35, duration: 0.6, type: "spring", stiffness: 200 }}
        className="relative z-10 flex flex-col items-center rounded-2xl border-2 border-gold/50 bg-gradient-to-b from-gold/15 to-gold/5 px-10 py-6 backdrop-blur-xl"
        style={{
          boxShadow:
            "0 0 60px rgba(251,191,36,0.35), 0 0 120px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <motion.span
          className="text-6xl leading-none"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          {team.flag}
        </motion.span>
        <p className="mt-3 font-display text-3xl tracking-wide text-gold">
          {team.name}
        </p>
        <p className="mt-1 font-condensed text-xs uppercase tracking-[0.25em] text-white/45">
          {team.code} · Assigned
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center gap-2"
      >
        <Trophy className="h-4 w-4 text-gold" />
        <span className="font-condensed text-sm uppercase tracking-[0.2em] text-gold/80">
          Your World Cup Team
        </span>
      </motion.div>
    </motion.div>
  );
}
