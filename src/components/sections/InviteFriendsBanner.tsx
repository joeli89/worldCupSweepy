"use client";

import { motion } from "framer-motion";
import { ArrowRight, Share2, Sparkles } from "lucide-react";

export function InviteFriendsBanner() {
  return (
    <motion.section
      id="invite"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.008 }}
      className="group relative h-full min-h-[320px] overflow-hidden rounded-card border border-neon-purple/35 p-10 backdrop-blur-2xl md:p-14"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.25) 40%, rgba(3,5,16,0.9) 100%)",
        boxShadow:
          "0 24px 80px rgba(0,0,0,0.65), inset 0 2px 0 rgba(255,255,255,0.12), 0 0 80px rgba(139,92,246,0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, rgba(139,92,246,0.25), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(59,130,246,0.2), transparent 50%)",
        }}
      />

      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-neon-purple/30 blur-[100px] transition-all duration-500 group-hover:bg-neon-purple/40" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-neon-blue/25 blur-[100px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-gold drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]" />
            <span className="brand-eyebrow text-gold">Grow Your Sweepy</span>
          </div>
          <h2 className="font-display text-5xl uppercase leading-[0.88] tracking-wide text-white md:text-6xl">
            Invite Friends.
            <br />
            <span className="text-white/35">Fill The Draw.</span>
            <br />
            <span
              className="bg-gold-gradient bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 40px rgba(251,191,36,0.4))" }}
            >
              Win Together.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
            Share your invite code and get everyone in before kickoff. The more
            players, the bigger the prize pool.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-primary w-fit"
        >
          <Share2 className="h-5 w-5" />
          Share Invite Link
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
