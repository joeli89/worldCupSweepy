"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function AmbientLayer() {
  const orbs = useMemo(
    () => [
      { x: "10%", y: "20%", size: 400, color: "rgba(139,92,246,0.12)", delay: 0 },
      { x: "85%", y: "35%", size: 350, color: "rgba(59,130,246,0.1)", delay: 2 },
      { x: "50%", y: "70%", size: 500, color: "rgba(251,191,36,0.06)", delay: 4 },
      { x: "25%", y: "55%", size: 280, color: "rgba(139,92,246,0.08)", delay: 1 },
    ],
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        duration: 10 + Math.random() * 8,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.35, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Horizontal light leak */}
      <motion.div
        className="absolute left-0 top-[30%] h-px w-full opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(251,191,36,0.4), transparent)",
        }}
        animate={{ opacity: [0.15, 0.4, 0.15], scaleX: [0.9, 1, 0.9] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
