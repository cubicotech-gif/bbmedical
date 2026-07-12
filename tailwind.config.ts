import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Clean-White system — cool near-white base, emerald signature accent,
        // slate secondary, ink text. (Token names kept stable across the app.)
        paper: "#F6F8FA", // page background
        paperDeep: "#EDF1F5", // alternating section background
        shell: "#FFFFFF", // cards / surfaces
        ink: "#14171C",
        inkSoft: "#3D434E",
        muted: "#6B7280",
        line: "#E4E8EE",
        clay: "#157F5B", // signature accent (emerald)
        clayDeep: "#0E5C42",
        clayWash: "#E4F2EB",
        sage: "#475569", // secondary (slate)
        sageWash: "#EDF1F6",
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
        lift: "0 18px 44px -26px rgba(16, 24, 40, 0.28)",
        soft: "0 6px 20px -14px rgba(16, 24, 40, 0.20)",
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
