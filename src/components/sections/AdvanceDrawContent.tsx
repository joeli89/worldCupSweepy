"use client";

import Link from "next/link";
import { FileDown, Share2, Shuffle, Trophy } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CountryDrawReel,
  REEL_SPIN_MS,
} from "@/components/draw/CountryDrawReel";
import { StaticCard } from "@/components/ui/StaticCard";
import {
  exportSweepstakePdf,
  hasSweepstakeAssignments,
} from "@/lib/export-sweepstake-pdf";
import {
  getAllAssignedTeamIds,
  getPlayerTeamIds,
  loadPlayers,
  savePlayers,
  type SweepstakePlayer,
} from "@/lib/sweepstake-storage";
import {
  allWorldCupTeams,
  findWorldCupTeam,
  pickRandomTeam,
  worldCupGroups,
} from "@/lib/world-cup-teams";
import {
  buildShareMessage,
  buildShareUrl,
  getDisplayCode,
} from "@/lib/sweepstake-share";
import { cn } from "@/lib/utils";

type SpinState = {
  playerId: string;
  winner: (typeof allWorldCupTeams)[number];
  spinKey: number;
};

export function AdvanceDrawContent() {
  const [players, setPlayers] = useState<SweepstakePlayer[]>([]);
  const [ready, setReady] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [spinState, setSpinState] = useState<SpinState | null>(null);
  const [lastWinnerId, setLastWinnerId] = useState<string | null>(null);
  const spinKeyRef = useRef(0);
  const spinStateRef = useRef<SpinState | null>(null);
  const [queueRunning, setQueueRunning] = useState(false);
  const onSpinDoneRef = useRef<(() => void) | null>(null);
  const playersRef = useRef<SweepstakePlayer[]>([]);

  useEffect(() => {
    const stored = loadPlayers();
    setPlayers(stored);
    playersRef.current = stored;
    if (stored.length > 0) setActivePlayerId(stored[0].id);
    setReady(true);
  }, []);

  const spinning = spinState !== null;

  const activePlayer = players.find((p) => p.id === activePlayerId);
  const activePlayerLabel = useMemo(() => {
    if (!activePlayer) return "";
    const index = players.findIndex((p) => p.id === activePlayer.id);
    return activePlayer.name.trim() || `Player ${index + 1}`;
  }, [activePlayer, players]);

  const assignedTeamIds = useMemo(
    () => getAllAssignedTeamIds(players),
    [players]
  );
  const assignedTeamIdSet = useMemo(
    () => new Set(assignedTeamIds),
    [assignedTeamIds]
  );
  const teamsRemaining = allWorldCupTeams.length - assignedTeamIds.length;
  const canDraw = teamsRemaining > 0;

  const beginDraw = useCallback((playerId: string): boolean => {
    const winner = pickRandomTeam(getAllAssignedTeamIds(playersRef.current));
    if (!winner) return false;

    spinKeyRef.current += 1;
    const nextSpin: SpinState = {
      playerId,
      winner,
      spinKey: spinKeyRef.current,
    };
    spinStateRef.current = nextSpin;
    setActivePlayerId(playerId);
    setLastWinnerId(null);
    setSpinState(nextSpin);
    return true;
  }, []);

  const handleSpinComplete = useCallback(() => {
    const currentSpin = spinStateRef.current;
    if (!currentSpin) return;
    const { playerId, winner } = currentSpin;

    setPlayers((current) => {
      const next = current.map((player) =>
        player.id === playerId
          ? { ...player, teamIds: [...getPlayerTeamIds(player), winner.id] }
          : player
      );
      savePlayers(next);
      playersRef.current = next;

      if (next.length > 1) {
        const index = next.findIndex((p) => p.id === playerId);
        if (index !== -1) {
          setActivePlayerId(next[(index + 1) % next.length].id);
        }
      }

      return next;
    });

    setLastWinnerId(winner.id);
    spinStateRef.current = null;
    setSpinState(null);
    onSpinDoneRef.current?.();
    onSpinDoneRef.current = null;
  }, []);

  const drawForPlayer = useCallback(
    (playerId: string) => {
      if (spinning || queueRunning || !canDraw) return;
      beginDraw(playerId);
    },
    [spinning, queueRunning, canDraw, beginDraw]
  );

  const drawForActive = () => {
    if (!activePlayerId) return;
    drawForPlayer(activePlayerId);
  };

  const drawForEveryone = useCallback(async () => {
    if (spinning || queueRunning || players.length === 0 || !canDraw) {
      return;
    }

    setQueueRunning(true);

    try {
      for (const player of players) {
        if (
          getAllAssignedTeamIds(playersRef.current).length >=
          allWorldCupTeams.length
        ) {
          break;
        }

        const started = beginDraw(player.id);
        if (!started) break;

        await new Promise<void>((resolve) => {
          onSpinDoneRef.current = resolve;
        });
        await new Promise((r) => setTimeout(r, 400));
      }
    } finally {
      setQueueRunning(false);
    }
  }, [spinning, queueRunning, players, canDraw, beginDraw]);

  const reelWinnerId = spinning
    ? spinState?.winner.id ?? null
    : lastWinnerId;

  const [shareCopied, setShareCopied] = useState<"link" | "message" | null>(
    null
  );
  const shareCode = getDisplayCode();

  const canExportPdf = hasSweepstakeAssignments(players);

  const handleSavePdf = async () => {
    await exportSweepstakePdf(players);
  };

  const copyShare = async (type: "link" | "message") => {
    const text =
      type === "link" ? buildShareUrl(players) : buildShareMessage(players);
    await navigator.clipboard.writeText(text);
    setShareCopied(type);
    window.setTimeout(() => setShareCopied(null), 2000);
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white/50">
        Loading…
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Trophy className="mx-auto mb-4 h-10 w-10 text-gold" />
        <h1 className="font-display text-4xl uppercase text-white">No players yet</h1>
        <p className="mt-3 text-white/50">
          Add players on the Get Started page first.
        </p>
        <Link href="/get-started" className="btn-primary mt-8 inline-flex">
          Go to Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-20">
      <div className="mb-10 text-center md:mb-12">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5 text-gold" />
          <span className="brand-eyebrow text-gold">Team draw</span>
        </div>
        <h1 className="font-display text-5xl uppercase tracking-wide text-white md:text-6xl">
          Advance
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/55">
          Watch the reel land on a country. After each draw, the next player
          is selected automatically.
        </p>
      </div>

      <StaticCard className="mb-8 p-6 md:p-10">
        <p className="mb-6 text-center text-sm text-white/50">
          Drawing for{" "}
          <span className="font-semibold text-white">{activePlayerLabel}</span>
        </p>

        <CountryDrawReel
          teams={allWorldCupTeams}
          spinning={spinning}
          winnerId={reelWinnerId}
          spinKey={spinState?.spinKey ?? 0}
          onSpinComplete={handleSpinComplete}
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={drawForActive}
            disabled={!activePlayerId || spinning || queueRunning || !canDraw}
            className="btn-primary py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Shuffle className="h-4 w-4" />
            {spinning ? "Drawing…" : "Draw country"}
          </button>

          {players.length > 1 && (
            <button
              type="button"
              onClick={drawForEveryone}
              disabled={spinning || queueRunning || !canDraw}
              className="btn-secondary py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40"
            >
              Draw for everyone ({players.length})
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-white/35">
          Each country can only be drawn once · {teamsRemaining} remaining ·
          click Draw for everyone again for another round · ~
          {Math.round(REEL_SPIN_MS / 1000)}s per draw
        </p>
      </StaticCard>

      <StaticCard className="mb-8 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-neon-blue" />
          <h2 className="font-display text-2xl uppercase tracking-wide text-white">
            Share with others
          </h2>
        </div>
        <p className="mb-4 text-sm text-white/40">
          Send this code and link so someone else can open the same World Cup Sweepy
          on their device.
        </p>
        <div className="mb-6 rounded-xl border border-gold/30 bg-gold/5 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Your code
          </p>
          <p className="font-display text-3xl tracking-wider text-gold">
            {shareCode}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => copyShare("message")}
            className="btn-primary py-3 text-xs"
          >
            <Share2 className="h-4 w-4" />
            {shareCopied === "message" ? "Copied!" : "Copy invite message"}
          </button>
          <button
            type="button"
            onClick={() => copyShare("link")}
            className="btn-secondary py-3 text-xs"
          >
            {shareCopied === "link" ? "Copied!" : "Copy link only"}
          </button>
        </div>
      </StaticCard>

      <StaticCard className="mb-8 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="mb-2 font-display text-2xl uppercase tracking-wide text-white">
              Players
            </h2>
            <p className="text-sm text-white/40">
              The highlighted player is up next. Each draw moves to the next
              player in the list.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSavePdf}
            disabled={!canExportPdf}
            className="btn-secondary shrink-0 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40"
            title={
              canExportPdf
                ? "Download your World Cup Sweepy results as a PDF"
                : "Draw at least one country to export"
            }
          >
            <FileDown className="h-4 w-4" />
            Save as PDF
          </button>
        </div>
        <ul className="space-y-3">
          {players.map((player, index) => {
            const teamIds = getPlayerTeamIds(player);
            const teams = teamIds
              .map((id) => findWorldCupTeam(id))
              .filter(Boolean);
            const displayName = player.name.trim() || `Player ${index + 1}`;
            const isActive = player.id === activePlayerId;

            return (
              <li
                key={player.id}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  isActive
                    ? "border-gold/40 bg-gold/5"
                    : "border-white/[0.08] bg-white/[0.03]"
                )}
              >
                <div className="flex flex-wrap items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setActivePlayerId(player.id)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] font-display text-sm text-white/40">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{displayName}</p>
                      {isActive && (
                        <p className="text-sm text-gold">Up next</p>
                      )}
                      {teams.length === 0 && !isActive && (
                        <p className="text-sm text-white/35">No countries yet</p>
                      )}
                      {teams.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {teams.map((team, i) =>
                            team ? (
                              <span
                                key={`${team.id}-${i}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-white/70"
                              >
                                <span>{team.flag}</span>
                                <span>{team.name}</span>
                              </span>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => drawForPlayer(player.id)}
                    disabled={spinning || queueRunning || !canDraw}
                    className="btn-secondary shrink-0 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    + Draw
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </StaticCard>

      <StaticCard className="p-6 md:p-8">
        <h2 className="mb-2 font-display text-2xl uppercase tracking-wide text-white">
          All countries
        </h2>
        <p className="mb-6 text-sm text-white/40">
          Countries already drawn are marked. Once all 48 are taken, no more
          draws are possible.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {worldCupGroups.map((group) => (
            <div
              key={group.letter}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <p className="mb-3 font-display text-lg text-gold">
                Group {group.letter}
              </p>
              <ul className="space-y-2">
                {group.teams.map((team) => {
                  const taken = assignedTeamIdSet.has(team.id);

                  return (
                    <li
                      key={team.id}
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        taken ? "text-white/25 line-through" : "text-white/70"
                      )}
                    >
                      <span>{team.flag}</span>
                      <span>{team.name}</span>
                      {taken && (
                        <span className="text-[10px] uppercase tracking-wider text-white/30 no-underline">
                          drawn
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </StaticCard>
    </div>
  );
}
