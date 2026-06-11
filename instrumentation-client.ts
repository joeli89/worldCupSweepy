import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_API_HOST ?? "/wc26-ph",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    loaded: (client) => {
      if (process.env.NODE_ENV === "development") {
        client.debug();
      }
    },
  });
}
