export type WorldCupTeam = {
  id: string;
  name: string;
  flag: string;
  code: string;
  group: string;
};

export type WorldCupGroup = {
  letter: string;
  teams: WorldCupTeam[];
};

const team = (
  id: string,
  name: string,
  flag: string,
  code: string,
  group: string
): WorldCupTeam => ({ id, name, flag, code, group });

export const worldCupGroups: WorldCupGroup[] = [
  {
    letter: "A",
    teams: [
      team("mex", "Mexico", "🇲🇽", "MEX", "A"),
      team("rsa", "South Africa", "🇿🇦", "RSA", "A"),
      team("kor", "South Korea", "🇰🇷", "KOR", "A"),
      team("cze", "Czechia", "🇨🇿", "CZE", "A"),
    ],
  },
  {
    letter: "B",
    teams: [
      team("can", "Canada", "🇨🇦", "CAN", "B"),
      team("bih", "Bosnia and Herzegovina", "🇧🇦", "BIH", "B"),
      team("qat", "Qatar", "🇶🇦", "QAT", "B"),
      team("sui", "Switzerland", "🇨🇭", "SUI", "B"),
    ],
  },
  {
    letter: "C",
    teams: [
      team("bra", "Brazil", "🇧🇷", "BRA", "C"),
      team("mar", "Morocco", "🇲🇦", "MAR", "C"),
      team("sco", "Scotland", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "SCO", "C"),
      team("hai", "Haiti", "🇭🇹", "HAI", "C"),
    ],
  },
  {
    letter: "D",
    teams: [
      team("usa", "United States", "🇺🇸", "USA", "D"),
      team("aus", "Australia", "🇦🇺", "AUS", "D"),
      team("par", "Paraguay", "🇵🇾", "PAR", "D"),
      team("tur", "Türkiye", "🇹🇷", "TUR", "D"),
    ],
  },
  {
    letter: "E",
    teams: [
      team("ger", "Germany", "🇩🇪", "GER", "E"),
      team("ecu", "Ecuador", "🇪🇨", "ECU", "E"),
      team("civ", "Côte d'Ivoire", "🇨🇮", "CIV", "E"),
      team("cuw", "Curaçao", "🇨🇼", "CUW", "E"),
    ],
  },
  {
    letter: "F",
    teams: [
      team("ned", "Netherlands", "🇳🇱", "NED", "F"),
      team("jpn", "Japan", "🇯🇵", "JPN", "F"),
      team("tun", "Tunisia", "🇹🇳", "TUN", "F"),
      team("swe", "Sweden", "🇸🇪", "SWE", "F"),
    ],
  },
  {
    letter: "G",
    teams: [
      team("bel", "Belgium", "🇧🇪", "BEL", "G"),
      team("irn", "Iran", "🇮🇷", "IRN", "G"),
      team("egy", "Egypt", "🇪🇬", "EGY", "G"),
      team("nzl", "New Zealand", "🇳🇿", "NZL", "G"),
    ],
  },
  {
    letter: "H",
    teams: [
      team("esp", "Spain", "🇪🇸", "ESP", "H"),
      team("uru", "Uruguay", "🇺🇾", "URU", "H"),
      team("ksa", "Saudi Arabia", "🇸🇦", "KSA", "H"),
      team("cpv", "Cape Verde", "🇨🇻", "CPV", "H"),
    ],
  },
  {
    letter: "I",
    teams: [
      team("fra", "France", "🇫🇷", "FRA", "I"),
      team("nor", "Norway", "🇳🇴", "NOR", "I"),
      team("sen", "Senegal", "🇸🇳", "SEN", "I"),
      team("irq", "Iraq", "🇮🇶", "IRQ", "I"),
    ],
  },
  {
    letter: "J",
    teams: [
      team("arg", "Argentina", "🇦🇷", "ARG", "J"),
      team("aut", "Austria", "🇦🇹", "AUT", "J"),
      team("alg", "Algeria", "🇩🇿", "ALG", "J"),
      team("jor", "Jordan", "🇯🇴", "JOR", "J"),
    ],
  },
  {
    letter: "K",
    teams: [
      team("por", "Portugal", "🇵🇹", "POR", "K"),
      team("col", "Colombia", "🇨🇴", "COL", "K"),
      team("uzb", "Uzbekistan", "🇺🇿", "UZB", "K"),
      team("cod", "DR Congo", "🇨🇩", "COD", "K"),
    ],
  },
  {
    letter: "L",
    teams: [
      team("eng", "England", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "ENG", "L"),
      team("cro", "Croatia", "🇭🇷", "CRO", "L"),
      team("gha", "Ghana", "🇬🇭", "GHA", "L"),
      team("pan", "Panama", "🇵🇦", "PAN", "L"),
    ],
  },
];

export const allWorldCupTeams: WorldCupTeam[] = worldCupGroups.flatMap(
  (group) => group.teams
);

export function findWorldCupTeam(id: string): WorldCupTeam | undefined {
  return allWorldCupTeams.find((team) => team.id === id);
}

export function getAvailableTeams(assignedTeamIds: string[]): WorldCupTeam[] {
  const taken = new Set(assignedTeamIds);
  return allWorldCupTeams.filter((team) => !taken.has(team.id));
}

export function pickRandomTeam(assignedTeamIds: string[]): WorldCupTeam | null {
  const available = getAvailableTeams(assignedTeamIds);
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
