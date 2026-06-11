"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Globe,
  Shuffle,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { WORLD_CUP_2026 } from "@/lib/world-cup-2026";

const steps = [
  {
    icon: Users,
    title: "Join World Cup Sweepy",
    description:
      `Get an invite code from the organiser, or start your own group with up to ${WORLD_CUP_2026.maxSweepstakePlayers} players.`,
    color: "icon-badge-blue text-neon-blue",
  },
  {
    icon: Shuffle,
    title: "Team draw",
    description:
      `When the group is full, every player is randomly assigned one of ${WORLD_CUP_2026.teamCount} World Cup teams. No duplicates.`,
    color: "icon-badge-purple text-neon-purple",
  },
  {
    icon: Zap,
    title: "Earn points",
    description:
      "Your team scores points for wins, goals, and how far they go in the knockout stages.",
    color: "icon-badge-gold text-gold",
  },
  {
    icon: Trophy,
    title: "Win the pool",
    description:
      "Whoever has the most points when the final whistle blows takes the prize.",
    color: "icon-badge border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
];

const rules = [
  `Each player gets one of the ${WORLD_CUP_2026.teamCount} World Cup teams — assigned randomly at the draw.`,
  "Points for match wins, goals scored, and knockout progress.",
  "Bonus points for clean sheets, penalty shootout wins, and reaching the final.",
  "Highest total at the end of the tournament wins the prize pool.",
  "Draws are fair and transparent — no two players get the same team.",
  `You need at least ${WORLD_CUP_2026.minSweepstakePlayers} players to start; maximum ${WORLD_CUP_2026.maxSweepstakePlayers} per World Cup Sweepy.`,
];

export function HowToPlayContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
      <div className="mb-12 text-center md:mb-16">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Globe className="h-5 w-5 text-gold" />
          <span className="brand-eyebrow text-gold">Getting started</span>
        </div>
        <h1 className="font-display text-5xl uppercase tracking-wide text-white md:text-6xl">
          How to Play
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/55">
          Four simple steps. One team each. May the best predictor win.
        </p>
      </div>

      <div className="mb-12 space-y-4 md:mb-16">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <GlassCard key={step.title} hover={false} immediate className="p-6 md:p-8">
              <div className="flex gap-5">
                <div className={step.color}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-1 font-display text-sm text-white/30">
                    Step {index + 1}
                  </p>
                  <h2 className="mb-2 font-display text-2xl uppercase tracking-wide text-white">
                    {step.title}
                  </h2>
                  <p className="text-base leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard hover={false} immediate className="mb-12 p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="icon-badge-blue">
            <BookOpen className="h-5 w-5 text-neon-blue" />
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-white">
              The rules
            </h2>
            <p className="text-sm text-white/40">Quick reference</p>
          </div>
        </div>

        <ul className="space-y-3">
          {rules.map((rule, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm leading-relaxed text-white/65">{rule}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <div className="text-center">
        <Link href="/" className="btn-primary inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
