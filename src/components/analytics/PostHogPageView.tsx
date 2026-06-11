"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { capturePageview } from "@/lib/posthog";

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    let url = window.origin + pathname;
    const query = searchParams.toString();
    if (query) {
      url += `?${query}`;
    }

    capturePageview(url);
  }, [pathname, searchParams]);

  return null;
}
