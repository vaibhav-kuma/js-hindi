import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        void: "#030408",
        surface: {
          DEFAULT: "#0a0e15",
          dim: "#0d131c",
          bright: "#111827",
        },
        line: "rgba(148,163,184,0.14)",
        accent: {
          DEFAULT: "#22d3ee",
          strong: "#06b6d4",
          dim: "rgba(34,211,238,0.14)",
        },
        violet: {
          DEFAULT: "#a78bfa",
          strong: "#8b5cf6",
          dim: "rgba(139,92,246,0.14)",
        },
        mint: {
          DEFAULT: "#34d399",
          dim: "rgba(52,211,153,0.14)",
        },
        danger: "#f87171",
        amber: "#fbbf24",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(34,211,238,0.18)",
        glow: "0 0 40px rgba(34,211,238,0.28)",
        "glow-violet": "0 0 40px rgba(139,92,246,0.25)",
        "glow-mint": "0 0 40px rgba(52,211,153,0.22)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
        "grid-accent":
          "linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 7s linear infinite",
        "flow-right": "flow-x 2.6s linear infinite",
        "flow-down": "flow-y 2.6s linear infinite",
        blink: "blink 1.1s steps(1) infinite",
        "spin-slow": "spin 28s linear infinite",
        shimmer: "shimmer 2.6s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(110%)" },
        },
        "flow-x": {
          "0%": { left: "0", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { left: "calc(100% - 6px)", opacity: "0" },
        },
        "flow-y": {
          "0%": { top: "0", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { top: "calc(100% - 6px)", opacity: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;