"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#fbbf24", "#fde68a", "#7c3aed", "#2563eb", "#a855f7", "#6366f1", "#ffffff"];

interface DrawConfettiProps {
  active: boolean;
  burstKey?: number;
}

export function DrawConfetti({ active, burstKey = 0 }: DrawConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i + burstKey * 100,
        angle: (i / 90) * 360 + Math.random() * 20,
        distance: 120 + Math.random() * 280,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 720,
        delay: Math.random() * 0.15,
        isCircle: Math.random() > 0.45,
      })),
    [burstKey]
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {pieces.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;

        return (
          <motion.div
            key={`${burstKey}-${p.id}`}
            className="absolute left-1/2 top-1/2"
            style={{
              width: p.size,
              height: p.isCircle ? p.size : p.size * 0.5,
              backgroundColor: p.color,
              borderRadius: p.isCircle ? "50%" : "1px",
              boxShadow: `0 0 6px ${p.color}80`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{
              x: tx,
              y: ty,
              opacity: [1, 1, 0],
              scale: [0, 1.2, 0.6],
              rotate: p.rotation,
            }}
            transition={{
              duration: 1.8 + Math.random() * 0.8,
              delay: p.delay,
              ease: [0.16, 0.8, 0.2, 1],
            }}
          />
        );
      })}

      {/* Secondary burst — falling confetti */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`fall-${burstKey}-${i}`}
          className="absolute"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: "30%",
            width: 6 + Math.random() * 4,
            height: 4,
            backgroundColor: COLORS[i % COLORS.length],
            borderRadius: Math.random() > 0.5 ? "50%" : "1px",
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [0, 200 + Math.random() * 150],
            opacity: [0, 1, 1, 0],
            rotate: Math.random() * 720,
            x: Math.random() * 80 - 40,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: 0.3 + Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
