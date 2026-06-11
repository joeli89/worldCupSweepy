import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SetupPlayersContent } from "@/components/sections/SetupPlayersContent";

export const metadata = {
  title: "Get Started — World Cup Sweepstake 2026",
  description: "Add players and enter names for your World Cup sweepstake.",
};

export default function GetStartedPage() {
  return (
    <PageShell background="simple">
      <Suspense
        fallback={
          <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white/50">
            Loading…
          </div>
        }
      >
        <SetupPlayersContent />
      </Suspense>
    </PageShell>
  );
}
