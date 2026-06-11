"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Shuffle, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { CardHeader } from "@/components/ui/CardHeader";
import { DrawExperience } from "@/components/draw/DrawExperience";
import { GlassCard } from "@/components/ui/GlassCard";
import { sweepstakeData } from "@/lib/data";

export function SweepstakeDrawCard() {
  const { drawCompleted, drawnTeam, userTeam } = sweepstakeData;
  const [drawOpen, setDrawOpen] = useState(false);
  const [localComplete, setLocalComplete] = useState(drawCompleted);
  const [assignedTeam, setAssignedTeam] = useState(drawnTeam);

  const isComplete = localComplete;

  return (
    <>
      <GlassCard delay={0.3} className="h-full p-8 md:p-10">
        <CardHeader
          eyebrow="Ceremony"
          title="Team Draw"
          icon={Shuffle}
          iconVariant="purple"
        />

        {isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center py-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 24px rgba(251,191,36,0.25), inset 0 0 20px rgba(251,191,36,0.08)",
                  "0 0 56px rgba(251,191,36,0.5), inset 0 0 36px rgba(251,191,36,0.12)",
                  "0 0 24px rgba(251,191,36,0.25), inset 0 0 20px rgba(251,191,36,0.08)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border border-gold/35 bg-gold/10 text-5xl"
            >
              {userTeam.flag}
            </motion.div>

            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Draw Complete
              </span>
            </div>
            <p className="mt-2 text-center">
              <span className="text-sm text-white/50">You got </span>
              <span className="font-display text-2xl text-gold">{assignedTeam}</span>
              <span className="text-sm text-white/50">!</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDrawOpen(true)}
              className="btn-ghost mt-5 gap-2 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Watch Draw Again
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-neon-purple/25 bg-neon-purple/10"
            >
              <Shuffle className="h-6 w-6 text-neon-purple" />
            </motion.div>
            <p className="mb-1 font-display text-lg uppercase tracking-wide text-white">
              Draw Pending
            </p>
            <p className="mb-6 text-xs text-white/40">
              Run the draw to discover your World Cup team
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDrawOpen(true)}
              className="btn-primary w-full py-3 text-xs"
            >
              <Zap className="h-4 w-4" />
              Run Team Draw
            </motion.button>
          </div>
        )}

        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-white/25">
          <Sparkles className="h-3 w-3" />
          Random · Fair · Transparent
        </div>
      </GlassCard>

      <DrawExperience
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        winningTeamName={userTeam.name}
        onComplete={(team) => {
          setLocalComplete(true);
          setAssignedTeam(team.name);
        }}
        soundHooks={{
          // Wire up audio files here, e.g.:
          // onSpinStart: () => new Audio('/sounds/spin.mp3').play(),
          // onConfetti: () => new Audio('/sounds/celebration.mp3').play(),
        }}
      />
    </>
  );
}
