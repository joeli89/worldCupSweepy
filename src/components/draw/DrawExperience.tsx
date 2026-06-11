"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Shuffle, Sparkles, X, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DrawConfetti } from "@/components/draw/DrawConfetti";
import { DrawReveal } from "@/components/draw/DrawReveal";
import { SlotMachineReel } from "@/components/draw/SlotMachineReel";
import { SpinningTeamCards } from "@/components/draw/SpinningTeamCards";
import {
  DrawSoundEvent,
  DrawSoundHooks,
  useDrawSounds,
} from "@/hooks/useDrawSounds";
import { DrawTeam, drawTeams, findTeamByName } from "@/lib/draw-teams";

type DrawPhase = "idle" | "spinning" | "reveal" | "complete";

interface DrawExperienceProps {
  open: boolean;
  onClose: () => void;
  winningTeamName?: string;
  soundHooks?: DrawSoundHooks;
  onComplete?: (team: DrawTeam) => void;
}

export function DrawExperience({
  open,
  onClose,
  winningTeamName = "Brazil",
  soundHooks,
  onComplete,
}: DrawExperienceProps) {
  const { play } = useDrawSounds(soundHooks);
  const [phase, setPhase] = useState<DrawPhase>("idle");
  const [confettiKey, setConfettiKey] = useState(0);
  const [cardsDone, setCardsDone] = useState(false);
  const [reelDone, setReelDone] = useState(false);

  const winner = findTeamByName(winningTeamName) ?? drawTeams[0];
  const winningIndex = Math.max(
    0,
    drawTeams.findIndex((t) => t.id === winner.id)
  );

  const reset = useCallback(() => {
    setPhase("idle");
    setCardsDone(false);
    setReelDone(false);
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const startDraw = () => {
    setCardsDone(false);
    setReelDone(false);
    setPhase("spinning");
    play("spin-start");
  };

  useEffect(() => {
    if (open) play("draw-open");
  }, [open, play]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  // Both animations landed → reveal sequence
  useEffect(() => {
    if (phase !== "spinning" || !cardsDone || !reelDone) return;

    const timer = setTimeout(() => {
      play("reveal");
      play("confetti");
      play("trophy-glow");
      setConfettiKey((k) => k + 1);
      setPhase("reveal");

      setTimeout(() => {
        setPhase("complete");
        play("complete");
        onComplete?.(winner);
      }, 1400);
    }, 400);

    return () => clearTimeout(timer);
  }, [phase, cardsDone, reelDone, play, onComplete, winner]);

  const isSpinning = phase === "spinning";
  const showReveal = phase === "reveal" || phase === "complete";
  const showConfetti = phase === "reveal" || phase === "complete";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#050816]/92 backdrop-blur-xl"
            onClick={
              phase === "idle" || phase === "complete" ? handleClose : undefined
            }
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 48 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 48 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[90] flex max-h-[92vh] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-card border border-white/[0.1] bg-[#0a1020]/96 shadow-glow-intense backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="draw-title"
          >
            <DrawConfetti active={showConfetti} burstKey={confettiKey} />

            {/* Header */}
            <div className="relative shrink-0 border-b border-white/[0.07] px-6 py-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    <span className="card-title text-gold/70">
                      FIFA World Cup 2026
                    </span>
                  </div>
                  <h2
                    id="draw-title"
                    className="font-display text-2xl uppercase tracking-wide text-white"
                  >
                    Team Draw
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white"
                  aria-label="Close draw"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto px-6 py-6">
              {phase === "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-neon-purple/35 bg-neon-purple/10"
                    style={{ boxShadow: "0 0 40px rgba(124,58,237,0.2)" }}
                  >
                    <Shuffle className="h-8 w-8 text-neon-purple" />
                  </motion.div>
                  <p className="mb-2 font-display text-xl uppercase tracking-wide text-white">
                    Ready for the Draw?
                  </p>
                  <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/45">
                    Your team will be randomly selected from the World Cup pool.
                    Fair, transparent, and final.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={startDraw}
                    className="btn-primary"
                  >
                    <Zap className="h-4 w-4" />
                    Start Draw
                  </motion.button>
                </motion.div>
              )}

              {(isSpinning || showReveal) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center font-condensed text-xs uppercase tracking-[0.3em] text-neon-purple"
                  >
                    {isSpinning ? "Drawing your team..." : "Team assigned!"}
                  </motion.p>

                  {!showReveal && (
                    <>
                      <SpinningTeamCards
                        teams={drawTeams}
                        spinning={isSpinning}
                        winningIndex={winningIndex}
                        onSpinComplete={() => setCardsDone(true)}
                      />

                      <div>
                        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.22em] text-white/30">
                          Flag Reel
                        </p>
                        <SlotMachineReel
                          winner={winner}
                          spinning={isSpinning}
                          onLand={() => {
                            setReelDone(true);
                            play("reel-stop");
                          }}
                          onTick={() => play("spin-tick")}
                        />
                      </div>
                    </>
                  )}

                  <DrawReveal team={winner} show={showReveal} />
                </motion.div>
              )}

              {phase === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex justify-center pb-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="btn-secondary"
                  >
                    Continue to Dashboard
                  </motion.button>
                </motion.div>
              )}
            </div>

            <div className="shrink-0 border-t border-white/[0.06] px-6 py-3">
              <p className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-white/20">
                <Sparkles className="h-3 w-3" />
                Random · Fair · Transparent
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { DrawSoundHooks, DrawSoundEvent };
