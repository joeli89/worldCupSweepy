/** Smooth-scroll to a page section with offset for sticky headers */
export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const isMobile = window.innerWidth < 1024;
  const offset = isMobile ? 72 : 88;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export const sectionIds = [
  "overview",
  "live-arena",
  "my-team",
  "sweepstake",
  "matches",
  "leaderboard",
  "invite",
  "rules",
] as const;

export type SectionId = (typeof sectionIds)[number];
