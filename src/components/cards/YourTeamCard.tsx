"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { CardHeader } from "@/components/ui/CardHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { sweepstakeData } from "@/lib/data";

export function YourTeamCard() {
  const { userTeam } = sweepstakeData;

  return (
    <GlassCard id="my-team" featured delay={0.1} className="h-full p-8 md:p-10">
      <CardHeader
        eyebrow="Assignment"
        title="Your Team"
        icon={Shield}
        iconVariant="blue"
      />

      <div className="flex flex-col items-center gap-8 py-4 text-center md:py-8">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-gold/25 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-7xl backdrop-blur-xl"
          style={{
            boxShadow:
              "0 0 60px rgba(251,191,36,0.2), 0 0 100px rgba(59,130,246,0.1), inset 0 2px 0 rgba(255,255,255,0.15)",
          }}
        >
          {userTeam.flag}
          <motion.div
            className="absolute -inset-3 rounded-3xl border border-gold/20"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        <div>
          <p className="font-display text-5xl tracking-wide text-white text-glow-white md:text-6xl">
            {userTeam.name}
          </p>
          <p className="mt-3 font-condensed text-sm uppercase tracking-[0.3em] text-white/45">
            {userTeam.code} · Assigned
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-ghost mt-4"
      >
        View Team Profile
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </GlassCard>
  );
}
