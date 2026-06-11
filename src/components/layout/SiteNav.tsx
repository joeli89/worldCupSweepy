"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-to-play", label: "How to Play" },
];

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.08]"
      style={{
        background: "rgba(3,5,16,0.95)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="flex w-full items-center justify-between gap-4 px-6 py-4 md:px-10 lg:px-16 xl:px-20">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta-gradient">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="hidden font-display text-lg tracking-wide text-white sm:inline">
            World Cup Sweepy
          </span>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Main">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors md:px-5",
                  isActive
                    ? "bg-neon-purple/20 text-white ring-1 ring-neon-purple/40"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {isHome ? (
          <div className="w-[120px] shrink-0 sm:w-[140px]" aria-hidden />
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary shrink-0 py-2.5 text-xs md:px-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Go Back</span>
            <span className="sm:hidden">Back</span>
          </button>
        )}
      </div>
    </header>
  );
}
