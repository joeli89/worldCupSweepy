import { PageShell } from "@/components/layout/PageShell";
import { AdvanceDrawContent } from "@/components/sections/AdvanceDrawContent";

export const metadata = {
  title: "Advance — World Cup Sweepstake 2026",
  description: "Draw World Cup teams for your sweepstake players.",
};

export default function AdvancePage() {
  return (
    <PageShell background="simple">
      <AdvanceDrawContent />
    </PageShell>
  );
}
