"use client";

import { motion } from "framer-motion";
import { UserPlus, Users } from "lucide-react";
import { CardHeader } from "@/components/ui/CardHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { sweepstakeData } from "@/lib/data";

export function SweepstakeStatusCard() {
  const { playersJoined, maxPlayers } = sweepstakeData;
  const progress = (playersJoined / maxPlayers) * 100;

  return (
    <GlassCard id="sweepstake" delay={0.15} className="p-8 md:p-10">
      <CardHeader
        eyebrow="Pool Status"
        title="Sweepstake"
        icon={Users}
        iconVariant="purple"
      />

      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <motion.span
            className="font-display text-6xl text-white text-glow-white md:text-7xl"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {playersJoined}
          </motion.span>
          <span className="font-display text-3xl text-white/25">/{maxPlayers}</span>
        </div>
        <motion.span
          className="rounded-full border border-neon-purple/35 bg-neon-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-purple"
          animate={{
            opacity: [0.85, 1, 0.85],
            boxShadow: [
              "0 0 0 rgba(139,92,246,0)",
              "0 0 28px rgba(139,92,246,0.35)",
              "0 0 0 rgba(139,92,246,0)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {Math.round(progress)}% full
        </motion.span>
      </div>

      <div className="progress-bar mb-3">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <p className="mb-8 text-sm text-white/40">
        {maxPlayers - playersJoined} spots remaining before the draw
      </p>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="btn-primary w-full"
      >
        <UserPlus className="h-4 w-4" />
        Invite Friends
      </motion.button>
    </GlassCard>
  );
}
