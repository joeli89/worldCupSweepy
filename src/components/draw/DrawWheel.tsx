"use client";

import { useEffect, useRef, useState } from "react";
import type { WorldCupTeam } from "@/lib/world-cup-teams";

const SPIN_DURATION_MS = 4200;
const MIN_FULL_SPINS = 5;

type DrawWheelProps = {
  teams: WorldCupTeam[];
  spinning: boolean;
  winnerId: string | null;
  spinKey: number;
  onSpinComplete?: () => void;
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

const SEGMENT_COLORS = [
  "#1e3a8a",
  "#312e81",
  "#4c1d95",
  "#1e40af",
  "#065f46",
  "#7c2d12",
  "#831843",
  "#134e4a",
];

export function DrawWheel({
  teams,
  spinning,
  winnerId,
  spinKey,
  onSpinComplete,
}: DrawWheelProps) {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const completedKeyRef = useRef(-1);

  const winnerIndex = winnerId
    ? teams.findIndex((t) => t.id === winnerId)
    : -1;

  useEffect(() => {
    if (!spinning || winnerIndex < 0 || teams.length === 0) return;
    if (completedKeyRef.current === spinKey) return;

    const segment = 360 / teams.length;
    const segmentCenter = winnerIndex * segment + segment / 2;
    const currentMod = rotationRef.current % 360;
    const targetMod = 360 - segmentCenter;
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    const next = rotationRef.current + MIN_FULL_SPINS * 360 + delta;

    rotationRef.current = next;
    setRotation(next);

    const timer = window.setTimeout(() => {
      completedKeyRef.current = spinKey;
      onSpinComplete?.();
    }, SPIN_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [spinning, winnerIndex, teams.length, spinKey, onSpinComplete, winnerId]);

  if (teams.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
        No teams left to draw
      </div>
    );
  }

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const segmentAngle = 360 / teams.length;

  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
      <div className="pointer-events-none absolute -top-1 z-20">
        <div
          className="h-0 w-0 border-x-[14px] border-x-transparent border-b-[22px] border-b-gold"
          style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }}
        />
      </div>

      <div
        className="relative rounded-full border-4 border-gold/40 p-1"
        style={{
          boxShadow:
            "0 0 60px rgba(251,191,36,0.25), inset 0 0 40px rgba(139,92,246,0.15)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: size,
            height: size,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.12, 0.75, 0.15, 1)`
              : "none",
          }}
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {teams.map((team, index) => {
              const start = index * segmentAngle;
              const end = start + segmentAngle;
              return (
                <path
                  key={team.id}
                  d={describeArc(cx, cy, r, start, end)}
                  fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {teams.map((team, index) => {
            const mid = index * segmentAngle + segmentAngle / 2;
            const labelPos = polarToCartesian(cx, cy, r * 0.62, mid);
            const isWinner = !spinning && winnerId === team.id;

            return (
              <div
                key={`label-${team.id}`}
                className="absolute flex flex-col items-center text-center"
                style={{
                  left: labelPos.x,
                  top: labelPos.y,
                  transform: `translate(-50%, -50%) rotate(${mid}deg)`,
                  width: teams.length > 24 ? 36 : 52,
                }}
              >
                <span
                  className="block text-lg leading-none"
                  style={{ transform: `rotate(${-mid}deg)` }}
                >
                  {team.flag}
                </span>
                {teams.length <= 16 && (
                  <span
                    className={`mt-0.5 block truncate text-[8px] font-semibold uppercase leading-tight ${
                      isWinner ? "text-gold" : "text-white/80"
                    }`}
                    style={{ transform: `rotate(${-mid}deg)`, maxWidth: 48 }}
                  >
                    {team.code}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold/50 bg-[#0a0f24]"
          style={{ boxShadow: "0 0 24px rgba(251,191,36,0.3)" }}
        >
          <span className="font-display text-xs uppercase tracking-wider text-gold">
            Draw
          </span>
        </div>
      </div>

      {!spinning && winnerId && (
        <div className="mt-6 text-center">
          {(() => {
            const winner = teams.find((t) => t.id === winnerId);
            if (!winner) return null;
            return (
              <>
                <p className="text-4xl">{winner.flag}</p>
                <p className="font-display text-2xl uppercase text-white">
                  {winner.name}
                </p>
                <p className="text-sm text-white/40">Group {winner.group}</p>
              </>
            );
          })()}
        </div>
      )}

      {spinning && (
        <p className="mt-6 animate-pulse font-display text-lg uppercase tracking-wide text-gold">
          Spinning…
        </p>
      )}
    </div>
  );
}

export { SPIN_DURATION_MS };
