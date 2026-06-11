"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const rules = [
  "Each player is randomly assigned one of the 32 World Cup teams at the draw.",
  "Points are awarded for match wins, goals scored, and knockout stage progression.",
  "Bonus points for clean sheets, penalty shootout wins, and reaching the final.",
  "The player with the most points at the end of the tournament wins the prize pool.",
  "All draws are transparent and verifiable — no duplicate teams allowed.",
  "Minimum 8 players required to start; maximum 32 players per World Cup Sweepy.",
];

export function RulesSection() {
  return (
    <GlassCard id="rules" delay={0.45} hover={false} className="p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-blue/20 bg-neon-blue/10">
          <BookOpen className="h-4 w-4 text-neon-blue" />
        </div>
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide text-white">
            Rules & Info
          </h2>
          <p className="text-sm text-white/35">Everything you need to know</p>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {rules.map((rule, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/70" />
            <span className="text-sm leading-relaxed text-white/60">{rule}</span>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}
