"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Copy,
  Info,
  LayoutDashboard,
  Shield,
  Trophy,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems, sweepstakeData } from "@/lib/data";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  Shield,
  Trophy,
  BarChart3,
  Calendar,
  Info,
  UserPlus,
};

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const activeSection = useActiveSection([
    "overview",
    "live-arena",
    ...navItems.map((n) => n.id),
  ]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sweepstakeData.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNav = (id: string) => {
    scrollToSection(id);
    onNavigate?.();
  };

  const isActive = (id: string) =>
    activeSection === id ||
    (id === "overview" && activeSection === "live-arena");

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-screen w-72 flex-col border-r border-white/[0.08]"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,12,28,0.97) 0%, rgba(3,5,16,0.95) 100%)",
        backdropFilter: "blur(48px) saturate(200%)",
        WebkitBackdropFilter: "blur(48px) saturate(200%)",
      }}
    >
      <button
        type="button"
        onClick={() => handleNav("overview")}
        className="relative flex w-full items-center gap-4 border-b border-white/[0.08] px-6 py-7 text-left transition-colors hover:bg-white/[0.03]"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient">
          <Trophy className="relative z-10 h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-condensed text-[10px] uppercase tracking-[0.25em] text-white/40">
            World Cup 2026
          </p>
          <p className="font-display text-xl tracking-wide text-white">Sweepstake</p>
        </div>
      </button>

      <p className="px-6 pt-5 font-condensed text-[10px] uppercase tracking-[0.25em] text-white/30">
        Menu
      </p>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = isActive(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={cn(
                "nav-item w-full text-left",
                active && "nav-item-active"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  active ? "text-neon-purple" : "text-white/40"
                )}
              />
              <span className={cn("text-base", active && "font-semibold")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.08] p-4">
        <div className="glass-card rounded-2xl p-4">
          <p className="card-title mb-2">Invite Code</p>
          <div className="flex items-center justify-between gap-2">
            <code className="font-display text-xl tracking-wider text-gold">
              {sweepstakeData.inviteCode}
            </code>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/60"
              aria-label="Copy invite code"
            >
              <Copy className="h-4 w-4" />
            </motion.button>
          </div>
          {copied && (
            <p className="mt-2 text-xs font-medium text-emerald-400">Copied!</p>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
