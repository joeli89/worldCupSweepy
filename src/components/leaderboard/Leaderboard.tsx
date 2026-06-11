"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LeaderboardPlayer,
  leaderboardDemoStates,
  leaderboardPlayers,
} from "@/lib/leaderboard-data";
import { cn } from "@/lib/utils";
import { RankChangeIndicator, RankMedal } from "./RankMedal";

const podiumStyles: Record<
  number,
  { row: string; glow: string; points: string; avatarRing: string }
> = {
  1: {
    row: "bg-gradient-to-r from-yellow-500/[0.08] via-yellow-500/[0.03] to-transparent border-l-yellow-400/60",
    glow: "group-hover:shadow-[inset_0_0_30px_rgba(251,191,36,0.06)]",
    points: "text-gold",
    avatarRing: "ring-yellow-400/40 shadow-[0_0_16px_rgba(251,191,36,0.3)]",
  },
  2: {
    row: "bg-gradient-to-r from-slate-400/[0.07] via-slate-400/[0.02] to-transparent border-l-slate-400/50",
    glow: "group-hover:shadow-[inset_0_0_24px_rgba(148,163,184,0.05)]",
    points: "text-slate-200",
    avatarRing: "ring-slate-300/35 shadow-[0_0_12px_rgba(148,163,184,0.2)]",
  },
  3: {
    row: "bg-gradient-to-r from-amber-600/[0.08] via-amber-600/[0.02] to-transparent border-l-amber-600/50",
    glow: "group-hover:shadow-[inset_0_0_24px_rgba(180,83,9,0.06)]",
    points: "text-amber-300",
    avatarRing: "ring-amber-600/35 shadow-[0_0_12px_rgba(180,83,9,0.25)]",
  },
};

interface LeaderboardRowProps {
  player: LeaderboardPlayer;
  index: number;
}

function LeaderboardRow({ player, index }: LeaderboardRowProps) {
  const rankDelta =
    player.change !== "same"
      ? Math.abs(player.previousRank - player.rank)
      : undefined;
  const isPodium = player.rank <= 3;
  const podium = podiumStyles[player.rank];

  return (
    <motion.tr
      layout
      layoutId={player.id}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
      transition={{
        layout: { type: "spring", stiffness: 380, damping: 32 },
        opacity: { duration: 0.35 },
        delay: index * 0.05,
      }}
      className={cn(
        "group border-b border-white/[0.05] border-l-[3px] border-l-transparent transition-[box-shadow,background-color] duration-300 last:border-b-0",
        player.isCurrentUser &&
          "bg-neon-purple/[0.08] border-l-neon-purple/70 hover:bg-neon-purple/[0.12]",
        !player.isCurrentUser && isPodium && podium?.row,
        !player.isCurrentUser && isPodium && podium?.glow,
        !player.isCurrentUser && !isPodium && "hover:bg-white/[0.04]"
      )}
    >
      {/* Rank */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2.5">
          <RankMedal rank={player.rank} />
          <RankChangeIndicator change={player.change} delta={rankDelta} />
        </div>
      </td>

      {/* Player + avatar */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            layout
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ring-2",
              player.avatarGradient,
              isPodium ? podium?.avatarRing : "ring-white/10",
              player.isCurrentUser && "ring-neon-purple/50 shadow-[0_0_16px_rgba(124,58,237,0.35)]"
            )}
          >
            {player.initials}
          </motion.div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {player.name}
              {player.isCurrentUser && (
                <span className="ml-2 rounded-full border border-neon-purple/30 bg-neon-purple/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-purple">
                  You
                </span>
              )}
            </p>
            <p className="truncate text-xs text-white/35 sm:hidden">
              {player.countryFlag} {player.country}
            </p>
          </div>
        </div>
      </td>

      {/* Country assigned */}
      <td className="hidden px-4 py-4 sm:table-cell">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{player.countryFlag}</span>
          <div>
            <p className="text-sm font-medium text-white/85">{player.country}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
              {player.countryCode}
            </p>
          </div>
        </div>
      </td>

      {/* Points total */}
      <td className="px-4 py-4 text-right">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={player.points}
            initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className={cn(
              "font-display text-2xl tracking-wide",
              isPodium ? podium?.points : "text-white",
              player.isCurrentUser && !isPodium && "text-neon-purple"
            )}
          >
            {player.points}
          </motion.span>
        </AnimatePresence>
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/25">pts</p>
      </td>
    </motion.tr>
  );
}

interface LeaderboardProps {
  className?: string;
  id?: string;
  animateSwaps?: boolean;
}

export function Leaderboard({
  className,
  id = "leaderboard",
  animateSwaps = true,
}: LeaderboardProps) {
  const [demoIndex, setDemoIndex] = useState(0);
  const players = animateSwaps
    ? leaderboardDemoStates[demoIndex]
    : leaderboardPlayers;

  useEffect(() => {
    if (!animateSwaps) return;

    const interval = setInterval(() => {
      setDemoIndex((i) => (i + 1) % leaderboardDemoStates.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [animateSwaps]);

  const sorted = [...players].sort((a, b) => a.rank - b.rank);

  return (
    <div id={id} className={cn("flex flex-col", className)}>
      {/* Glass table container */}
      <div
        className="overflow-hidden rounded-2xl border border-white/[0.08]"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(124,58,237,0.03) 100%)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top reflection */}
        <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-h-[440px] overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[500px] border-collapse">
            {/* Sticky frosted header */}
            <thead className="sticky top-0 z-20">
              <tr
                className="border-b border-white/[0.08]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,12,28,0.98) 0%, rgba(5,8,22,0.96) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                {[
                  { label: "Rank", align: "left" },
                  { label: "Player", align: "left" },
                  { label: "Team Assigned", align: "left", hideMobile: true },
                  { label: "Points", align: "right" },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={cn(
                      "px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40",
                      col.align === "right" && "text-right",
                      col.hideMobile && "hidden sm:table-cell"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {sorted.map((player, index) => (
                  <LeaderboardRow
                    key={player.id}
                    player={player}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Live indicator */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Rankings update live · Last sync 2m ago
        </p>
      </div>
    </div>
  );
}
