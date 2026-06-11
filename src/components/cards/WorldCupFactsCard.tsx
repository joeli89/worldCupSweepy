"use client";

import { motion } from "framer-motion";
import { Globe, Medal, Target, Trophy } from "lucide-react";
import { CardHeader } from "@/components/ui/CardHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { sweepstakeData } from "@/lib/data";

const factIcons = {
  trophy: Trophy,
  medal: Medal,
  goal: Target,
  globe: Globe,
};

export function WorldCupFactsCard() {
  const { worldCupFacts } = sweepstakeData;

  return (
    <GlassCard delay={0.4} className="h-full p-8 md:p-10">
      <CardHeader
        eyebrow="Heritage"
        title="World Cup"
        icon={Trophy}
        iconVariant="gold"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {worldCupFacts.map((fact, index) => {
          const Icon = factIcons[fact.icon as keyof typeof factIcons];

          return (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-gold/20 hover:bg-white/[0.06]"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <Icon className="mb-3 h-5 w-5 text-gold/70" />
              <p className="font-display text-2xl tracking-wide text-white text-glow-white">
                {fact.value}
              </p>
              <p className="mt-1 font-condensed text-[11px] uppercase tracking-[0.2em] text-white/40">
                {fact.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
