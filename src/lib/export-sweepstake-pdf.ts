import {
  getPlayerTeamIds,
  type SweepstakePlayer,
} from "@/lib/sweepstake-storage";
import { findWorldCupTeam } from "@/lib/world-cup-teams";

function formatPlayerName(player: SweepstakePlayer, index: number): string {
  return player.name.trim() || `Player ${index + 1}`;
}

function formatPlayerCountries(player: SweepstakePlayer): string {
  const teams = getPlayerTeamIds(player)
    .map((id) => findWorldCupTeam(id))
    .filter(Boolean);

  if (teams.length === 0) return "—";

  return teams.map((team) => `${team!.name} (${team!.code})`).join(", ");
}

export async function exportSweepstakePdf(
  players: SweepstakePlayer[]
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFillColor(18, 24, 42);
  doc.rect(0, 0, pageWidth, 42, "F");

  doc.setTextColor(251, 191, 36);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("FIFA WORLD CUP · SWEEPSTAKE", margin, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("World Cup 2026", margin, 28);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const generated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated ${generated}`, margin, 52);

  y = 64;

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Players & countries", margin, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  players.forEach((player, index) => {
    if (y > 270) {
      doc.addPage();
      y = margin;
    }

    const name = formatPlayerName(player, index);
    const countries = formatPlayerCountries(player);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(`${index + 1}. ${name}`, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(countries, contentWidth - 8);
    doc.text(lines, margin + 6, y + 6);

    y += 6 + lines.length * 5 + 8;
  });

  const footerY = doc.internal.pageSize.getHeight() - 12;
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text(
    "World Cup Sweepstake · Each country can only be drawn once",
    margin,
    footerY
  );

  doc.save("world-cup-sweepstake-2026.pdf");
}

export function hasSweepstakeAssignments(players: SweepstakePlayer[]): boolean {
  return players.some((player) => getPlayerTeamIds(player).length > 0);
}
