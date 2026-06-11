"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  hover?: boolean;
  featured?: boolean;
  /** Show immediately — no scroll-triggered fade-in */
  immediate?: boolean;
}

export function GlassCard({
  children,
  className,
  delay = 0,
  id,
  hover = true,
  featured = false,
  immediate = false,
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.18), rgba(59,130,246,0.08) 40%, transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      id={id}
      initial={immediate ? false : { opacity: 0, y: 48 }}
      {...(immediate
        ? {}
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
          })}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        hover
          ? {
              y: -10,
              scale: 1.012,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      onMouseMove={hover ? handleMouseMove : undefined}
      className={cn(
        "glass-card group",
        featured && "glass-card-featured",
        hover && "cursor-default",
        className
      )}
    >
      <div className="glass-noise" aria-hidden />
      <div
        className={cn("glass-edge", featured && "glass-edge-always")}
        aria-hidden
      />

      <div
        className="glass-corner-glow -left-12 -top-12 bg-neon-purple/35"
        aria-hidden
      />
      <div
        className="glass-corner-glow -bottom-12 -right-12 bg-neon-blue/30"
        aria-hidden
      />
      {featured && (
        <div
          className="glass-corner-glow left-1/2 top-0 -translate-x-1/2 bg-gold/20"
          aria-hidden
        />
      )}

      {hover && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-card opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(139,92,246,0.08), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
