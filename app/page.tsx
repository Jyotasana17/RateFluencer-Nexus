"use client";

import { useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────
   SVG Icon Components — lightweight inline vectors, no heavy files
   ──────────────────────────────────────────────────────────── */

function RadarIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" opacity={0.3} />
      <circle cx="12" cy="12" r="6" opacity={0.5} />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  );
}

function FireIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2c.5 3.5 3 6 3 9a5 5 0 1 1-6 0c0-3 2.5-5.5 3-9Z" />
      <path d="M12 15a2 2 0 0 0 2-2c0-1.5-2-3-2-3s-2 1.5-2 3a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function ChartIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BoltIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function BrainIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a4 4 0 0 1 4 4 4.1 4.1 0 0 1 1 2.83A4 4 0 0 1 16 16h-1v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H8a4 4 0 0 1-1-7.17A4.1 4.1 0 0 1 8 6a4 4 0 0 1 4-4Z" />
      <path d="M10 8h4" />
      <path d="M10 12h4" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Decorative Background Orbs — pure CSS radial glows
   ──────────────────────────────────────────────────────────── */

function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-neon/[0.07] blur-[120px]" />
      <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-nexus/[0.06] blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan/[0.05] blur-[100px]" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Scroll-reveal animation hook
   ──────────────────────────────────────────────────────────── */

function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ──────────────────────────────────────────────────────────── */

export default function TrendFatigueEnginePage() {
  const [navScrolled, setNavScrolled] = useState(false);

  /* SSR-safe scroll listener — wrapped in useEffect */
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useScrollReveal();

  return (
    <main className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <BackgroundOrbs />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — NAV & HERO (The Hook)
          ═══════════════════════════════════════════════════════ */}
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-void/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Platform Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10 border border-neon/20">
              <BoltIcon className="h-5 w-5 text-neon" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Trend Fatigue Engine<span className="text-neon ml-1">AI</span>
            </span>
          </div>

          {/* Creator Login Button */}
          <button
            id="creator-login-btn"
            className="rounded-full border border-neon/30 bg-neon/10 px-6 py-2.5 text-sm font-medium text-white
                       transition-all duration-300 hover:bg-neon/20 hover:border-neon/50
                       hover:shadow-[0_0_30px_rgba(0,163,255,0.3)] active:scale-95"
          >
            Creator Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20 text-center"
      >
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 panel-grid opacity-30"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/5 px-4 py-1.5 text-xs font-medium text-neon/90 animate-fade-in-up">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            AI-Powered Trend Intelligence
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl opacity-0 animate-fade-in-up">
            Stop Chasing Trends.
            <br />
            <span className="text-gradient-neon">Predict What&apos;s Dying.</span>
          </h1>

          {/* Subheadline — premium serif typeface */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-ghost font-serif italic opacity-0 animate-fade-in-up-delay sm:text-xl">
            While regular AI tools echo what is already overcrowded, we analyze audience fatigue to
            give you the exact counter-narratives that creators need to catch the next viral wave
            before anyone else.
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-in-up-delay-2">
            <button
              id="hero-cta-btn"
              className="group relative inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 text-base font-semibold text-white
                         shadow-neon transition-all duration-300
                         hover:shadow-neon-lg hover:scale-[1.03] active:scale-[0.98]"
            >
              Get First-Mover Advantage
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — PROBLEM vs. SOLUTION (The Philosophy)
          ═══════════════════════════════════════════════════════ */}
      <section id="philosophy" className="relative py-28 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neon/70">
              The Philosophy
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Two Worlds. One Choice.
            </h2>
          </div>

          {/* Comparison Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {/* LEFT — The Problem */}
            <div
              className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out delay-100
                          glass-card rounded-2xl p-8 border-l-4 border-l-crimson/60 lg:p-10"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10 border border-crimson/20">
                  <FireIcon className="h-6 w-6 text-crimson" />
                </div>
                <h3 className="text-xl font-bold text-crimson/90">The Saturated Wave</h3>
              </div>
              <p className="text-base leading-relaxed text-ghost">
                Joining trends late means fighting for scraps in an overcrowded red ocean where
                audience boredom has already peaked.
              </p>
              {/* Decorative bar */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-crimson/20 overflow-hidden">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-crimson/60 to-crimson/30" />
                </div>
                <span className="text-xs font-mono text-crimson/60">92% Saturated</span>
              </div>
            </div>

            {/* RIGHT — The USP */}
            <div
              className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200
                          glass-card rounded-2xl p-8 border-l-4 border-l-neon/60 lg:p-10"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon/10 border border-neon/20">
                  <BoltIcon className="h-6 w-6 text-neon" />
                </div>
                <h3 className="text-xl font-bold text-neon/90">The Counter-Narrative Engine</h3>
              </div>
              <p className="text-base leading-relaxed text-ghost">
                Identify rising irritation, calculate fatigue levels, and launch disruptive content
                concepts that capture the exact moment a trend reverses.
              </p>
              {/* Decorative bar */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-neon/20 overflow-hidden">
                  <div className="h-full w-[15%] rounded-full bg-gradient-to-r from-neon/60 to-cyan/40 animate-pulse" />
                </div>
                <span className="text-xs font-mono text-neon/60">15% Explored</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — SYSTEM ARCHITECTURE (The 3-Step Flow)
          ═══════════════════════════════════════════════════════ */}
      <section id="architecture" className="relative py-28 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neon/70">
              System Architecture
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Three Steps to the Counter-Wave
            </h2>
          </div>

          {/* 3-Step Grid */}
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {/* Step 1 — Detect Boredom */}
            <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out delay-100 group">
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:border-neon/20 hover:shadow-neon/10 hover:shadow-lg">
                {/* Step Number */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/10 text-sm font-bold text-neon border border-neon/20">
                    01
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon/20 to-transparent" />
                </div>

                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-neon/[0.08] border border-neon/10 transition-all duration-500 group-hover:bg-neon/15 group-hover:shadow-neon">
                  <RadarIcon className="h-7 w-7 text-neon" />
                </div>

                <h3 className="mb-3 text-xl font-bold">Detect Boredom</h3>
                <p className="text-sm leading-relaxed text-ghost">
                  Scans real-time social metrics and filters comments for expressions of audience
                  fatigue. Our AI reads the sentiment underneath the engagement numbers.
                </p>
              </div>
            </div>

            {/* Step 2 — Score Burnout */}
            <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 group">
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:border-neon/20 hover:shadow-neon/10 hover:shadow-lg">
                {/* Step Number */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/10 text-sm font-bold text-neon border border-neon/20">
                    02
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon/20 to-transparent" />
                </div>

                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-neon/[0.08] border border-neon/10 transition-all duration-500 group-hover:bg-neon/15 group-hover:shadow-neon">
                  <ChartIcon className="h-7 w-7 text-neon" />
                </div>

                <h3 className="mb-3 text-xl font-bold">Score Burnout</h3>
                <p className="text-sm leading-relaxed text-ghost">
                  Ranks topics on a 0–100 index to show exactly how tired viewers are of a specific
                  niche. Higher scores mean earlier opportunities for counter-content.
                </p>
              </div>
            </div>

            {/* Step 3 — Generate Reversals */}
            <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out delay-300 group">
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:border-neon/20 hover:shadow-neon/10 hover:shadow-lg">
                {/* Step Number */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/10 text-sm font-bold text-neon border border-neon/20">
                    03
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon/20 to-transparent" />
                </div>

                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-neon/[0.08] border border-neon/10 transition-all duration-500 group-hover:bg-neon/15 group-hover:shadow-neon">
                  <BrainIcon className="h-7 w-7 text-neon" />
                </div>

                <h3 className="mb-3 text-xl font-bold">Generate Reversals</h3>
                <p className="text-sm leading-relaxed text-ghost">
                  Rewrites content frameworks into highly provocative, fresh alternative angles. Get
                  publish-ready counter-narrative briefs in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Connecting line decoration (visible on md+) */}
          <div className="hidden md:flex items-center justify-center mt-10 reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out delay-500">
            <div className="flex items-center gap-3 rounded-full border border-neon/10 bg-neon/5 px-5 py-2 text-xs font-medium text-neon/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
              Continuously learning from 12M+ data points daily
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — STRATEGIC FOOTER CTA
          ═══════════════════════════════════════════════════════ */}
      <section
        id="footer-cta"
        className="relative py-32 px-6"
      >
        {/* Top gradient divider */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-3xl text-center reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to Ride the{" "}
            <span className="text-gradient-neon">Counter-Wave</span>?
          </h2>
          <p className="mb-10 text-lg text-ghost">
            Join the creators who see what everyone else is about to get tired of.
          </p>

          {/* Quick Login CTA */}
          <button
            id="footer-login-btn"
            className="group relative inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-10 py-4 text-base font-semibold text-white
                       transition-all duration-500 animate-pulse-glow
                       hover:bg-neon/20 hover:border-neon/50
                       hover:shadow-[0_0_30px_rgba(0,163,255,0.4)]
                       active:scale-[0.97]"
          >
            Quick Login
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer — minimal copyright */}
      <footer className="relative border-t border-white/[0.04] py-8 px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BoltIcon className="h-4 w-4 text-neon/50" />
            <span className="text-sm text-ghost/60">© 2026 Trend Fatigue Engine AI</span>
          </div>
          <span className="text-xs text-ghost/30">All rights reserved.</span>
        </div>
      </footer>

    </main>
  );
}
