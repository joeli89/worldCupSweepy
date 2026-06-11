"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Crown, Medal, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface RankMedalProps {
  rank: number;
}

const medalConfig = {
  1: {
    icon: Crown,
    label: "Gold",
    ring: "ring-yellow-400/50",
    bg: "bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-700",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.55)]",
    text: "text-yellow-950",
    pulse: "rgba(251,191,36,0.4)",
  },
  2: {
    icon: Medal,
    label: "Silver",
    ring: "ring-slate-300/40",
    bg: "bg-gradient-to-br from-slate-100 via-slate-300 to-slate-600",
    glow: "shadow-[0_0_16px_rgba(148,163,184,0.45)]",
    text: "text-slate-800",
    pulse: "rgba(148,163,184,0.3)",
  },
  3: {
    icon: Medal,
    label: "Bronze",
    ring: "ring-amber-600/45",
    bg: "bg-gradient-to-br from-amber-400 via-orange-600 to-amber-900",
    glow: "shadow-[0_0_16px_rgba(180,83,9,0.45)]",
    text: "text-amber-950",
    pulse: "rgba(180,83,9,0.35)",
  },
} as const;

export function RankMedal({ rank }: RankMedalProps) {
  const config = medalConfig[rank as keyof typeof medalConfig];

  if (!config) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] font-display text-base text-white/35">
        {rank}
      </span>
    );
  }

  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 20, delay: rank * 0.06 }}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full ring-2",
        config.bg,
        config.ring,
        config.glow
      )}
      title={`${config.label} — Rank ${rank}`}
    >
      {rank === 1 && (
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: [`0 0 0 0 ${config.pulse}`, `0 0 0 8px transparent`] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <Icon className={cn("relative h-4 w-4", config.text)} strokeWidth={2.5} />
    </motion.div>
  );
}

interface RankChangeIndicatorProps {
  change: "up" | "down" | "same";
  delta?: number;
}

export function RankChangeIndicator({ change, delta }: RankChangeIndicatorProps) {
  if (change === "up") {
    return (
      <motion.span
        key="up"
        initial={{ opacity: 0, y: 8, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400"
      >
        <ArrowUp className="h-3 w-3" />
        {delta ?? ""}
      </motion.span>
    );
  }

  if (change === "down") {
    return (
      <motion.span
        key="down"
        initial={{ opacity: 0, y: -8, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="inline-flex items-center gap-0.5 rounded-full border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-400"
      >
        <ArrowDown className="h-3 w-3" />
        {delta ?? ""}
      </motion.span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5">
      <Minus className="h-3 w-3 text-white/20" />
    </span>
  );
}
