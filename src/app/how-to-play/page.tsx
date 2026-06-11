import { PageShell } from "@/components/layout/PageShell";
import { HowToPlayContent } from "@/components/sections/HowToPlayContent";

export const metadata = {
  title: "How to Play — World Cup Sweepstake 2026",
  description: "Learn how the World Cup sweepstake works in four simple steps.",
};

export default function HowToPlayPage() {
  return (
    <PageShell background="simple">
      <HowToPlayContent />
    </PageShell>
  );
}
