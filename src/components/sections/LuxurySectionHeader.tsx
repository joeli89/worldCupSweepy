"use client";

import { motion } from "framer-motion";

interface LuxurySectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function LuxurySectionHeader({
  eyebrow,
  title,
  subtitle,
}: LuxurySectionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-16 md:mb-20"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* Live broadcast badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-2xl"
          style={{ boxShadow: "0 0 40px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <motion.span
            className="relative h-3 w-3 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
          </motion.span>
          <div>
            <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-white/40">
              Broadcast
            </p>
            <p className="font-display text-lg tracking-wide text-white">Live Now</p>
          </div>
        </motion.div>
      </div>

      <div className="glow-line-thick mt-10 max-w-2xl" />
    </motion.header>
  );
}
