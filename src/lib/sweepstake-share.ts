import type { SweepstakePlayer } from "@/lib/sweepstake-storage";

const DISPLAY_CODE_KEY = "wc26-sweepstake-display-code";

function toBase64Url(value: string): string {
  return btoa(unescape(encodeURIComponent(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(escape(atob(base64)));
}

export function getDisplayCode(): string {
  if (typeof window === "undefined") return "WC26-????";

  let code = localStorage.getItem(DISPLAY_CODE_KEY);
  if (!code) {
    code = `WC26-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    localStorage.setItem(DISPLAY_CODE_KEY, code);
  }

  return code;
}

export function encodeSweepstakeShare(players: SweepstakePlayer[]): string {
  return toBase64Url(JSON.stringify(players));
}

export function decodeSweepstakeShare(encoded: string): SweepstakePlayer[] | null {
  try {
    const parsed = JSON.parse(fromBase64Url(encoded));
    return Array.isArray(parsed) ? (parsed as SweepstakePlayer[]) : null;
  } catch {
    return null;
  }
}

export function buildShareUrl(players: SweepstakePlayer[]): string {
  if (typeof window === "undefined") return "";
  const share = encodeSweepstakeShare(players);
  return `${window.location.origin}/get-started?share=${share}`;
}

export function buildShareMessage(players: SweepstakePlayer[]): string {
  const code = getDisplayCode();
  const link = buildShareUrl(players);
  const namedCount = players.filter((player) => player.name.trim()).length;

  return [
    "Join my World Cup 2026 Sweepy!",
    "",
    `Code: ${code}`,
    namedCount > 0 ? `Players: ${namedCount}` : "",
    "",
    "Open this link to load the group:",
    link,
  ]
    .filter(Boolean)
    .join("\n");
}
