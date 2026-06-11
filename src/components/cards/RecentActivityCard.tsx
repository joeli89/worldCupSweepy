"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, UserPlus, Users } from "lucide-react";
import { CardHeader } from "@/components/ui/CardHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { sweepstakeData } from "@/lib/data";

const activityIcons = {
  join: UserPlus,
  team: Users,
  leaderboard: TrendingUp,
};

const activityColors = {
  join: "text-neon-blue bg-neon-blue/12 border-neon-blue/25",
  team: "text-neon-purple bg-neon-purple/12 border-neon-purple/25",
  leaderboard: "text-gold bg-gold/12 border-gold/25",
};

export function RecentActivityCard() {
  const { recentActivity } = sweepstakeData;

  return (
    <GlassCard delay={0.35} className="h-full p-8 md:p-10">
      <CardHeader
        eyebrow="Feed"
        title="Activity"
        icon={Activity}
        iconVariant="blue"
      />

      <div className="space-y-4">
        {recentActivity.map((item, index) => {
          const Icon = activityIcons[item.type];
          const colorClass = activityColors[item.type];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
              className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.03]"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border backdrop-blur-sm ${colorClass}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] leading-snug text-white/75">
                  <span className="font-semibold text-white">{item.user}</span>{" "}
                  {item.message}
                </p>
                <p className="mt-1 font-condensed text-[11px] uppercase tracking-wider text-white/30">
                  {item.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
