"use client";

import { useCallback, useRef } from "react";

/** Sound events fired during the draw — wire up to your audio assets */
export type DrawSoundEvent =
  | "draw-open"
  | "spin-start"
  | "spin-tick"
  | "spin-slow"
  | "reel-stop"
  | "reveal"
  | "confetti"
  | "trophy-glow"
  | "complete";

export interface DrawSoundHooks {
  onDrawOpen?: () => void;
  onSpinStart?: () => void;
  onSpinTick?: () => void;
  onSpinSlow?: () => void;
  onReelStop?: () => void;
  onReveal?: () => void;
  onConfetti?: () => void;
  onTrophyGlow?: () => void;
  onComplete?: () => void;
}

const eventMap: Record<DrawSoundEvent, keyof DrawSoundHooks> = {
  "draw-open": "onDrawOpen",
  "spin-start": "onSpinStart",
  "spin-tick": "onSpinTick",
  "spin-slow": "onSpinSlow",
  "reel-stop": "onReelStop",
  reveal: "onReveal",
  confetti: "onConfetti",
  "trophy-glow": "onTrophyGlow",
  complete: "onComplete",
};

/**
 * Hook for draw sound effects. Pass callbacks to play audio files, e.g.:
 *
 * useDrawSounds({
 *   onSpinStart: () => audio.play('spin.mp3'),
 *   onConfetti: () => audio.play('celebration.mp3'),
 * })
 */
export function useDrawSounds(hooks: DrawSoundHooks = {}) {
  const hooksRef = useRef(hooks);
  hooksRef.current = hooks;

  const play = useCallback((event: DrawSoundEvent) => {
    const key = eventMap[event];
    hooksRef.current[key]?.();
  }, []);

  return { play };
}
