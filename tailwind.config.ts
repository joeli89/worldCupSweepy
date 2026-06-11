import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030510",
        surface: "#0a1020",
        navy: {
          DEFAULT: "#050816",
          light: "#0c1228",
          deep: "#030510",
        },
        "neon-blue": "#3b82f6",
        "neon-purple": "#8b5cf6",
        "neon-violet": "#a855f7",
        gold: {
          DEFAULT: "#fbbf24",
          light: "#fde68a",
          dark: "#b45309",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.07)",
          "border-glow": "rgba(124, 58, 237, 0.35)",
          bg: "rgba(255, 255, 255, 0.03)",
        },
      },
      borderRadius: {
        card: "24px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        condensed: ["var(--font-condensed)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-sm": ["5rem", { lineHeight: "0.82", letterSpacing: "-0.02em" }],
        hero: ["8rem", { lineHeight: "0.78", letterSpacing: "-0.03em" }],
        "hero-lg": ["11rem", { lineHeight: "0.76", letterSpacing: "-0.04em" }],
        "hero-xl": ["16rem", { lineHeight: "0.74", letterSpacing: "-0.04em" }],
        "hero-mega": ["18rem", { lineHeight: "0.72", letterSpacing: "-0.05em" }],
      },
      boxShadow: {
        glow: "0 0 60px rgba(37, 99, 235, 0.2)",
        "glow-purple": "0 0 60px rgba(124, 58, 237, 0.25)",
        "glow-gold": "0 0 50px rgba(251, 191, 36, 0.3)",
        "glow-intense": "0 0 80px rgba(124, 58, 237, 0.4), 0 0 120px rgba(37, 99, 235, 0.2)",
        glass: "0 8px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-hover":
          "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 58, 237, 0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fog-drift": "fog-drift 20s ease-in-out infinite",
        "beam-pulse": "beam-pulse 5s ease-in-out infinite",
        confetti: "confetti 8s linear infinite",
        "particle-float": "particle-float 12s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fog-drift": {
          "0%, 100%": { transform: "translateX(0) scale(1)", opacity: "0.4" },
          "50%": { transform: "translateX(30px) scale(1.05)", opacity: "0.6" },
        },
        "beam-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        confetti: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.2" },
          "25%": { transform: "translate(10px, -20px)", opacity: "0.6" },
          "50%": { transform: "translate(-5px, -40px)", opacity: "0.4" },
          "75%": { transform: "translate(15px, -25px)", opacity: "0.5" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(180deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.08) 40%, rgba(5,8,22,0) 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #6366f1 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #fde68a 0%, #fbbf24 40%, #b45309 100%)",
        "edge-glow":
          "linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(37,99,235,0.2) 50%, rgba(251,191,36,0.3) 100%)",
        "stadium-pitch":
          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(16,185,129,0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
