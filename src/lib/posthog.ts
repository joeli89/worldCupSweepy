import posthog from "posthog-js";

type EventProperties = Record<string, string | number | boolean | undefined>;

export function captureEvent(event: string, properties?: EventProperties) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  posthog.capture(event, properties);
}
