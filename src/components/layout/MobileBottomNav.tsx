"use client";

import {
  BarChart3,
  Calendar,
  Home,
  Shield,
  UserPlus,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Home", icon: Home },
  { id: "my-team", label: "Team", icon: Shield },
  { id: "leaderboard", label: "Ranks", icon: BarChart3 },
  { id: "matches", label: "Match", icon: Calendar },
  { id: "invite", label: "Invite", icon: UserPlus },
] as const;

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate?: () => void;
}

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  const handleClick = (id: string) => {
    scrollToSection(id);
    onNavigate?.();
  };

  // Map live-arena visibility to home when scrolling the dashboard
  const active =
    activeSection === "live-arena" ? "overview" : activeSection;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 lg:hidden"
      style={{
        background: "rgba(3,5,16,0.95)",
        backdropFilter: "blur(24px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleClick(id)}
              className={cn(
                "flex min-w-[64px] flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2.5 transition-colors",
                isActive
                  ? "bg-neon-purple/15 text-white"
                  : "text-white/45 active:bg-white/5"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "h-6 w-6",
                  isActive && "text-neon-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-[11px] font-semibold",
                  isActive && "text-white"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
