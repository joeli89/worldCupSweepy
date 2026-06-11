export type DrawTeam = {
  id: string;
  name: string;
  flag: string;
  code: string;
};

/** World Cup 2026 sweepstake pool — realistic demo teams */
export const drawTeams: DrawTeam[] = [
  { id: "bra", name: "Brazil", flag: "🇧🇷", code: "BRA" },
  { id: "arg", name: "Argentina", flag: "🇦🇷", code: "ARG" },
  { id: "fra", name: "France", flag: "🇫🇷", code: "FRA" },
  { id: "ger", name: "Germany", flag: "🇩🇪", code: "GER" },
  { id: "esp", name: "Spain", flag: "🇪🇸", code: "ESP" },
  { id: "eng", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG" },
  { id: "por", name: "Portugal", flag: "🇵🇹", code: "POR" },
  { id: "ned", name: "Netherlands", flag: "🇳🇱", code: "NED" },
  { id: "ita", name: "Italy", flag: "🇮🇹", code: "ITA" },
  { id: "bel", name: "Belgium", flag: "🇧🇪", code: "BEL" },
  { id: "uru", name: "Uruguay", flag: "🇺🇾", code: "URU" },
  { id: "col", name: "Colombia", flag: "🇨🇴", code: "COL" },
  { id: "mex", name: "Mexico", flag: "🇲🇽", code: "MEX" },
  { id: "usa", name: "USA", flag: "🇺🇸", code: "USA" },
  { id: "jpn", name: "Japan", flag: "🇯🇵", code: "JPN" },
  { id: "kor", name: "South Korea", flag: "🇰🇷", code: "KOR" },
  { id: "mar", name: "Morocco", flag: "🇲🇦", code: "MAR" },
  { id: "cro", name: "Croatia", flag: "🇭🇷", code: "CRO" },
  { id: "sui", name: "Switzerland", flag: "🇨🇭", code: "SUI" },
  { id: "den", name: "Denmark", flag: "🇩🇰", code: "DEN" },
];

export function findTeamByName(name: string): DrawTeam | undefined {
  return drawTeams.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );
}

export function buildReelStrip(winnerId: string, cycles = 24): DrawTeam[] {
  const strip: DrawTeam[] = [];
  for (let c = 0; c < cycles; c++) {
    strip.push(...drawTeams);
  }
  const winner = drawTeams.find((t) => t.id === winnerId) ?? drawTeams[0];
  strip.push(winner);
  return strip;
}

export function getWinnerStopIndex(winnerId: string, cycles = 24): number {
  return cycles * drawTeams.length;
}
