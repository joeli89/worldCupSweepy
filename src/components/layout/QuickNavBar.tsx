"use client";

import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

const links = [
  { id: "overview", label: "Home" },
  { id: "my-team", label: "My Team" },
  { id: "sweepstake", label: "Draw" },
  { id: "leaderboard", label: "Rankings" },
  { id: "matches", label: "Matches" },
  { id: "invite", label: "Invite" },
  { id: "rules", label: "Rules" },
] as const;

interface QuickNavBarProps {
  activeSection: string;
}

export function QuickNavBar({ activeSection }: QuickNavBarProps) {
  const active =
    activeSection === "live-arena" ? "my-team" : activeSection;

  return (
    <div
      className="sticky top-0 z-40 hidden border-b border-white/[0.08] lg:block"
      style={{
        background: "rgba(3,5,16,0.92)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-14 py-4 scrollbar-hide">
        <span className="mr-4 shrink-0 font-condensed text-[10px] uppercase tracking-[0.3em] text-white/35">
          Jump to
        </span>
        {links.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              active === id
                ? "bg-neon-purple/20 text-white ring-1 ring-neon-purple/40"
                : "text-white/50 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
