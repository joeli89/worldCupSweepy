"use client";

import { Trophy } from "lucide-react";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { CardHeader } from "@/components/ui/CardHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function LeaderboardCard() {
  return (
    <GlassCard id="leaderboard" featured delay={0.25} className="p-8 md:p-12">
      <CardHeader
        eyebrow="Rankings"
        title="Leaderboard"
        icon={Trophy}
        iconVariant="gold"
        className="mb-10"
      />

      <Leaderboard animateSwaps />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-8 border-t border-white/[0.08] pt-8">
        {[
          { label: "Gold", color: "bg-yellow-400", glow: "shadow-[0_0_12px_rgba(251,191,36,0.7)]" },
          { label: "Silver", color: "bg-slate-300", glow: "shadow-[0_0_10px_rgba(148,163,184,0.6)]" },
          { label: "Bronze", color: "bg-amber-600", glow: "shadow-[0_0_10px_rgba(180,83,9,0.6)]" },
        ].map((medal) => (
          <div key={medal.label} className="flex items-center gap-2.5">
            <span className={`h-2.5 w-2.5 rounded-full ${medal.color} ${medal.glow}`} />
            <span className="font-condensed text-xs uppercase tracking-[0.25em] text-white/40">
              {medal.label}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
