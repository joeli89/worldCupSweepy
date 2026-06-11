"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import {
  DrawTeam,
  buildReelStrip,
  getWinnerStopIndex,
} from "@/lib/draw-teams";

const ITEM_HEIGHT = 72;

interface SlotMachineReelProps {
  winner: DrawTeam;
  spinning: boolean;
  onLand?: () => void;
  onTick?: () => void;
}

export function SlotMachineReel({
  winner,
  spinning,
  onLand,
  onTick,
}: SlotMachineReelProps) {
  const controls = useAnimation();
  const strip = useMemo(() => buildReelStrip(winner.id), [winner.id]);
  const stopIndex = getWinnerStopIndex(winner.id);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!spinning) {
      hasRun.current = false;
      return;
    }
    if (hasRun.current) return;
    hasRun.current = true;

    let tickInterval = setInterval(() => onTick?.(), 70);
    const slowTimer = setTimeout(() => {
      clearInterval(tickInterval);
      tickInterval = setInterval(() => onTick?.(), 180);
    }, 2800);

    controls
      .start({
        y: -(stopIndex * ITEM_HEIGHT) + ITEM_HEIGHT / 2,
        transition: {
          duration: 4,
          ease: [0.12, 0.82, 0.22, 1],
        },
      })
      .then(() => {
        clearInterval(tickInterval);
        clearTimeout(slowTimer);
        onLand?.();
      });

    return () => {
      clearInterval(tickInterval);
      clearTimeout(slowTimer);
    };
  }, [spinning, controls, stopIndex, onLand, onTick]);

  return (
    <div className="relative mx-auto w-full max-w-[220px]">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a1020]/90"
        style={{
          height: ITEM_HEIGHT,
          boxShadow:
            "inset 0 0 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-[#0a1020] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-gradient-to-t from-[#0a1020] to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-gold/45"
          style={{ boxShadow: "inset 0 0 30px rgba(251,191,36,0.15)" }}
        />

        <motion.div animate={controls} initial={{ y: 0 }} className="flex flex-col">
          {strip.map((team, i) => (
            <div
              key={`${team.id}-${i}`}
              className="flex h-[72px] shrink-0 items-center justify-center gap-3 border-b border-white/[0.04]"
            >
              <span className="text-4xl leading-none">{team.flag}</span>
              <div className="text-left">
                <p className="font-display text-sm tracking-wide text-white">
                  {team.name}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  {team.code}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -left-4 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-neon-purple/60 to-neon-blue/40" />
      <div className="pointer-events-none absolute -right-4 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-neon-purple/60 to-neon-blue/40" />
    </div>
  );
}
