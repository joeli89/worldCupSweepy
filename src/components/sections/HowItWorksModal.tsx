"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Shuffle, Trophy, Users, X, Zap } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Join World Cup Sweepy",
    description:
      "Enter your invite code or create a new World Cup Sweepy with up to 32 friends and colleagues.",
    color: "text-neon-blue bg-neon-blue/10 border-neon-blue/20",
  },
  {
    icon: Shuffle,
    title: "Team Draw",
    description:
      "Once all spots are filled, teams are randomly assigned — fair, transparent, and exciting.",
    color: "text-neon-purple bg-neon-purple/10 border-neon-purple/20",
  },
  {
    icon: Zap,
    title: "Earn Points",
    description:
      "Score points based on your team's World Cup performance — wins, goals, and knockout progress.",
    color: "text-gold bg-gold/10 border-gold/20",
  },
  {
    icon: Trophy,
    title: "Win the Pool",
    description:
      "Climb the leaderboard and take home the prize pool. Glory awaits the ultimate predictor.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
];

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ open, onClose }: HowItWorksModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#050816]/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-card border border-white/[0.08] bg-[#0a1020]/95 p-6 shadow-glow-purple backdrop-blur-2xl md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="how-it-works-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gold" />
                  <span className="card-title text-gold/70">Getting Started</span>
                </div>
                <h2
                  id="how-it-works-title"
                  className="font-display text-3xl uppercase tracking-wide text-white"
                >
                  How It Works
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/60 transition-colors hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${step.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="font-display text-xs text-white/25">
                          0{index + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-white/45">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="btn-primary mt-6 w-full"
            >
              Got It — Let&apos;s Play
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
