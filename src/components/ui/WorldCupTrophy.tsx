"use client";

import { motion } from "framer-motion";

interface WorldCupTrophyProps {
  className?: string;
}

export function WorldCupTrophy({ className = "" }: WorldCupTrophyProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Ambient gold glow */}
      <motion.div
        className="absolute inset-0 scale-110 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-full drop-shadow-[0_0_60px_rgba(251,191,36,0.4)]"
        aria-label="FIFA World Cup Trophy"
      >
        <defs>
          <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="trophyGoldLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="trophyBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <radialGradient id="trophyShine" cx="35%" cy="25%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <filter id="trophyGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base platform */}
        <ellipse cx="100" cy="265" rx="55" ry="8" fill="url(#trophyBase)" opacity="0.8" />
        <rect x="55" y="248" width="90" height="18" rx="3" fill="url(#trophyBase)" />
        <rect x="65" y="240" width="70" height="10" rx="2" fill="url(#trophyGold)" opacity="0.7" />

        {/* Stem */}
        <path
          d="M88 240 L88 195 Q88 185 100 185 Q112 185 112 195 L112 240"
          fill="url(#trophyGold)"
        />
        <path
          d="M92 240 L92 198 Q92 190 100 190 Q108 190 108 198 L108 240"
          fill="url(#trophyGoldLight)"
          opacity="0.5"
        />

        {/* Globe cup body */}
        <motion.g
          animate={{ rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 130px" }}
        >
          {/* Left handle */}
          <path
            d="M62 130 Q30 110 35 80 Q40 55 62 65 Q72 70 68 90 Q64 110 62 130"
            fill="url(#trophyGold)"
            stroke="#92400e"
            strokeWidth="0.5"
          />
          {/* Right handle */}
          <path
            d="M138 130 Q170 110 165 80 Q160 55 138 65 Q128 70 132 90 Q136 110 138 130"
            fill="url(#trophyGold)"
            stroke="#92400e"
            strokeWidth="0.5"
          />

          {/* Main cup bowl */}
          <ellipse cx="100" cy="130" rx="42" ry="48" fill="url(#trophyGold)" filter="url(#trophyGlow)" />
          <ellipse cx="100" cy="125" rx="36" ry="40" fill="url(#trophyShine)" />

          {/* Globe latitude lines */}
          <ellipse cx="100" cy="120" rx="30" ry="8" stroke="#92400e" strokeWidth="0.6" fill="none" opacity="0.4" />
          <ellipse cx="100" cy="130" rx="34" ry="10" stroke="#92400e" strokeWidth="0.6" fill="none" opacity="0.35" />
          <ellipse cx="100" cy="140" rx="30" ry="8" stroke="#92400e" strokeWidth="0.6" fill="none" opacity="0.4" />
          <line x1="68" y1="115" x2="132" y2="115" stroke="#92400e" strokeWidth="0.5" opacity="0.3" />
          <line x1="66" y1="130" x2="134" y2="130" stroke="#92400e" strokeWidth="0.5" opacity="0.3" />
          <line x1="68" y1="145" x2="132" y2="145" stroke="#92400e" strokeWidth="0.5" opacity="0.3" />

          {/* Rim highlight */}
          <ellipse cx="100" cy="82" rx="38" ry="10" fill="url(#trophyGoldLight)" opacity="0.7" />
          <ellipse cx="100" cy="82" rx="38" ry="10" stroke="#fde68a" strokeWidth="1" fill="none" opacity="0.5" />
        </motion.g>

        {/* Top figure silhouette (two athletes) */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="88" cy="72" r="6" fill="url(#trophyGold)" />
          <circle cx="112" cy="72" r="6" fill="url(#trophyGold)" />
          <path
            d="M82 78 Q88 68 94 78 L94 88 Q100 82 106 88 L106 78 Q112 68 118 78"
            fill="url(#trophyGold)"
            stroke="#92400e"
            strokeWidth="0.5"
          />
        </motion.g>

        {/* Sparkle accents */}
        {[
          { cx: 45, cy: 90, delay: 0 },
          { cx: 155, cy: 85, delay: 0.8 },
          { cx: 70, cy: 55, delay: 1.6 },
          { cx: 130, cy: 50, delay: 2.4 },
        ].map((spark, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={spark.cx}
              cy={spark.cy}
              r="2"
              fill="#fde68a"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: spark.delay,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
