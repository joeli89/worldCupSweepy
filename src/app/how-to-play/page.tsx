import { PageShell } from "@/components/layout/PageShell";
import { HowToPlayContent } from "@/components/sections/HowToPlayContent";

export const metadata = {
  title: "How to Play — World Cup Sweepy 2026",
  description: "Learn how World Cup Sweepy works in four simple steps.",
};

export default function HowToPlayPage() {
  return (
    <PageShell background="simple">
      <HowToPlayContent />
    </PageShell>
  );
}
