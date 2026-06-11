import posthog from "posthog-js";

type EventProperties = Record<string, string | number | boolean | undefined>;

function captureWhenReady(send: () => void) {
  if ((posthog as unknown as { __loaded?: boolean }).__loaded) {
    send();
    return;
  }

  posthog.onFeatureFlags(() => {
    send();
  });
}

export function captureEvent(event: string, properties?: EventProperties) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  captureWhenReady(() => posthog.capture(event, properties));
}

export function capturePageview(url: string) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  captureWhenReady(() => posthog.capture("$pageview", { $current_url: url }));
}
