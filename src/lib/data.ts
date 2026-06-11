export const sweepstakeData = {
  inviteCode: "WC26-X7K9",
  playersJoined: 18,
  maxPlayers: 32,
  userTeam: {
    name: "Brazil",
    flag: "🇧🇷",
    code: "BRA",
  },
  nextMatch: {
    home: { name: "Brazil", flag: "🇧🇷", code: "BRA" },
    away: { name: "Argentina", flag: "🇦🇷", code: "ARG" },
    date: "Jun 15, 2026",
    time: "20:00 GMT",
    venue: "MetLife Stadium, New Jersey",
  },
  leaderboard: [
    { rank: 1, name: "Marcus Silva", team: "🇧🇷 Brazil", points: 142, change: "up" as const },
    { rank: 2, name: "Emma Thompson", team: "🇫🇷 France", points: 138, change: "down" as const },
    { rank: 3, name: "James O'Brien", team: "🇩🇪 Germany", points: 131, change: "same" as const },
    { rank: 4, name: "Yuki Tanaka", team: "🇯🇵 Japan", points: 127, change: "up" as const },
    { rank: 5, name: "You", team: "🇧🇷 Brazil", points: 124, change: "down" as const },
  ],
  recentActivity: [
    { id: 1, type: "join" as const, user: "Sarah Chen", message: "joined World Cup Sweepy", time: "2m ago" },
    { id: 2, type: "team" as const, user: "Mike Ross", message: "was assigned 🇪🇸 Spain", time: "15m ago" },
    { id: 3, type: "leaderboard" as const, user: "Emma Thompson", message: "moved to #2 on the leaderboard", time: "1h ago" },
    { id: 4, type: "join" as const, user: "Alex Rivera", message: "joined World Cup Sweepy", time: "2h ago" },
    { id: 5, type: "team" as const, user: "You", message: "were assigned 🇧🇷 Brazil", time: "3h ago" },
  ],
  worldCupFacts: [
    { label: "Total Tournaments", value: "22", icon: "trophy" },
    { label: "Most Wins", value: "Brazil (5)", icon: "medal" },
    { label: "Total Goals Scored", value: "2,720+", icon: "goal" },
    { label: "Host Nation 2026", value: "USA · CAN · MEX", icon: "globe" },
  ],
  drawCompleted: false,
  drawnTeam: "Brazil",
};

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: "overview", label: "Home", icon: "LayoutDashboard", href: "#overview" },
  { id: "my-team", label: "My Team", icon: "Shield", href: "#my-team" },
  { id: "sweepstake", label: "Draw", icon: "Trophy", href: "#sweepstake" },
  { id: "leaderboard", label: "Rankings", icon: "BarChart3", href: "#leaderboard" },
  { id: "matches", label: "Matches", icon: "Calendar", href: "#matches" },
  { id: "invite", label: "Invite Friends", icon: "UserPlus", href: "#invite" },
  { id: "rules", label: "Rules", icon: "Info", href: "#rules" },
];
