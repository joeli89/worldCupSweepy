"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 10,
        isGold: Math.random() > 0.85,
      })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.isGold
              ? "rgba(251,191,36,0.8)"
              : "rgba(255,255,255,0.9)",
            boxShadow: p.isGold
              ? "0 0 6px rgba(251,191,36,0.6)"
              : "0 0 4px rgba(255,255,255,0.4)",
          }}
          animate={{
            y: [0, -40, -15, -55, 0],
            x: [0, 12, -8, 10, 0],
            opacity: [0.05, 0.6, 0.15, 0.7, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.random() * 8 + 8,
        color: ["#fbbf24", "#7c3aed", "#2563eb", "#a855f7", "#fde68a", "#6366f1"][
          Math.floor(Math.random() * 6)
        ],
        size: Math.random() * 7 + 3,
        rotation: Math.random() * 360,
      })),
    []
  );

  return (
    <>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "-5%",
            width: p.size,
            height: p.size * 0.55,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "1px",
            boxShadow: `0 0 8px ${p.color}80`,
          }}
          animate={{
            y: ["0vh", "115vh"],
            rotate: [p.rotation, p.rotation + 900],
            x: [0, Math.random() * 60 - 30],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

function FloodlightBeam({
  side,
  delay = 0,
  width = 320,
}: {
  side: "left" | "right" | "center-left" | "center-right";
  delay?: number;
  width?: number;
}) {
  const positions = {
    left: "left-[2%] -rotate-[28deg]",
    right: "right-[2%] rotate-[28deg]",
    "center-left": "left-[22%] -rotate-[12deg]",
    "center-right": "right-[22%] rotate-[12deg]",
  };

  return (
    <motion.div
      className={`absolute top-0 origin-top ${positions[side]}`}
      style={{ width, height: "85vh" }}
      animate={{ opacity: [0.2, 0.55, 0.2] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.02) 50%, transparent 80%)",
          clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-full w-1/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,191,36,0.06) 0%, transparent 60%)",
          clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </motion.div>
  );
}

function CrowdLights() {
  const lights = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 55 + Math.random() * 30,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        color:
          Math.random() > 0.7
            ? "rgba(251,191,36,0.7)"
            : Math.random() > 0.5
              ? "rgba(124,58,237,0.6)"
              : "rgba(255,255,255,0.5)",
      })),
    []
  );

  return (
    <>
      {lights.map((l) => (
        <motion.div
          key={l.id}
          className="absolute rounded-full"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            width: l.size,
            height: l.size,
            background: l.color,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: l.delay,
          }}
        />
      ))}
    </>
  );
}

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 45,
        size: Math.random() * 1.5 + 0.3,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </>
  );
}

export function StadiumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Deep blue gradient stack */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f4a] via-[#050816] to-[#020408]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/30 via-transparent to-[#4c1d95]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#0a1a3a]/40" />

      <Stars />

      {/* Stadium bowl — night architecture */}
      <div className="absolute inset-x-0 bottom-0 h-[65vh]">
        <svg
          viewBox="0 0 1440 500"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="standGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#050816" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer bowl */}
          <ellipse cx="720" cy="520" rx="820" ry="320" fill="url(#standGrad)" />
          <ellipse cx="720" cy="490" rx="680" ry="240" fill="rgba(30,58,138,0.2)" />
          <ellipse cx="720" cy="470" rx="540" ry="180" fill="rgba(76,29,149,0.08)" />
          {/* Roof structure hint */}
          <path
            d="M 80 380 Q 720 180 1360 380"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1.5"
          />
          {/* Pitch */}
          <ellipse cx="720" cy="430" rx="480" ry="95" fill="url(#pitchGrad)" />
          <ellipse cx="720" cy="430" rx="480" ry="95" fill="url(#pitchGlow)" />
          <ellipse
            cx="720"
            cy="430"
            rx="240"
            ry="48"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            x1="720"
            y1="382"
            x2="720"
            y2="478"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <CrowdLights />

      {/* Floodlight towers with bright halos */}
      {[
        { x: "5%", intensity: 1 },
        { x: "95%", intensity: 1 },
        { x: "20%", intensity: 0.85 },
        { x: "80%", intensity: 0.85 },
        { x: "38%", intensity: 0.6 },
        { x: "62%", intensity: 0.6 },
      ].map((light, i) => (
        <motion.div
          key={i}
          className="absolute top-[5%]"
          style={{ left: light.x }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        >
          <div
            className="relative"
            style={{
              filter: `brightness(${light.intensity})`,
            }}
          >
            <div
              className="h-4 w-4 rounded-full bg-white"
              style={{
                boxShadow:
                  "0 0 30px 12px rgba(255,255,255,0.5), 0 0 80px 30px rgba(255,255,255,0.2), 0 0 120px 50px rgba(251,191,36,0.08)",
              }}
            />
            <div className="absolute left-1/2 top-4 h-16 w-0.5 -translate-x-1/2 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* Bright floodlight beams */}
      <FloodlightBeam side="left" delay={0} width={380} />
      <FloodlightBeam side="right" delay={1.2} width={380} />
      <FloodlightBeam side="center-left" delay={0.6} width={260} />
      <FloodlightBeam side="center-right" delay={1.8} width={260} />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute -left-48 top-0 h-[700px] w-[700px] rounded-full bg-neon-blue/20 blur-[140px]"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-48 top-10 h-[600px] w-[600px] rounded-full bg-neon-purple/25 blur-[130px]"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 translate-y-1/4 rounded-full bg-emerald-500/[0.08] blur-[120px]" />

      {/* Atmospheric fog — layered */}
      <motion.div
        className="absolute inset-x-0 bottom-[15%] h-[350px]"
        style={{
          background:
            "linear-gradient(to top, rgba(30,58,138,0.15), rgba(76,29,149,0.08), transparent)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-[8%] h-[250px]"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.04), transparent)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[180px] bg-gradient-to-t from-[#050816] to-transparent"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <Particles />
      <Confetti />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#050816_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/60 via-transparent to-[#050816]/40" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
