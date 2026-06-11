"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Minus, Plus, UserPlus, Users } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { StaticCard } from "@/components/ui/StaticCard";
import { MAX_PLAYERS, MIN_PLAYERS } from "@/lib/famous-players";
import { loadPlayers, savePlayers } from "@/lib/sweepstake-storage";
import { decodeSweepstakeShare } from "@/lib/sweepstake-share";

type Player = {
  id: string;
  name: string;
};

const initialPlayers: Player[] = [
  { id: "player-1", name: "" },
  { id: "player-2", name: "" },
  { id: "player-3", name: "" },
  { id: "player-4", name: "" },
];

export function SetupPlayersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = useId();
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [mounted, setMounted] = useState(false);
  const nextIdRef = useRef(initialPlayers.length + 1);

  useEffect(() => {
    const shared = searchParams.get("share");
    if (shared) {
      const imported = decodeSweepstakeShare(shared);
      if (imported && imported.length > 0) {
        savePlayers(imported);
        setPlayers(imported.map(({ id, name }) => ({ id, name })));
        const maxNum = imported.reduce((max, p) => {
          const match = p.id.match(/^player-(\d+)$/);
          return match ? Math.max(max, Number(match[1])) : max;
        }, 0);
        nextIdRef.current = maxNum + 1;
        setMounted(true);
        return;
      }
    }

    const stored = loadPlayers();
    if (stored.length > 0) {
      setPlayers(stored.map(({ id, name }) => ({ id, name })));
      const maxNum = stored.reduce((max, p) => {
        const match = p.id.match(/^player-(\d+)$/);
        return match ? Math.max(max, Number(match[1])) : max;
      }, 0);
      nextIdRef.current = maxNum + 1;
    }
    setMounted(true);
  }, [searchParams]);

  useEffect(() => {
    if (mounted) savePlayers(players);
  }, [players, mounted]);

  const createPlayerWithId = useCallback((name = "") => {
    const id = `player-${nextIdRef.current}`;
    nextIdRef.current += 1;
    return { id, name };
  }, []);

  const filledCount = players.filter((p) => p.name.trim()).length;

  const addPlayer = useCallback(() => {
    setPlayers((current) =>
      current.length >= MAX_PLAYERS
        ? current
        : [...current, createPlayerWithId()]
    );
  }, [createPlayerWithId]);

  const removePlayer = useCallback((id: string) => {
    setPlayers((current) =>
      current.length <= MIN_PLAYERS
        ? current
        : current.filter((player) => player.id !== id)
    );
  }, []);

  const updateName = useCallback((id: string, name: string) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, name } : player
      )
    );
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
      <div className="mb-10 text-center md:mb-12">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Users className="h-5 w-5 text-neon-blue" />
          <span className="brand-eyebrow text-neon-blue">Set up your group</span>
        </div>
        <h1 className="font-display text-5xl uppercase tracking-wide text-white md:text-6xl">
          Add Players
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/55">
          Enter names for everyone in your World Cup Sweepy.
        </p>
      </div>

      <StaticCard className="mb-8 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-white">
              Your players
            </h2>
            <p className="text-sm text-white/40">
              {filledCount} of {players.length} named · min {MIN_PLAYERS}, max{" "}
              {MAX_PLAYERS}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setPlayers((current) =>
                  current.length <= MIN_PLAYERS
                    ? current
                    : current.slice(0, -1)
                )
              }
              disabled={players.length <= MIN_PLAYERS}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Remove last player slot"
            >
              <Minus className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={addPlayer}
              disabled={players.length >= MAX_PLAYERS}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-blue/30 bg-neon-blue/10 text-neon-blue transition-colors hover:border-neon-blue/50 hover:bg-neon-blue/20 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Add player slot"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <ul id={listId} className="space-y-3" aria-label="Player list">
          {players.map((player, index) => (
            <li key={player.id} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] font-display text-sm text-white/40">
                {index + 1}
              </span>
              <input
                type="text"
                value={player.name}
                onChange={(e) => updateName(player.id, e.target.value)}
                placeholder={`Player ${index + 1} name`}
                className="min-w-0 flex-1 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors focus:border-neon-purple/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-neon-purple/20"
                aria-label={`Player ${index + 1} name`}
              />
              <button
                type="button"
                onClick={() => removePlayer(player.id)}
                disabled={players.length <= MIN_PLAYERS}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={`Remove player ${index + 1}`}
              >
                <Minus className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addPlayer}
          disabled={players.length >= MAX_PLAYERS}
          className="btn-ghost mt-4 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <UserPlus className="h-4 w-4" />
          Add another player
        </button>
      </StaticCard>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => router.push("/advance")}
          className="btn-primary inline-flex"
        >
          Advance
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
