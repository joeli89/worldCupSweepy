export type SweepstakePlayer = {
  id: string;
  name: string;
  /** @deprecated use teamIds */
  teamId?: string;
  teamIds?: string[];
};

const PLAYERS_KEY = "wc26-sweepstake-players";

function normalizePlayer(player: SweepstakePlayer): SweepstakePlayer {
  const teamIds =
    player.teamIds ??
    (player.teamId ? [player.teamId] : []);

  const { teamId: _legacy, ...rest } = player;
  return { ...rest, teamIds };
}

export function savePlayers(players: SweepstakePlayer[]): void {
  if (typeof window === "undefined") return;
  const toSave = players.map((p) => {
    const normalized = normalizePlayer(p);
    return { id: normalized.id, name: normalized.name, teamIds: normalized.teamIds };
  });
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(toSave));
}

export function loadPlayers(): SweepstakePlayer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PLAYERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SweepstakePlayer[];
    return Array.isArray(parsed) ? parsed.map(normalizePlayer) : [];
  } catch {
    return [];
  }
}

export function getPlayerTeamIds(player: SweepstakePlayer): string[] {
  return normalizePlayer(player).teamIds ?? [];
}

export function getAllAssignedTeamIds(players: SweepstakePlayer[]): string[] {
  return players.flatMap(getPlayerTeamIds);
}
