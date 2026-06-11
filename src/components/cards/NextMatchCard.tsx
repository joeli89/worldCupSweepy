"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { CardHeader } from "@/components/ui/CardHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { sweepstakeData } from "@/lib/data";

export function NextMatchCard() {
  const { nextMatch } = sweepstakeData;

  return (
    <GlassCard id="matches" delay={0.2} className="p-8 md:p-10">
      <CardHeader
        eyebrow="Fixtures"
        title="Next Match"
        icon={Calendar}
        iconVariant="emerald"
      />

      <div className="flex items-center justify-between gap-6 py-4">
        <div className="flex flex-col items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-6xl md:text-7xl"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
          >
            {nextMatch.home.flag}
          </motion.span>
          <span className="font-display text-2xl tracking-wide text-white">
            {nextMatch.home.code}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="match-vs-badge">vs</span>
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <Calendar className="h-3.5 w-3.5 text-neon-purple/60" />
              {nextMatch.date}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <Clock className="h-3.5 w-3.5 text-neon-purple/60" />
              {nextMatch.time}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-6xl md:text-7xl"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
          >
            {nextMatch.away.flag}
          </motion.span>
          <span className="font-display text-2xl tracking-wide text-white">
            {nextMatch.away.code}
          </span>
        </div>
      </div>

      <div
        className="mt-8 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm text-white/50 backdrop-blur-xl"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <MapPin className="h-4 w-4 shrink-0 text-neon-purple/70" />
        {nextMatch.venue}
      </div>
    </GlassCard>
  );
}
