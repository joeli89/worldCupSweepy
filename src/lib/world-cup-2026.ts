/** Official FIFA World Cup 2026™ tournament facts (48-team format). */
export const WORLD_CUP_2026 = {
  teamCount: 48,
  matchCount: 104,
  groupCount: 12,
  hostNations: 3,
  hostCities: 16,
  openingDate: "June 11, 2026",
  finalDate: "July 19, 2026",
  maxSweepstakePlayers: 48,
  minSweepstakePlayers: 8,
} as const;

export const heroStats = [
  { value: String(WORLD_CUP_2026.teamCount), label: "Teams" },
  { value: String(WORLD_CUP_2026.matchCount), label: "Matches" },
  { value: String(WORLD_CUP_2026.hostNations), label: "Host Nations" },
] as const;
