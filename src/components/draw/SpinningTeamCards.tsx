"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { DrawTeam } from "@/lib/draw-teams";

const CARD_WIDTH = 112;
const CARD_GAP = 12;
const STRIDE = CARD_WIDTH + CARD_GAP;

interface SpinningTeamCardsProps {
  teams: DrawTeam[];
  spinning: boolean;
  winningIndex: number;
  onSpinComplete?: () => void;
}

export function SpinningTeamCards({
  teams,
  spinning,
  winningIndex,
  onSpinComplete,
}: SpinningTeamCardsProps) {
  const repeated = useMemo(
    () => [...teams, ...teams, ...teams, ...teams],
    [teams]
  );

  // Land on winner in the 3rd copy so there's enough runway
  const landIndex = 2 * teams.length + winningIndex;
  const stopX = -landIndex * STRIDE;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0a1020] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0a1020] to-transparent" />

      <div
        className="pointer-events-none absolute inset-y-1 left-1/2 z-20 w-[118px] -translate-x-1/2 rounded-xl border-2 border-gold/50"
        style={{
          boxShadow:
            "0 0 40px rgba(251,191,36,0.3), inset 0 0 24px rgba(251,191,36,0.1)",
        }}
      />

      <div className="flex h-[88px] items-center overflow-hidden">
        <motion.div
          className="flex gap-3 pl-[calc(50%-56px)]"
          initial={{ x: 0 }}
          animate={
            spinning
              ? { x: [0, -1400, stopX] }
              : { x: stopX }
          }
          transition={
            spinning
              ? {
                  duration: 3.6,
                  times: [0, 0.72, 1],
                  ease: ["linear", "linear", [0.12, 0.75, 0.15, 1]],
                }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (spinning) onSpinComplete?.();
          }}
        >
          {repeated.map((team, i) => {
            const isWinner = i === landIndex;
            return (
              <motion.div
                key={`${team.id}-${i}`}
                className={`flex h-[80px] w-[112px] shrink-0 flex-col items-center justify-center rounded-xl border bg-white/[0.04] backdrop-blur-sm ${
                  isWinner && !spinning
                    ? "border-gold/50 bg-gold/10"
                    : "border-white/[0.07]"
                }`}
                animate={
                  spinning
                    ? { rotateY: [0, 180, 360, 540, 720] }
                    : { rotateY: 0 }
                }
                transition={
                  spinning
                    ? { duration: 3.6, ease: "linear" }
                    : { duration: 0.4 }
                }
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
              >
                <span className="text-3xl leading-none">{team.flag}</span>
                <span className="mt-1 font-display text-xs tracking-wide text-white/80">
                  {team.code}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
