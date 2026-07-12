import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm-Organic system — paper base, clay signature accent, espresso ink
        paper: "#F6F1E8",
        paperDeep: "#EFE7D8",
        shell: "#FCF9F3",
        ink: "#2A2320",
        inkSoft: "#54483F",
        muted: "#8A7B6D",
        line: "#E3D8C6",
        clay: "#B85C38",
        clayDeep: "#8F4223",
        clayWash: "#F0DBCE",
        sage: "#6E7A5E",
        sageWash: "#DEE3D3",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // one soft/organic radius personality
        note: "0.9rem",
        panel: "1.5rem",
        pillish: "2rem",
      },
      boxShadow: {
        lift: "0 18px 40px -24px rgba(42, 35, 32, 0.35)",
        soft: "0 8px 24px -16px rgba(42, 35, 32, 0.30)",
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        reading: "68ch",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
