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
        cyan: "#00E5FF", 0
        mint: "#14F195",
        bloom: "#FF4D8D",
        text: "#FFFFFF",
        muted: "#CBD5E1",
        ghost: "#94A3B8",
        neon: "#00A3FF",
        crimson: "#DC2626"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 44px rgba(109, 93, 252, 0.32)",
        cyan: "0 0 36px rgba(0, 229, 255, 0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 80px rgba(0,0,0,0.35)",
        neon: "0 0 30px rgba(0,163,255,0.4)",
        "neon-lg": "0 0 50px rgba(0,163,255,0.5), 0 0 100px rgba(0,163,255,0.2)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 18% 22%, rgba(109,93,252,.36), transparent 28%), radial-gradient(circle at 75% 12%, rgba(0,229,255,.24), transparent 24%), radial-gradient(circle at 60% 76%, rgba(20,241,149,.18), transparent 28%), linear-gradient(135deg, #050816 0%, #0A1022 42%, #0F172A 100%)"
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in-up-delay": "fade-in-up 0.8s ease-out 0.2s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.8s ease-out 0.4s forwards"
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,163,255,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0,163,255,0.5), 0 0 80px rgba(0,163,255,0.2)" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
