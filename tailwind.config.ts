import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#050816",
        night: "#0A1022",
        slatefield: "#0F172A",
        nexus: "#6D5DFC",
        cyan: "#00E5FF",
        mint: "#14F195",
        bloom: "#FF4D8D",
        text: "#FFFFFF",
        muted: "#CBD5E1",
        ghost: "#94A3B8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 44px rgba(109, 93, 252, 0.32)",
        cyan: "0 0 36px rgba(0, 229, 255, 0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 80px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 18% 22%, rgba(109,93,252,.36), transparent 28%), radial-gradient(circle at 75% 12%, rgba(0,229,255,.24), transparent 24%), radial-gradient(circle at 60% 76%, rgba(20,241,149,.18), transparent 28%), linear-gradient(135deg, #050816 0%, #0A1022 42%, #0F172A 100%)"
      }
    }
  },
  plugins: []
};

export default config;
