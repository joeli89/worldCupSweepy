import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const headline = ["WORLD", "CUP", "2026"];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[calc(100vh-73px)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/world-cup-hero-trophy.png"
            alt="World Cup trophy on football pitch at night"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-[62%_center]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#030510] via-[#030510]/88 to-[#030510]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f4a]/45 via-transparent to-[#030510]" />
        <div className="hero-vignette absolute inset-0" />

        <div className="relative z-10 grid min-h-[calc(100vh-73px)] w-full grid-cols-1 items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_340px] lg:gap-14 lg:px-16 lg:py-14 xl:grid-cols-[1fr_380px] xl:px-20">
          {/* Left — headline */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center rounded-full border border-gold/35 bg-gold/10 px-5 py-2 backdrop-blur-xl">
              <span className="brand-eyebrow text-sm text-gold">
                FIFA World Cup · Live Sweepstake
              </span>
            </span>

            <div className="perspective-luxury mb-4">
              {headline.map((word) => (
                <span
                  key={word}
                  className={
                    word === "2026"
                      ? "hero-mega-gold block"
                      : "hero-mega block text-glow-white text-white"
                  }
                >
                  {word}
                </span>
              ))}
            </div>

            <p className="mb-8 max-w-lg text-lg font-light leading-relaxed text-white/75 md:text-xl">
              The sweepstake that brings the world together.
            </p>

            <div className="hidden border-t border-white/[0.06] pt-8 lg:block">
              <div className="flex gap-12">
                {[
                  { value: "32", label: "Teams" },
                  { value: "48", label: "Matches" },
                  { value: "3", label: "Host Nations" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — CTA column */}
          <aside className="w-full lg:max-w-[380px] lg:justify-self-end">
            <div className="glass-card rounded-card border border-white/[0.1] p-6 md:p-8">
              <p className="brand-eyebrow mb-2 text-gold">Ready to play?</p>
              <h2 className="mb-2 font-display text-2xl uppercase tracking-wide text-white">
                Join the sweepstake
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                Add your players, draw your countries, and follow the tournament
                with your group.
              </p>

              <div className="flex flex-col gap-3">
                <Link href="/get-started" className="btn-primary w-full justify-center py-4 text-xs">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/how-to-play" className="btn-secondary w-full justify-center py-4 text-xs">
                  <Play className="h-4 w-4 fill-current" />
                  How to Play
                </Link>
              </div>
            </div>
          </aside>

          {/* Stats — mobile only, full width below grid on small screens */}
          <div className="border-t border-white/[0.06] pt-8 lg:hidden">
            <div className="flex flex-wrap gap-10">
              {[
                { value: "32", label: "Teams" },
                { value: "48", label: "Matches" },
                { value: "3", label: "Host Nations" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030510] to-transparent" />
      </div>
    </section>
  );
}
