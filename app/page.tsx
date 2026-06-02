"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNexusStore } from "@/lib/store";
import {
  ArrowRight,
  TrendingUp,
  Check,
  X,
  Lock,
  Mail,
  User,
  AlertTriangle,
  Activity,
  Cpu,
  Database,
  LineChart,
  Terminal
} from "lucide-react";

// Interactive Trend Previews for the WaveShift Telemetry Dashboard
const TREND_DATASETS = [
  {
    id: "tech-influence",
    title: "AI Influencers",
    category: "Saturated Niche",
    fatigue: "94.2%",
    status: "Declining",
    change: "-34%",
    remedy: "High Recovery",
    pathDown: "M 0 30 Q 150 40, 300 120 T 600 240",
    alternative: "Raw Founder Stories",
    altCategory: "Rising Opportunity",
    altStatus: "Excellent",
    altChange: "+95%",
    pathUp: "M 0 260 Q 150 250, 300 160 T 600 40",
    crossover: { x: 300, y: 140 }
  },
  {
    id: "content-format",
    title: "Short Form Loops",
    category: "Saturated Niche",
    fatigue: "88.7%",
    status: "Fatigued",
    change: "-18%",
    remedy: "Moderate Shift",
    pathDown: "M 0 50 Q 180 80, 320 150 T 600 220",
    alternative: "Interactive Audio Logs",
    altCategory: "Rising Opportunity",
    altStatus: "Strong Pivot",
    altChange: "+112%",
    pathUp: "M 0 250 Q 180 230, 320 140 T 600 60",
    crossover: { x: 310, y: 145 }
  },
  {
    id: "branding-style",
    title: "Corporate Minimalism",
    category: "Saturated Niche",
    fatigue: "91.5%",
    status: "Stagnant",
    change: "-22%",
    remedy: "Radical Counter",
    pathDown: "M 0 40 Q 130 50, 280 135 T 600 260",
    alternative: "Brutalism & Analog Grids",
    altCategory: "Rising Opportunity",
    altStatus: "Disruptive",
    altChange: "+148%",
    pathUp: "M 0 270 Q 130 240, 280 150 T 600 30",
    crossover: { x: 285, y: 142 }
  }
];

export default function SaaSLandingPage() {
  const router = useRouter();
  const { setIsAuthenticated } = useNexusStore();

  // Authentication states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Telemetry Dashboard state
  const [activeTrendIdx, setActiveTrendIdx] = useState(0);
  const currentTrend = TREND_DATASETS[activeTrendIdx];

  // Mount state to prevent hydration errors
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Scroll reveal setup
  useEffect(() => {
    if (!hasMounted) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const scrollRevealElements = document.querySelectorAll(".scroll-reveal");
    scrollRevealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hasMounted]);

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthError("");
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!email || !password || (authMode === "signup" && !name)) {
      setAuthError("Please fill out all fields.");
      return;
    }

    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      router.push("/dashboard");
    }, 1000);
  };

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-[#090716] flex items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Activity className="h-6 w-6 animate-radar" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#a6a3bf]">Aetheric Telemetry Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[#f1f0f7] font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-white relative bg-dot-pattern">
      
      {/* ═══════════════════════════════════════════════════════
          2D LIQUID METABALL BACKGROUND (ANIMATED & SMOOTH)
          ═══════════════════════════════════════════════════════ */}
      <div className="liquid-bg-container" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HEADER (NAVBAR)
          ═══════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#090716]/65 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-12 py-5">
          {/* Logo (left) */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm transition-transform group-hover:scale-105 duration-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-hanken font-bold text-lg text-white tracking-tight">
              Trend Fatigue Engine <span className="text-primary font-black">AI</span>
            </span>
          </Link>

          {/* Links (middle) */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#process" className="font-sans text-xs font-bold text-[#a6a3bf] hover:text-white transition-colors uppercase tracking-wider">Process</a>
            <a href="#capabilities" className="font-sans text-xs font-bold text-[#a6a3bf] hover:text-white transition-colors uppercase tracking-wider">Capabilities</a>
            <a href="#pricing" className="font-sans text-xs font-bold text-[#a6a3bf] hover:text-white transition-colors uppercase tracking-wider">Pricing</a>
            <a href="#insights" className="font-sans text-xs font-bold text-[#a6a3bf] hover:text-white transition-colors uppercase tracking-wider">Insights</a>
          </nav>

          {/* Right CTA - Serious Rounded Buttons (No Pills) */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleOpenAuth("login")}
              className="font-sans text-xs font-bold text-[#a6a3bf] hover:text-white transition-colors uppercase tracking-wider"
            >
              Sign In
            </button>
            <button
              onClick={() => handleOpenAuth("signup")}
              className="px-5 py-2.5 bg-brand-gradient hover:shadow-button-glow text-white font-bold rounded-lg text-xs transition-all duration-200 active:scale-95 uppercase tracking-wider shadow-sm"
            >
              Get Access
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="pt-36 pb-12 px-6 text-center max-w-[1200px] mx-auto relative select-none">
        <div className="space-y-8 animate-fade-in-up">
          {/* Analysis Badge/Chip */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#090716]/65 backdrop-blur-sm px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
            <div className="h-2 w-2 rounded-full bg-primary animate-radar" />
            <span className="font-mono text-[10px] font-semibold text-[#f1f0f7] uppercase tracking-widest">
              ⚡ 100 ANALYSES - 2/20 FREE REMAINS
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-hanken font-bold text-5xl md:text-7xl text-white tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Stop Chasing Trends.
            <br />
            <span className="text-gradient-brand">
              Start Predicting Them.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-[#a6a3bf] max-w-2xl mx-auto leading-relaxed font-normal">
            A mathematical layer over the chaos of culture. Our engine detects the moment interest peaks and fatigue begins—before your competitors even notice.
          </p>

          {/* Core CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenAuth("signup")}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-gradient hover:shadow-button-glow text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            >
              Start Predicting
            </button>
            <a
              href="#process"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm text-center"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — WAVESHIFT TELEMETRY DASHBOARD PREVIEW
          ═══════════════════════════════════════════════════════ */}
      <section className="pb-24 px-6 max-w-[1100px] mx-auto scroll-reveal">
        {/* Dynamic Glass Panel wrapper */}
        <div className="glass-panel-heavy rounded-xl p-6 sm:p-8 shadow-soft border border-white/10 relative overflow-hidden group">
          
          {/* Subtle light effect top border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-[#ba1a1a] to-transparent opacity-85" />

          {/* Tab buttons to show AI is working interactively */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary border border-primary/10">
                <Activity className="h-5 w-5 animate-radar" />
              </span>
              <div>
                <span className="block font-hanken font-bold text-sm text-white leading-tight">WaveShift Telemetry Dashboard</span>
                <span className="block font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-wider mt-0.5">Engine Status: LIVE LISTENING</span>
              </div>
            </div>

            {/* Interactive dataset selectors */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
              {TREND_DATASETS.map((td, idx) => (
                <button
                  key={td.id}
                  onClick={() => setActiveTrendIdx(idx)}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all duration-200 ${
                    activeTrendIdx === idx
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-[#a6a3bf] hover:text-white"
                  }`}
                >
                  {td.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Metric Displays */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-left">
            <div className="bg-white/5 p-4 border border-white/5 rounded-lg">
              <span className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-wider block mb-1">Target Trend</span>
              <span className="font-hanken font-semibold text-base text-white block">{currentTrend.title}</span>
            </div>
            <div className="bg-white/5 p-4 border border-white/5 rounded-lg">
              <span className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-wider block mb-1">Fatigue Index</span>
              <span className="font-hanken font-bold text-lg text-[#f43f5e] block">{currentTrend.fatigue}</span>
            </div>
            <div className="bg-white/5 p-4 border border-white/5 rounded-lg">
              <span className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-wider block mb-1">Trend Velocity</span>
              <span className="font-hanken font-semibold text-base text-[#f43f5e] block">{currentTrend.change} ({currentTrend.status})</span>
            </div>
            <div className="bg-white/5 p-4 border border-white/5 rounded-lg">
              <span className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-wider block mb-1">AI Recommendation</span>
              <span className="font-hanken font-semibold text-base text-sage block">{currentTrend.remedy}</span>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative bg-[#090716]/45 border border-white/5 rounded-lg p-4 sm:p-6 h-[260px] md:h-[340px] flex flex-col justify-between overflow-hidden">
            
            {/* Ambient grid lines in the background */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-40">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border-t border-l border-white/5" />
              ))}
            </div>

            {/* Telemetry metadata tags */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold text-[#f43f5e] bg-[#ffdad6]/10 border border-[#f43f5e]/20 px-2 py-0.5 rounded uppercase">
                FATIGUED NICHE: {currentTrend.title}
              </span>
              <span className="font-mono text-[9px] font-bold text-sage bg-[#f4fcf5]/10 border border-sage/20 px-2 py-0.5 rounded uppercase">
                GROWING OPPORTUNITY: {currentTrend.alternative}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10">
              <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#f1f0f7] uppercase tracking-widest bg-white/5 shadow-sm border border-white/5 px-2 py-1 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-sage animate-ping" />
                SEMI-STABLE METADATA ACTIVE
              </span>
            </div>

            {/* The SVG curve charts */}
            <div className="w-full h-full relative mt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 300" preserveAspectRatio="none">
                
                <defs>
                  {/* Gradients */}
                  <linearGradient id="downGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="upGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5d5cff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#5d5cff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Saturated declining trend fill and path */}
                <path
                  d={`${currentTrend.pathDown} L 600 300 L 0 300 Z`}
                  fill="url(#downGradient)"
                />
                <path
                  d={currentTrend.pathDown}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  className="opacity-70"
                />

                {/* Alternate rising trend fill and path */}
                <path
                  d={`${currentTrend.pathUp} L 600 300 L 0 300 Z`}
                  fill="url(#upGradient)"
                />
                <path
                  d={currentTrend.pathUp}
                  fill="none"
                  stroke="#5d5cff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Crossover / Fatigue Event Intersection Node */}
                <g transform={`translate(${currentTrend.crossover.x}, ${currentTrend.crossover.y})`}>
                  {/* Outer glowing pulsing circle */}
                  <circle r="16" fill="#5d5cff" fillOpacity="0.15" className="animate-ping" />
                  <circle r="8" fill="#5d5cff" fillOpacity="0.25" />
                  
                  {/* Highly polished 3D glowing sphere node */}
                  <circle r="5" fill="url(#brandSphereGrad)" />
                  <radialGradient id="brandSphereGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ff9eb5" />
                    <stop offset="40%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#5d5cff" />
                  </radialGradient>
                </g>
              </svg>

              {/* Absolute Position labels next to convergence node */}
              <div
                style={{
                  position: "absolute",
                  left: `${(currentTrend.crossover.x / 600) * 100}%`,
                  top: `${(currentTrend.crossover.y / 300) * 100 - 15}%`,
                  transform: "translate(-50%, -100%)"
                }}
                className="bg-[#14102c] text-white font-mono text-[9px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none select-none tracking-wider whitespace-nowrap z-20 border border-[#5d5cff]/30"
              >
                FATIGUE EVENT POINT ({currentTrend.change})
              </div>
            </div>

            {/* Bottom time indicators */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-wider">
              <span>DAY -30 (Peak Interest)</span>
              <span className="text-white font-black">DAY 0 (Event Horizon)</span>
              <span>DAY +30 (Full Saturation)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — PROCESS / METHODOLOGY (100% VISUALLY MATCHING)
          ═══════════════════════════════════════════════════════ */}
      <section id="process" className="py-24 px-6 bg-[#090716]/30 border-y border-white/5 scroll-reveal text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto space-y-16">
          
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block">OUR METHODOLOGY</span>
            <h2 className="font-hanken font-bold text-3xl md:text-4xl text-white tracking-tight">
              Simple Workflow, Complex Intelligence
            </h2>
          </div>

          {/* Workflow Steps layout with Small Icon Badges */}
          <div className="grid gap-10 md:grid-cols-3 max-w-4xl mx-auto relative z-10 text-center">
            
            {/* Step 1: Ingest */}
            <div className="flex flex-col items-center space-y-3.5">
              <div className="h-10 w-10 bg-primary/15 text-primary border border-primary/10 rounded-lg flex items-center justify-center">
                <Database className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-hanken font-bold text-lg text-white leading-tight">Ingest</h3>
              <p className="font-sans text-xs leading-relaxed text-[#a6a3bf] max-w-[280px]">
                We vacuum raw data from social graphs, search inputs, and transaction logs across 40+ global nodes.
              </p>
            </div>

            {/* Step 2: Analyze */}
            <div className="flex flex-col items-center space-y-3.5">
              <div className="h-10 w-10 bg-[#a855f7]/15 text-[#a855f7] border border-[#a855f7]/10 rounded-lg flex items-center justify-center">
                <Cpu className="h-4.5 w-4.5 animate-radar" />
              </div>
              <h3 className="font-hanken font-bold text-lg text-white leading-tight">Analyze</h3>
              <p className="font-sans text-xs leading-relaxed text-[#a6a3bf] max-w-[280px]">
                Proprietary AI filters noise through a cognitive fatigue lens to find the true saturation point.
              </p>
            </div>

            {/* Step 3: Predict */}
            <div className="flex flex-col items-center space-y-3.5">
              <div className="h-10 w-10 bg-sage/15 text-sage border border-sage/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-hanken font-bold text-lg text-white leading-tight">Predict</h3>
              <p className="font-sans text-xs leading-relaxed text-[#a6a3bf] max-w-[280px]">
                Receive actionable timelines on when to pivot before the market becomes exhausted.
              </p>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════
              THE GLOWING CURVED PIPELINE & 3D GLASS BRICKS
              ═══════════════════════════════════════════════════════ */}
          <div className="hidden md:block max-w-[840px] mx-auto h-[200px] relative mt-12 select-none">
            {/* Background glowing flow SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 800 200">
              {/* Outer conduit structure */}
              <path
                d="M 120 70 C 260 70, 260 150, 400 150 C 540 150, 540 70, 680 70"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Pulsing data line core */}
              <path
                d="M 120 70 C 260 70, 260 150, 400 150 C 540 150, 540 70, 680 70"
                stroke="url(#workflowPipelineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="25 60"
                fill="none"
                className="animate-pulse-line"
              />

              <defs>
                <linearGradient id="workflowPipelineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating 3D-styled glass brick 1 (Ingest: Purple/Magenta) */}
            <div 
              className="absolute left-[7%] top-[15px] w-24 h-24 glass-panel-heavy rounded-xl flex items-center justify-center shadow-2xl border border-white/10 animate-float"
              style={{ animationDelay: "0s" }}
            >
              {/* Inner glowing radial backplate */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-[#ba1a1a]/15 to-transparent rounded-xl pointer-events-none" />
              <svg className="w-10 h-10 text-white/90 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Floating 3D-styled glass brick 2 (Analyze: Purple/Violet) */}
            <div 
              className="absolute left-[44%] top-[95px] w-24 h-24 glass-panel-heavy rounded-xl flex items-center justify-center shadow-2xl border border-white/10 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              {/* Inner glowing radial backplate */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-500/15 to-transparent rounded-xl pointer-events-none" />
              <svg className="w-9 h-9 text-white/90 drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
              </svg>
            </div>

            {/* Floating 3D-styled glass brick 3 (Predict: Blue/Cyan) */}
            <div 
              className="absolute right-[7%] top-[15px] w-24 h-24 glass-panel-heavy rounded-xl flex items-center justify-center shadow-2xl border border-white/10 animate-float"
              style={{ animationDelay: "3.0s" }}
            >
              {/* Inner glowing radial backplate */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-cyan-500/15 to-transparent rounded-xl pointer-events-none" />
              <svg className="w-9 h-9 text-white/90 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l6-6 4 4 8-8M21 6.5H15v6" />
              </svg>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — CAPABILITIES
          ═══════════════════════════════════════════════════════ */}
      <section id="capabilities" className="py-24 px-6 bg-[#090716]/20 border-b border-white/5 scroll-reveal">
        <div className="max-w-[1200px] mx-auto space-y-16 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block">SYSTEM FEATURES</span>
            <h2 className="font-hanken font-bold text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Capabilities Engineered For Creators
            </h2>
            <p className="font-sans text-base text-[#a6a3bf] leading-relaxed">
              Deep-tech features packaged into a minimalist interface designed for strategic clarity.
            </p>
          </div>

          {/* Grid setup for Capabilities Cards (Minimalist Cards from Design System) */}
          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto text-left">
            
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-4 hover:border-primary/20 hover:shadow-soft transition-all duration-300 group">
              <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/15 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#8f8ca8] uppercase tracking-widest block mb-1">
                  MODULE // TELEMETRY
                </span>
                <h3 className="font-hanken font-semibold text-lg text-white mb-2">Pattern Recognition</h3>
                <p className="font-sans text-sm text-[#a6a3bf] leading-relaxed">
                  Neural networks identify recurring cultural cycles with 94% historical accuracy across multiple verticals.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-4 hover:border-primary/20 hover:shadow-soft transition-all duration-300 group">
              <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/15 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#8f8ca8] uppercase tracking-widest block mb-1">
                  NODES // LIVE MONITOR
                </span>
                <h3 className="font-hanken font-semibold text-lg text-white mb-2">Real-time Monitoring</h3>
                <p className="font-sans text-sm text-[#a6a3bf] leading-relaxed">
                  Live streaming data analysis with sub-second latency for immediate strategic responsiveness.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-4 hover:border-primary/20 hover:shadow-soft transition-all duration-300 group">
              <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/15 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                <LineChart className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#8f8ca8] uppercase tracking-widest block mb-1">
                  MODELS // PREDICTOR
                </span>
                <h3 className="font-hanken font-semibold text-lg text-white mb-2">Predictive Analysis</h3>
                <p className="font-sans text-sm text-[#a6a3bf] leading-relaxed">
                  Forecasting the &quot;fatigue event&quot; window 14-20 days before it materializes in mainstream media.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-4 hover:border-primary/20 hover:shadow-soft transition-all duration-300 group">
              <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/15 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#8f8ca8] uppercase tracking-widest block mb-1">
                  SYSTEMS // SYNTHESIS
                </span>
                <h3 className="font-hanken font-semibold text-lg text-white mb-2">Content Optimization</h3>
                <p className="font-sans text-sm text-[#a6a3bf] leading-relaxed">
                  Automated hooks and narrative structures that resonate with the current &quot;energy&quot; of the trend.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — PRICING
          ═══════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-28 px-6 max-w-[1200px] mx-auto scroll-reveal text-center relative select-none">
        
        <div className="space-y-4 mb-16">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block">PRICING PLANS</span>
          <h2 className="font-hanken font-bold text-3xl md:text-4xl text-white tracking-tight">Simple Access</h2>
          <p className="font-sans text-base text-[#a6a3bf] max-w-xl mx-auto">Scale as your insight needs grow.</p>
        </div>

        {/* Apple-style Price Plan Card - Rounded Rect (No Pills) */}
        <div className="max-w-[420px] mx-auto bg-[#0a071b]/60 border border-white/10 rounded-xl p-8 sm:p-10 shadow-soft space-y-6 text-left relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[3px] bg-brand-gradient" />
          
          <span className="font-mono text-[10px] font-bold text-[#8f8ca8] uppercase tracking-widest block">STARTER PLAN</span>
          
          <div className="flex items-baseline gap-1.5 border-b border-white/5 pb-4">
            <span className="font-hanken font-bold text-5xl text-white tracking-tight">₹0</span>
            <span className="font-sans text-sm text-[#a6a3bf] font-medium">/ month</span>
          </div>

          <p className="font-sans text-sm text-[#a6a3bf] leading-relaxed">
            Perfect for small teams and independent creators seeking to beat noise, align signals, and reversal metrics.
          </p>
          
          <button
            onClick={() => handleOpenAuth("signup")}
            className="w-full py-3.5 bg-brand-gradient hover:shadow-button-glow text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 text-center"
          >
            Start Predicting
          </button>

          <ul className="space-y-4 pt-6 border-t border-white/5 font-sans text-xs text-[#f1f0f7] font-medium">
            <li className="flex items-center gap-3">
              <span className="h-5 w-5 bg-sage/20 text-sage rounded-md flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth="3" />
              </span>
              5 analyses / day
            </li>
            <li className="flex items-center gap-3">
              <span className="h-5 w-5 bg-sage/20 text-sage rounded-md flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth="3" />
              </span>
              Basic trend insights
            </li>
            <li className="flex items-center gap-3">
              <span className="h-5 w-5 bg-sage/20 text-sage rounded-md flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth="3" />
              </span>
              Standard formulation hooks
            </li>
          </ul>
        </div>

        <span className="block font-mono text-[10px] font-bold text-primary uppercase tracking-widest mt-12 hover:scale-105 transition-transform duration-200">
          PRO PLAN COMING SOON
        </span>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer id="insights" className="py-16 border-t border-white/10 bg-[#0a071b] text-left text-xs text-[#a6a3bf] relative select-none">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-transform group-hover:scale-105 duration-200">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-hanken font-bold text-base text-white tracking-tight">Trend Fatigue Engine</span>
            </Link>
            <p className="font-sans text-xs text-[#a6a3bf] leading-relaxed">
              Analytical, Visionary, Calm. Predicting the future of audience attention metrics.
            </p>
            <span className="block font-mono text-[9px] text-[#8f8ca8]">DESIGNED FOR DATA CREATORS // V1.0.4</span>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest block">Legal Core</span>
            <ul className="space-y-2 font-sans font-medium text-xs text-[#a6a3bf]">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest block">API Channels</span>
            <ul className="space-y-2 font-sans font-medium text-xs text-[#a6a3bf]">
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest block">Strategy Desk</span>
            <ul className="space-y-2 font-sans font-medium text-xs text-[#a6a3bf]">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Strategy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Enterprise Overlays</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 font-sans font-medium text-xs">
          <span>&copy; 2026 Trend Fatigue Engine AI. All rights reserved.</span>
          <span>Visionary attention telemetry layer.</span>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════
          INTERACTIVE AUTHENTICATION MODAL (🔐 SIGN UP & LOGIN FLOW)
          ═══════════════════════════════════════════════════════ */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass background overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Interactive Modal Body - Standard rounded rects */}
          <div className="relative bg-[#0d0a21] border border-white/10 rounded-xl p-8 w-full max-w-sm shadow-2xl z-10 overflow-hidden transform animate-fade-in-up">
            
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#a6a3bf] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title Header */}
            <div className="text-center mb-6 space-y-1">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-hanken font-bold text-xl text-white tracking-tight">
                {authMode === "signup" ? "Create your workspace" : "Welcome back"}
              </h3>
              <p className="font-sans text-xs text-[#a6a3bf] font-medium">
                {authMode === "signup" ? "Get started with your free creator workspace today." : "Access your active listen nodes and telemetry."}
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-4 rounded-lg bg-[#ffdad6]/10 border border-[#f43f5e]/20 p-3 text-xs font-bold text-[#f43f5e] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* Name Field (Sign Up Only) */}
              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-widest">Workspace Operator</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8f8ca8]" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white placeholder-[#8f8ca8] focus:outline-none focus:bg-[#090716] focus:border-primary transition-all focus:ring-1 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8f8ca8]" />
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white placeholder-[#8f8ca8] focus:outline-none focus:bg-[#090716] focus:border-primary transition-all focus:ring-1 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] font-bold text-[#8f8ca8] uppercase tracking-widest">Access Phrase</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8f8ca8]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white placeholder-[#8f8ca8] focus:outline-none focus:bg-[#090716] focus:border-primary transition-all focus:ring-1 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full h-11 bg-brand-gradient text-white font-bold rounded-lg text-xs transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-button-glow disabled:opacity-50"
              >
                {authLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Connecting Nodes...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === "signup" ? "Build Workspace" : "Access Workspace"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social Authentication divider */}
            <div className="relative my-5 text-center select-none">
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-white/5" />
              <span className="relative bg-[#0d0a21] px-3 font-mono text-[8px] font-bold text-[#8f8ca8] uppercase tracking-widest">
                or continue with
              </span>
            </div>

            {/* Google Authentication button */}
            <button
              onClick={handleAuthSubmit}
              className="w-full h-11 border border-white/10 hover:bg-white/5 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Auth Mode Toggle Footer Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setAuthMode(authMode === "signup" ? "login" : "signup");
                  setAuthError("");
                }}
                className="font-sans text-xs font-bold text-[#8f8ca8] hover:text-primary transition-colors"
              >
                {authMode === "signup" ? (
                  <>Already have an account? <span className="text-primary underline">Sign In</span></>
                ) : (
                  <>Don&apos;t have an account? <span className="text-primary underline">Build Workspace</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
