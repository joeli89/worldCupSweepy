"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WorldCupTeam } from "@/lib/world-cup-teams";

const CARD_WIDTH = 112;
const CARD_GAP = 12;
const STRIDE = CARD_WIDTH + CARD_GAP;
const SPIN_MS = 3200;
const FAST_PHASE = 0.72;

type CountryDrawReelProps = {
  teams: WorldCupTeam[];
  spinning: boolean;
  winnerId: string | null;
  spinKey: number;
  onSpinComplete?: () => void;
};

export function CountryDrawReel({
  teams,
  spinning,
  winnerId,
  spinKey,
  onSpinComplete,
}: CountryDrawReelProps) {
  const [offsetX, setOffsetX] = useState(0);
  const doneKeyRef = useRef(-1);

  const winnerIndex = winnerId
    ? teams.findIndex((t) => t.id === winnerId)
    : -1;

  const repeated = useMemo(
    () => [...teams, ...teams, ...teams, ...teams],
    [teams]
  );

  const landIndex =
    winnerIndex >= 0 ? 2 * teams.length + winnerIndex : 0;
  const targetX = -landIndex * STRIDE;

  useEffect(() => {
    if (!spinning || winnerIndex < 0 || teams.length === 0) return;
    if (doneKeyRef.current === spinKey) return;

    const start = 0;
    setOffsetX(0);

    const lap = teams.length * STRIDE;
    const fastScroll = -Math.max(1400, lap * 2);
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / SPIN_MS, 1);

      let x: number;
      if (t < FAST_PHASE) {
        const phaseT = t / FAST_PHASE;
        x = start + fastScroll * phaseT;
      } else {
        const phaseT = (t - FAST_PHASE) / (1 - FAST_PHASE);
        const eased = 1 - Math.pow(1 - phaseT, 3);
        x = fastScroll + (targetX - fastScroll) * eased;
      }

      setOffsetX(x);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setOffsetX(targetX);
        doneKeyRef.current = spinKey;
        onSpinComplete?.();
      }
    }

    requestAnimationFrame(tick);
  }, [spinning, winnerIndex, teams.length, spinKey, targetX, onSpinComplete]);

  if (teams.length === 0) {
    return (
      <div className="flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
        No countries available
      </div>
    );
  }

  const winner = winnerId ? teams.find((t) => t.id === winnerId) : null;

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0f24] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0f24] to-transparent sm:w-24" />

        <div
          className="pointer-events-none absolute inset-y-2 left-1/2 z-20 w-[118px] -translate-x-1/2 rounded-xl border-2 border-gold/50"
          style={{
            boxShadow:
              "0 0 40px rgba(251,191,36,0.35), inset 0 0 24px rgba(251,191,36,0.1)",
          }}
        />

        <div className="flex h-[92px] items-center overflow-hidden">
          <div
            className="flex gap-3 pl-[calc(50%-56px)]"
            style={{
              transform: `translateX(${offsetX}px)`,
              willChange: spinning ? "transform" : "auto",
            }}
          >
            {repeated.map((team, i) => {
              const isWinner =
                !spinning && i === landIndex && winnerId === team.id;
              return (
                <div
                  key={`${team.id}-${i}`}
                  className={`flex h-[84px] w-[112px] shrink-0 flex-col items-center justify-center rounded-xl border bg-white/[0.04] backdrop-blur-sm ${
                    isWinner
                      ? "border-gold/50 bg-gold/10"
                      : "border-white/[0.07]"
                  }`}
                >
                  <span className="text-3xl leading-none">{team.flag}</span>
                  <span className="mt-1 max-w-[96px] truncate font-display text-xs tracking-wide text-white/80">
                    {team.code}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {spinning && (
        <p className="mt-4 text-center animate-pulse font-display text-sm uppercase tracking-wide text-gold">
          Drawing…
        </p>
      )}

      {!spinning && winner && (
        <div className="mt-4 text-center">
          <p className="text-3xl">{winner.flag}</p>
          <p className="font-display text-xl uppercase text-white">
            {winner.name}
          </p>
          <p className="text-sm text-white/40">Group {winner.group}</p>
        </div>
      )}
    </div>
  );
}

export { SPIN_MS as REEL_SPIN_MS };
