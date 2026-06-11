export type RankChange = "up" | "down" | "same";

export type LeaderboardPlayer = {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  initials: string;
  avatarGradient: string;
  country: string;
  countryFlag: string;
  countryCode: string;
  points: number;
  change: RankChange;
  isCurrentUser?: boolean;
};

/** Default live standings — Top 5 */
export const leaderboardPlayers: LeaderboardPlayer[] = [
  {
    id: "p1",
    rank: 1,
    previousRank: 2,
    name: "Marcus Silva",
    initials: "MS",
    avatarGradient: "from-yellow-500 to-amber-700",
    country: "Brazil",
    countryFlag: "🇧🇷",
    countryCode: "BRA",
    points: 142,
    change: "up",
  },
  {
    id: "p2",
    rank: 2,
    previousRank: 1,
    name: "Emma Thompson",
    initials: "ET",
    avatarGradient: "from-blue-500 to-indigo-700",
    country: "France",
    countryFlag: "🇫🇷",
    countryCode: "FRA",
    points: 138,
    change: "down",
  },
  {
    id: "p3",
    rank: 3,
    previousRank: 3,
    name: "James O'Brien",
    initials: "JO",
    avatarGradient: "from-slate-400 to-zinc-700",
    country: "Germany",
    countryFlag: "🇩🇪",
    countryCode: "GER",
    points: 131,
    change: "same",
  },
  {
    id: "p4",
    rank: 4,
    previousRank: 5,
    name: "Yuki Tanaka",
    initials: "YT",
    avatarGradient: "from-rose-500 to-pink-700",
    country: "Japan",
    countryFlag: "🇯🇵",
    countryCode: "JPN",
    points: 127,
    change: "up",
  },
  {
    id: "p5",
    rank: 5,
    previousRank: 4,
    name: "You",
    initials: "YO",
    avatarGradient: "from-violet-500 to-purple-800",
    country: "Brazil",
    countryFlag: "🇧🇷",
    countryCode: "BRA",
    points: 124,
    change: "down",
    isCurrentUser: true,
  },
];

/**
 * Demo snapshot A — Yuki scores, closes gap on You (points update, ranks hold).
 */
export const leaderboardDemoPointsUpdate: LeaderboardPlayer[] = [
  { ...leaderboardPlayers[0] },
  { ...leaderboardPlayers[1] },
  { ...leaderboardPlayers[2] },
  {
    ...leaderboardPlayers[3],
    points: 129,
    change: "up",
    previousRank: 5,
  },
  {
    ...leaderboardPlayers[4],
    change: "down",
    previousRank: 4,
  },
];

/**
 * Demo snapshot B — Emma retakes #1 after France win (full rank swap at top).
 */
export const leaderboardDemoRankSwap: LeaderboardPlayer[] = [
  {
    ...leaderboardPlayers[1],
    rank: 1,
    previousRank: 2,
    points: 145,
    change: "up",
  },
  {
    ...leaderboardPlayers[0],
    rank: 2,
    previousRank: 1,
    change: "down",
  },
  { ...leaderboardPlayers[2] },
  { ...leaderboardPlayers[3], points: 127, change: "same", previousRank: 4 },
  { ...leaderboardPlayers[4], change: "same", previousRank: 5 },
];

export const leaderboardDemoStates: LeaderboardPlayer[][] = [
  leaderboardPlayers,
  leaderboardDemoPointsUpdate,
  leaderboardDemoRankSwap,
];
