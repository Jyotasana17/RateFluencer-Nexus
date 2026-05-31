# Trend Fatigue Engine AI

**Stop Chasing Trends. Predict What's Dying.**

An AI-powered content intelligence platform that analyzes audience fatigue, detects trend burnout, and generates disruptive counter-narratives — giving creators first-mover advantage before anyone else.

> Built with Next.js 15 · Tailwind CSS · ApexCharts · TypeScript · Deployed on Netlify

---

## 🔗 Live Demo

**[ratefluencer-nexus.netlify.app](https://ratefluencer-nexus.netlify.app/)**

---

## ✨ Features

### Landing Page (`/`)
- **Hero Section** — Bold headline with neon-blue gradient text and animated scroll-reveal interactions
- **Problem vs. Solution** — Side-by-side comparison cards contrasting trend saturation vs. counter-narrative strategy
- **3-Step System Architecture** — Visual flow explaining Detect Boredom → Score Burnout → Generate Reversals
- **Strategic Footer CTA** — Pulse-glow animated login button with electric blue hover effects

### Product Dashboard (`/dashboard`)
- **Mock Authentication** — Full-screen tactical lock screen with simulated login flow
- **Batman Tech Intelligence Theme** — Pure blacks, matte grays, glowing cyan accents, glassmorphic panels
- **Tabbed Navigation** with 4 dedicated panels:

| Tab | Description |
|-----|-------------|
| **Overview** | KPI widgets (trends scanned, fatigue alerts, virality prediction), live tactical log stream, AI model status, and security panel |
| **Fatigue Radar** | Interactive reversal engine feed with filterable trend table, fatigue progress bars, sentiment tags, and one-click counter-narrative copy |
| **Creator Stock Market** | ApexCharts candlestick chart visualizing trend lifecycle crashes with fatigue threshold annotations and trend switcher |
| **Settings** | Configurable fatigue threshold slider, LLM engine selector, scan interval controls, and audio alert toggle |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3 |
| **Charts** | ApexCharts + react-apexcharts |
| **Icons** | Lucide React |
| **Fonts** | Inter + Playfair Display (Google Fonts via `next/font`) |
| **Animations** | Framer Motion + CSS keyframes |
| **Deployment** | Netlify (with `@netlify/plugin-nextjs`) |

---

## 📁 Project Structure

```
RateFluencer-Nexus/
├── app/
│   ├── globals.css              # Global styles, utility classes, scroll-reveal
│   ├── layout.tsx               # Root layout with fonts & SEO metadata
│   ├── page.tsx                 # Landing page (4 sections)
│   └── dashboard/
│       ├── layout.tsx           # Dashboard layout (conditional shell bypass)
│       └── page.tsx             # Full product dashboard (lock screen + 4 tabs)
├── components/                  # Reusable UI components
├── lib/                         # Utilities, data, and store
├── mockTrends.json              # Mock trend data with OHLC candlestick coordinates
├── tailwind.config.ts           # Extended theme (neon, crimson, animations)
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS with Tailwind + Autoprefixer
└── package.json                 # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Jyotasana17/RateFluencer-Nexus.git
cd RateFluencer-Nexus

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.  
Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the product dashboard.

### Build for Production

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

---

## 🌐 Deployment (Netlify)

This project is configured for seamless Netlify deployment:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |
| **Plugin** | `@netlify/plugin-nextjs` |

All client-side APIs (`window`, `document`, `IntersectionObserver`) are wrapped in `useEffect` hooks to prevent SSR build failures. ApexCharts is loaded via `next/dynamic` with `ssr: false`.

---

## 📊 Mock Data Schema

The `mockTrends.json` file contains trend entries with:

```json
{
  "id": "t1",
  "trendName": "Day In My Life (Tech Bro)",
  "status": "Critical Fatigue",
  "fatigueScore": 92,
  "sentiment": ["boring", "fake", "overrated", "unrealistic"],
  "aiCounterNarrative": "The Ugly Reality of Working in Tech",
  "viralityPrediction": "96%",
  "candlestickData": [
    { "x": "Week 1", "y": [40, 60, 35, 55] },
    { "x": "Week 4", "y": [90, 92, 40, 45] }
  ]
}
```

The `candlestickData` uses OHLC format `[Open, High, Low, Close]` — green candles show trend growth, red candles show fatigue crashes.

---

## 📝 License

© 2026 Trend Fatigue Engine AI. All rights reserved.
