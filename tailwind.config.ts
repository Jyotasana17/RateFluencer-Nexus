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
        // Original colors
        void: "#050816",
        night: "#0A1022",
        slatefield: "#0F172A",
        nexus: "#6D5DFC",
        cyan: "#00E5FF",
        mint: "#14F195",
        bloom: "#FF4D8D",
        text: "#FFFFFF",
        muted: "#CBD5E1",
        ghost: "#94A3B8",
        neon: "#00A3FF",
        crimson: "#DC2626",

        // Trend Fatigue Engine AI colors
        surface: '#ffffff',
        'surface-dim': '#d9dadb',
        'surface-bright': '#f8f9fa',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f4f5',
        'surface-container': '#edeeef',
        'surface-container-high': '#e7e8e9',
        'surface-container-highest': '#e1e3e4',
        'on-surface': '#191c1d',
        'on-surface-variant': '#464556',
        'inverse-surface': '#2e3132',
        'inverse-on-surface': '#f0f1f2',
        outline: '#767587',
        'outline-variant': '#c7c4d8',
        'surface-tint': '#4643e9',
        primary: '#433fe5',
        'on-primary': '#ffffff',
        'primary-container': '#5d5cff',
        'on-primary-container': '#fdf9ff',
        'inverse-primary': '#c1c1ff',
        secondary: '#121826',
        'on-secondary': '#ffffff',
        'secondary-container': '#dadff3',
        'on-secondary-container': '#5d6273',
        tertiary: '#555c57',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#6d756f',
        'on-tertiary-container': '#f4fcf5',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        'primary-fixed': '#e1dfff',
        'primary-fixed-dim': '#c1c1ff',
        'on-primary-fixed': '#09006b',
        'on-primary-fixed-variant': '#2b20d2',
        'secondary-fixed': '#dde2f6',
        'secondary-fixed-dim': '#c1c6d9',
        'on-secondary-fixed': '#151b29',
        'on-secondary-fixed-variant': '#414756',
        'tertiary-fixed': '#dce4de',
        'tertiary-fixed-dim': '#c0c8c2',
        'on-tertiary-fixed': '#161d19',
        'on-tertiary-fixed-variant': '#414944',
        background: '#f8f9fa',
        'on-background': '#191c1d',
        'surface-variant': '#e1e3e4',
        
        // Brand visualization accent
        sage: '#6b8e6b'
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        hanken: ["var(--font-hanken)", "Hanken Grotesk", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"]
      },
      borderRadius: {
        sm: "0.25rem",      // 4px
        DEFAULT: "0.5rem", // 8px
        md: "0.75rem",     // 12px
        lg: "1.0rem",      // 16px
        xl: "1.5rem",      // 24px
        full: "9999px"
      },
      boxShadow: {
        // Original shadows
        glow: "0 0 44px rgba(109, 93, 252, 0.32)",
        cyan: "0 0 36px rgba(0, 229, 255, 0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 80px rgba(0,0,0,0.35)",
        neon: "0 0 30px rgba(0,163,255,0.4)",
        "neon-lg": "0 0 50px rgba(0,163,255,0.5), 0 0 100px rgba(0,163,255,0.2)",
        
        // Brand design shadows
        soft: "0 12px 32px rgba(0,0,0,0.04)",
        "premium-lift": "0 20px 48px rgba(93, 92, 255, 0.08)",
        "button-glow": "0 8px 30px rgba(93, 92, 255, 0.25)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 18% 22%, rgba(109,93,252,.36), transparent 28%), radial-gradient(circle at 75% 12%, rgba(0,229,255,.24), transparent 24%), radial-gradient(circle at 60% 76%, rgba(20,241,149,.18), transparent 28%), linear-gradient(135deg, #050816 0%, #0A1022 42%, #0F172A 100%)",
        'brand-gradient': "linear-gradient(135deg, #433fe5 0%, #5d5cff 50%, #ba1a1a 100%)"
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in-up-delay": "fade-in-up 0.8s ease-out 0.2s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.8s ease-out 0.4s forwards",
        "pulse-line": "pulse-line 4s linear infinite",
        "orbit": "orbit 20s linear infinite"
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,163,255,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0,163,255,0.5), 0 0 80px rgba(0,163,255,0.2)" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-line": {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" }
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(40px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(40px) rotate(-360deg)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
