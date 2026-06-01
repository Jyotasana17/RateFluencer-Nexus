# Trend Fatigue Engine AI

Trend Fatigue Engine AI is a light-mode creator intelligence dashboard for spotting saturated trends, measuring audience fatigue, and generating counter-narrative content ideas before a topic burns out.

The app is built with Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, Lucide React, Recharts, and Three.js.

## Current Status

- Light-mode dashboard UI.
- Direct dashboard access enabled for demo/static deployment.
- Hydration warnings from browser-injected form attributes are suppressed at the document level.
- Smooth-scroll warning fixed with `data-scroll-behavior="smooth"`.
- Static export configured for Netlify.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with auth modal demo |
| `/dashboard` | Trend analysis overview |
| `/dashboard/fatigue-radar` | Fatigue radar workspace and reversal strategy generator |
| `/dashboard/discovery` | Creator discovery |
| `/dashboard/dna` | Influence DNA profile |
| `/dashboard/campaign-lab` | Campaign simulator |
| `/dashboard/content-lab` | Content studio |
| `/dashboard/analytics` | Predictive analytics |
| `/dashboard/ai-agent` | Autonomous agent workflow |
| `/dashboard/settings` | Profile and logout settings |

## Features

- Trend fatigue scoring with static demo intelligence.
- Fast reversal strategy generation with lightweight simulated logs.
- Copy-ready hook ideas.
- Light dashboard shell with sidebar navigation.
- Static export support through `next.config.ts`.
- Netlify deployment settings in `netlify.toml`.

## Local Development

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful dashboard URL:

```text
http://localhost:3000/dashboard/fatigue-radar
```

## Build

Create a production/static export build:

```bash
npm run build
```

The exported site is written to:

```text
out/
```

## Netlify Deployment

This repo includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
```

On Netlify, use:

- Base directory: `RateFluencer-Nexus` if deploying from the parent folder.
- Build command: `npm run build`
- Publish directory: `out`
- Node version: `20`

## Project Structure

```text
RateFluencer-Nexus/
  app/
    dashboard/
      fatigue-radar/
      settings/
      page.tsx
      layout.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    dashboard/
    landing/
    ui/
  lib/
    data.ts
    store.ts
    utils.ts
  scripts/
    verify-canvases.mjs
  netlify.toml
  next.config.ts
  package.json
```

## Notes

- The app currently uses local demo state and mock intelligence data.
- `isAuthenticated` defaults to `true` in `lib/store.ts` so dashboard routes open directly in local and Netlify preview builds.
- The Fatigue Radar page is fully light-mode and should not show dark tactical panels.

## License

Copyright 2026 Trend Fatigue Engine AI. All rights reserved.
