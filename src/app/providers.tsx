"use client";

import { Suspense } from "react";
import { PostHogPageView } from "@/components/analytics/PostHogPageView";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
