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
  Sun,
  Moon,
  Sparkles,
  Gem,
  PlayCircle,
  ShieldCheck,
  WandSparkles,
  ArrowDown
} from "lucide-react";
import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { InfluenceUniverseScene } from "@/components/landing/influence-scene";
import { dnaMetrics, growthCurve, campaignForecast, agentSteps } from "@/lib/data";
import { cn } from "@/lib/utils";

// Social SVG Icons for brand accuracy
const InstagramIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.99-1.72-.04 2.87-.01 5.75-.02 8.62-.1 1.77-.73 3.56-1.97 4.8-1.5 1.54-3.82 2.24-5.94 1.91-2.45-.37-4.63-2.12-5.32-4.54-.88-2.92.36-6.31 2.92-7.71 1.11-.6 2.4-.79 3.65-.62v4.13c-.88-.23-1.88-.08-2.61.48-.82.61-1.12 1.69-.9 2.68.22 1.05 1.13 1.86 2.21 1.89 1.39.09 2.66-.9 2.77-2.29.04-3.94.02-7.88.03-11.82-1.72-.08-3.41-.75-4.58-2.03-.49-.53-.87-1.16-1.12-1.85h4.15z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
    alternative: "Brutalism & Analog Grgrids",
    altCategory: "Rising Opportunity",
    altStatus: "Disruptive",
    altChange: "+148%",
    pathUp: "M 0 270 Q 130 240, 280 150 T 600 30",
    crossover: { x: 285, y: 142 }
  }
];

export default function SaaSLandingPage() {
  const router = useRouter();
  const { setIsAuthenticated, setIsAdmin } = useNexusStore();

  // Authentication states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  // Telemetry Dashboard state
  const [activeTrendIdx, setActiveTrendIdx] = useState(0);
  const currentTrend = TREND_DATASETS[activeTrendIdx];

  // Default theme is dark!
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initialize theme based on user selection or defaults
    const savedTheme = localStorage.getItem("theme");
    const defaultDark = savedTheme !== "light"; // Default to dark unless explicitly light
    setIsDark(defaultDark);
    if (defaultDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Scroll reveal setup
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
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleOpenAuth = (mode: "login" | "signup", isAdminPortal = false) => {
    setAuthMode(mode);
    setAuthError("");
    setIsAdminLogin(isAdminPortal);
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!isAdminLogin) {
      if (!email || !password || (authMode === "signup" && !name)) {
        setAuthError("Please fill out all fields.");
        return;
      }
    } else {
      if (!password) {
        setAuthError("Please enter the decryption access key.");
        return;
      }
    }

    const phrase = password.toLowerCase().trim();
    const isAuthenticatingAdmin = phrase === "batman2026" || phrase === "admin123";

    if (isAdminLogin && !isAuthenticatingAdmin) {
      setAuthError("DECRYPTION FAILURE: ACCESS DENIED. ONLY REGISTERED SYSTEM ADMINISTRATORS MAY LOG IN THROUGH THE SECURITY ARCHWAY.");
      return;
    }

    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      setIsAuthenticated(true);
      if (isAdminLogin && isAuthenticatingAdmin) {
        setIsAdmin(true);
        setIsAuthModalOpen(false);
        router.push("/dashboard/admin");
      } else {
        setIsAdmin(false);
        setIsAuthModalOpen(false);
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-[#f1f0f7] font-sans antialiased overflow-x-hidden relative bg-dot-pattern">
      
      {/* 2D LIQUID METABALL BACKGROUND */}
      <div className="liquid-bg-container" aria-hidden="true" />

      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-[#090716]/65 backdrop-blur-md border-b border-slate-100 dark:border-white/5 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo (left) */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-gradient-to-br from-[#AEF597] to-[#A8F690] text-slate-950 shadow-md font-bold transition-transform group-hover:scale-105 duration-200">
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-hanken font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              Trend Fatigue Engine <span className="text-[#AEF597] font-black">AI</span>
            </span>
          </Link>

          {/* Links (middle) */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#process" className="font-sans text-xs font-bold text-slate-800 dark:text-[#a6a3bf] hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-wider">Process</a>
            <a href="#capabilities" className="font-sans text-xs font-bold text-slate-800 dark:text-[#a6a3bf] hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-wider">Capabilities</a>
            <a href="#pricing" className="font-sans text-xs font-bold text-slate-800 dark:text-[#a6a3bf] hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-wider">Pricing</a>
            <a href="#insights" className="font-sans text-xs font-bold text-slate-800 dark:text-[#a6a3bf] hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-wider">Insights</a>
          </nav>

          {/* Right Actions & theme switcher */}
          <div className="flex items-center gap-5">
            {/* Social Icons */}
            <div className="hidden lg:flex items-center gap-3.5 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-slate-600 dark:hover:text-white transition-colors"><InstagramIcon /></a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-white transition-colors"><TikTokIcon /></a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-white transition-colors"><TwitterIcon /></a>
            </div>

            {/* Light/Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all duration-200"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => handleOpenAuth("login")}
              className="font-sans text-xs font-bold text-slate-800 dark:text-[#a6a3bf] hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-wider"
            >
              Sign In
            </button>
            <button
              onClick={() => handleOpenAuth("signup")}
              className="px-5 py-2.5 bg-brand-gradient hover:shadow-button-glow text-slate-950 font-bold rounded-lg text-xs transition-all duration-200 active:scale-95 uppercase tracking-wider shadow-sm"
            >
              Get Access
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-36 pb-12 px-6 text-center max-w-[1200px] mx-auto relative select-none">
        <div className="space-y-8 animate-fade-in-up">
          {/* Analysis Badge/Chip in Soft Green */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#090716]/65 backdrop-blur-sm px-4 py-2 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-[#AEF597] animate-radar" />
            <span className="font-mono text-[10px] font-semibold text-slate-700 dark:text-[#f1f0f7] uppercase tracking-widest">
              ⚡ 100 ANALYSES - 2/20 FREE REMAINS
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-hanken font-bold text-[52px] md:text-[82px] text-slate-950 dark:text-white tracking-tighter leading-[1.03] max-w-5xl mx-auto">
            Stop Chasing Trends.
            <br />
            <span className="text-[#AEF597]">
              Start Predicting Them.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-[22px] text-slate-800 dark:text-[#a6a3bf] max-w-3xl mx-auto leading-relaxed font-normal">
            A mathematical layer over the chaos of culture. Our engine detects the moment interest peaks and fatigue begins—before your competitors even notice.
          </p>

          {/* Core CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenAuth("signup")}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-gradient hover:shadow-button-glow text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            >
              Start Predicting
            </button>
            <a
              href="#process"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm text-center"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* WAVESHIFT TELEMETRY DASHBOARD PREVIEW (Hard Dark Panel) */}
      <section className="pb-24 px-6 max-w-[1100px] mx-auto scroll-reveal">
        <div className="relative bg-[#0c0f1d] border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden group">
          
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#AEF597] via-pink-500 to-transparent opacity-85" />

          {/* Tab selector header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#AEF597]/15 text-[#AEF597] border border-[#AEF597]/10">
                <Activity className="h-5 w-5 animate-radar" />
              </span>
              <div className="text-left">
                <span className="block font-hanken font-bold text-sm text-white leading-tight">WaveShift Telemetry Dashboard</span>
                <span className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Engine Status: LIVE LISTENING</span>
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
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {td.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Metric Displays */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-left">
            {/* KPI Card 1 */}
            <div className="bg-white/5 p-5 border border-white/10 rounded-xl relative overflow-hidden group/kpi cursor-pointer hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Target Trend</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#AEF597] ring-pulse-green" />
              </div>
              <span className="font-hanken font-bold text-lg md:text-[20px] text-white block truncate">{currentTrend.title}</span>
            </div>

            {/* KPI Card 2 */}
            <div className="bg-white/5 p-5 border border-white/10 rounded-xl relative overflow-hidden group/kpi cursor-pointer hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Fatigue Index</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 ring-pulse-green" style={{ animationDelay: "0.5s" }} />
              </div>
              <span className="font-hanken font-extrabold text-2xl md:text-[28px] text-[#f43f5e] block tracking-tight">{currentTrend.fatigue}</span>
            </div>

            {/* KPI Card 3 */}
            <div className="bg-white/5 p-5 border border-white/10 rounded-xl relative overflow-hidden group/kpi cursor-pointer hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Trend Velocity</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 ring-pulse-green" style={{ animationDelay: "1s" }} />
              </div>
              <span className="font-hanken font-bold text-lg md:text-[19px] text-[#f43f5e] block tracking-tight">
                {currentTrend.change} <span className="text-[11px] font-normal text-slate-400 font-sans block">{currentTrend.status}</span>
              </span>
            </div>

            {/* KPI Card 4 */}
            <div className="bg-white/5 p-5 border border-white/10 rounded-xl relative overflow-hidden group/kpi cursor-pointer hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">AI Recommendation</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#AEF597] ring-pulse-green" style={{ animationDelay: "1.5s" }} />
              </div>
              <span className="font-hanken font-bold text-lg md:text-[19px] text-[#AEF597] block leading-snug">{currentTrend.remedy}</span>
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
              <span className="font-mono text-[9px] font-bold text-[#AEF597] bg-[#AEF597]/10 border border-[#AEF597]/20 px-2 py-0.5 rounded uppercase">
                GROWING OPPORTUNITY: {currentTrend.alternative}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10">
              <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#f1f0f7] uppercase tracking-widest bg-white/5 shadow-sm border border-white/5 px-2 py-1 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-[#AEF597] animate-ping" />
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
                    <stop offset="0%" stopColor="#AEF597" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#AEF597" stopOpacity="0.0" />
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

                {/* Alternate rising trend fill and path in soft green #AEF597 */}
                <path
                  d={`${currentTrend.pathUp} L 600 300 L 0 300 Z`}
                  fill="url(#upGradient)"
                />
                <path
                  d={currentTrend.pathUp}
                  fill="none"
                  stroke="#AEF597"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Crossover / Fatigue Event Intersection Node */}
                <g transform={`translate(${currentTrend.crossover.x}, ${currentTrend.crossover.y})`}>
                  {/* Outer glowing pulsing circle */}
                  <circle r="16" fill="#AEF597" fillOpacity="0.15" className="animate-ping" />
                  <circle r="8" fill="#AEF597" fillOpacity="0.25" />
                  
                  {/* Highly polished sphere node */}
                  <circle r="5" fill="url(#brandSphereGrad)" />
                  <radialGradient id="brandSphereGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#AEF597" />
                    <stop offset="100%" stopColor="#10b981" />
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
                className="bg-[#14102c] text-white font-mono text-[9px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none select-none tracking-wider whitespace-nowrap z-20 border border-[#AEF597]/30"
              >
                FATIGUE EVENT POINT ({currentTrend.change})
              </div>
            </div>

            {/* Bottom time indicators */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3.5 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              <span>DAY -30 (Peak Interest)</span>
              <span className="text-white font-black">DAY 0 (Event Horizon)</span>
              <span>DAY +30 (Full Saturation)</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS / METHODOLOGY (Original curved glowing pipeline & 3D Glass bricks) */}
      <section id="process" className="py-24 px-6 bg-slate-50/50 dark:bg-[#090716]/30 border-y border-slate-100 dark:border-white/5 scroll-reveal text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto space-y-16">
          
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#AEF597] uppercase tracking-widest block font-bold">OUR METHODOLOGY</span>
            <h2 className="font-hanken font-bold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
              Simple Workflow, Complex Intelligence
            </h2>
          </div>

          {/* Workflow Steps layout */}
          <div className="grid gap-10 md:grid-cols-3 max-w-4xl mx-auto relative z-10 text-center">
            
            {/* Step 1: Ingest */}
            <div className="flex flex-col items-center space-y-3.5">
              <div className="h-10 w-10 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/10 rounded-lg flex items-center justify-center shadow-sm">
                <Database className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-hanken font-bold text-lg text-slate-900 dark:text-white leading-tight">Ingest</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-[#a6a3bf] max-w-[285px]">
                We vacuum raw data from social graphs, search inputs, and transaction logs across 40+ global nodes.
              </p>
            </div>

            {/* Step 2: Analyze */}
            <div className="flex flex-col items-center space-y-3.5">
              <div className="h-10 w-10 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/10 rounded-lg flex items-center justify-center shadow-sm">
                <Cpu className="h-4.5 w-4.5 animate-radar" />
              </div>
              <h3 className="font-hanken font-bold text-lg text-slate-900 dark:text-white leading-tight">Analyze</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-[#a6a3bf] max-w-[285px]">
                Proprietary AI filters noise through a cognitive fatigue lens to find the true saturation point.
              </p>
            </div>

            {/* Step 3: Predict */}
            <div className="flex flex-col items-center space-y-3.5">
              <div className="h-10 w-10 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/10 rounded-lg flex items-center justify-center shadow-sm">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-hanken font-bold text-lg text-slate-900 dark:text-white leading-tight">Predict</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-[#a6a3bf] max-w-[285px]">
                Receive actionable timelines on when to pivot before the market becomes exhausted.
              </p>
            </div>
          </div>

          {/* GLOWING CURVED PIPELINE & 3D GLASS BRICKS (Soft Green styled) */}
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
              
              {/* Pulsing data line core using #AEF597 and emerald */}
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
                  <stop offset="0%" stopColor="#AEF597" />
                  <stop offset="50%" stopColor="#A8F690" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating 3D-styled glass brick 1 (Ingest) */}
            <div 
              className="absolute left-[7%] top-[15px] w-24 h-24 glass-panel-heavy rounded-xl flex items-center justify-center shadow-2xl border border-white/10 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#AEF597]/20 via-[#A8F690]/10 to-transparent rounded-xl pointer-events-none" />
              <svg className="w-10 h-10 text-slate-800 dark:text-white drop-shadow-[0_0_12px_rgba(174,245,151,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Floating 3D-styled glass brick 2 (Analyze) */}
            <div 
              className="absolute left-[44%] top-[95px] w-24 h-24 glass-panel-heavy rounded-xl flex items-center justify-center shadow-2xl border border-white/10 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#AEF597]/20 via-emerald-500/10 to-transparent rounded-xl pointer-events-none" />
              <svg className="w-9 h-9 text-slate-800 dark:text-white drop-shadow-[0_0_12px_rgba(174,245,151,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
              </svg>
            </div>

            {/* Floating 3D-styled glass brick 3 (Predict) */}
            <div 
              className="absolute right-[7%] top-[15px] w-24 h-24 glass-panel-heavy rounded-xl flex items-center justify-center shadow-2xl border border-white/10 animate-float"
              style={{ animationDelay: "3.0s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#AEF597]/20 via-teal-500/10 to-transparent rounded-xl pointer-events-none" />
              <svg className="w-9 h-9 text-slate-800 dark:text-white drop-shadow-[0_0_12px_rgba(174,245,151,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l6-6 4 4 8-8M21 6.5H15v6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section id="capabilities" className="py-24 px-6 max-w-[1200px] mx-auto scroll-reveal">
        <div className="space-y-16 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold text-[#AEF597] uppercase tracking-widest block font-bold">SYSTEM FEATURES</span>
            <h2 className="font-hanken font-bold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Capabilities Engineered For Creators
            </h2>
            <p className="font-sans text-base text-slate-800 dark:text-[#a6a3bf] leading-relaxed">
              Deep-tech features packaged into a minimalist interface designed for strategic clarity.
            </p>
          </div>

          {/* Grid setup for Capabilities Cards (Minimalist Cards from Design System) */}
          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto text-left">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-[#101424]/40 border border-slate-200 dark:border-white/10 rounded-2xl p-7 relative overflow-hidden group/cap hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-0 group-hover/cap:opacity-40 transition-opacity duration-350" />
              <div className="h-11 w-11 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/cap:scale-110 shadow-sm">
                <Cpu className="h-5.5 w-5.5" />
              </div>
              <div className="pt-5 text-left">
                <span className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest block mb-1.5">
                  MODULE // TELEMETRY
                </span>
                <h3 className="font-hanken font-bold text-[20px] text-slate-950 dark:text-white mb-2.5">Pattern Recognition</h3>
                <p className="font-sans text-sm leading-relaxed text-slate-500 dark:text-[#a6a3bf]">
                  Neural networks identify recurring cultural cycles with 94% historical accuracy across multiple verticals.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-[#101424]/40 border border-slate-200 dark:border-white/10 rounded-2xl p-7 relative overflow-hidden group/cap hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-0 group-hover/cap:opacity-40 transition-opacity duration-350" />
              <div className="h-11 w-11 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/cap:scale-110 shadow-sm">
                <Activity className="h-5.5 w-5.5 animate-radar" />
              </div>
              <div className="pt-5 text-left">
                <span className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest block mb-1.5">
                  NODES // LIVE MONITOR
                </span>
                <h3 className="font-hanken font-bold text-[20px] text-slate-950 dark:text-white mb-2.5">Real-time Monitoring</h3>
                <p className="font-sans text-sm leading-relaxed text-slate-500 dark:text-[#a6a3bf]">
                  Live streaming data analysis with sub-second latency for immediate strategic responsiveness.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-[#101424]/40 border border-slate-200 dark:border-white/10 rounded-2xl p-7 relative overflow-hidden group/cap hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-0 group-hover/cap:opacity-40 transition-opacity duration-350" />
              <div className="h-11 w-11 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/cap:scale-110 shadow-sm">
                <LineChart className="h-5.5 w-5.5" />
              </div>
              <div className="pt-5 text-left">
                <span className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest block mb-1.5">
                  MODELS // PREDICTOR
                </span>
                <h3 className="font-hanken font-bold text-[20px] text-slate-950 dark:text-white mb-2.5">Predictive Analysis</h3>
                <p className="font-sans text-sm leading-relaxed text-slate-500 dark:text-[#a6a3bf]">
                  Forecasting the &quot;fatigue event&quot; window 14-20 days before it materializes in mainstream media.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-[#101424]/40 border border-slate-200 dark:border-white/10 rounded-2xl p-7 relative overflow-hidden group/cap hover-glow-green transition-all duration-300">
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-0 group-hover/cap:opacity-40 transition-opacity duration-350" />
              <div className="h-11 w-11 bg-[#AEF597]/15 text-lime-700 dark:text-[#AEF597] border border-[#AEF597]/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/cap:scale-110 shadow-sm">
                <Sparkles className="h-5.5 w-5.5" />
              </div>
              <div className="pt-5 text-left">
                <span className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest block mb-1.5">
                  SYSTEMS // SYNTHESIS
                </span>
                <h3 className="font-hanken font-bold text-[20px] text-slate-950 dark:text-white mb-2.5">Content Optimization</h3>
                <p className="font-sans text-sm leading-relaxed text-slate-500 dark:text-[#a6a3bf]">
                  Automated hooks and narrative structures that resonate with the current &quot;energy&quot; of the trend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFLUENCE DNA SECTION */}
      <Section
        id="influence-dna"
        eyebrow="Influence DNA(TM)"
        title="A living signature for every creator."
        copy="The platform models creator trust, momentum, semantic fit, and audience response as a dynamic intelligence fingerprint."
        className="scroll-reveal text-center relative select-none"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr] text-left">
          <GlassPanel className="relative min-h-[520px] overflow-hidden p-4 sm:p-8 bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-[20px] shadow-sm">
            <div className="absolute inset-0 opacity-40" />
            <div className="relative h-[430px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dnaMetrics}>
                  <PolarGrid gridType="polygon" stroke="rgba(255,255,255,.14)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#6B7280", fontSize: 12 }} />
                  <Radar name="Creator DNA" dataKey="value" stroke="#AEF597" fill="#AEF597" fillOpacity={0.15} />
                  <Tooltip
                    contentStyle={{ background: "rgba(10,10,10,.95)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="relative grid grid-cols-3 gap-3">
              {dnaMetrics.map((item) => (
                <div key={item.subject} className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">{item.subject}</p>
                  <p className="mt-1 text-lg font-black text-[#AEF597]">{item.value}%</p>
                </div>
              ))}
            </div>
          </GlassPanel>
          <div className="space-y-4">
            {[
              ["Authenticity", "Detects sponsored-content fatigue, comment entropy, and trust decay before audiences disengage."],
              ["Brand Fit", "Compares brand memory structures against creator language, community values, and purchase triggers."],
              ["Virality", "Forecasts hook velocity, remix potential, and cross-network propagation windows."]
            ].map(([title, copy]) => (
              <div key={title} className="p-5 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-2xl transition hover:-translate-y-1 hover:border-[#AEF597]/40">
                <div className="mb-3 flex items-center gap-3 text-[#AEF597]">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">{title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-[#a6a3bf]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HIDDEN GEM DISCOVERY */}
      <Section eyebrow="Hidden gem discovery" title="Find Tomorrow's Creators Today" className="scroll-reveal text-center relative select-none">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] text-left">
          <GlassPanel className="p-6 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-[20px] flex flex-col justify-between shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">10M Follower Creator</p>
                <p className="mt-2 text-2xl font-black text-red-500">31% Aura</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">15K Follower Creator</p>
                <p className="mt-2 text-2xl font-black text-[#AEF597]">92% Aura</p>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-[#AEF597]/20 bg-[#AEF597]/5 p-5">
              <div className="flex items-center gap-3 text-[#AEF597]">
                <Gem className="h-5 w-5" />
                <span className="font-bold text-xs uppercase tracking-wider">Future Viral Probability: 92%</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-[#a6a3bf]">
                Our system detected early community compounding, high-save tutorials, and underpriced brand affinity before the follower graph caught up.
              </p>
            </div>
          </GlassPanel>
          <GlassPanel className="min-h-[360px] p-6 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-[20px] shadow-sm">
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={growthCurve}>
                <defs>
                  <linearGradient id="nexusGrowth" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#AEF597" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#AEF597" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ background: "rgba(10,10,10,.95)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8 }}
                />
                <Area type="monotone" dataKey="legacy" stroke="#f43f5e" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="nexus" stroke="#AEF597" fill="url(#nexusGrowth)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassPanel>
        </div>
      </Section>

      {/* CAMPAIGN SIMULATOR */}
      <Section
        eyebrow="Campaign simulator"
        title="Bloomberg-grade forecasting for culture."
        copy="Model creator, brand, budget, and goal combinations before a single dollar is deployed."
        className="scroll-reveal text-center relative select-none"
      >
        <GlassPanel className="overflow-hidden bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-[20px] text-left shadow-sm">
          <div className="grid lg:grid-cols-[360px_1fr]">
            <div className="border-b border-white/5 p-6 lg:border-b-0 lg:border-r">
              {["Brand", "Creator", "Budget", "Goal"].map((item, index) => (
                <label key={item} className="mb-5 block">
                  <span className="mb-2 block text-[9px] uppercase tracking-wider text-slate-500">{item}</span>
                  <div className="rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-xs font-bold text-white uppercase tracking-wider">
                    {["Astra Skin", "Mira Vale", "$84,000", "Conversion lift"][index]}
                  </div>
                </label>
              ))}
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {campaignForecast.map((metric) => (
                <div key={metric.name} className="rounded-xl border border-white/5 bg-black/30 p-5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">{metric.name}</p>
                  <p className="mt-3 text-3xl font-black text-white">{metric.value}%</p>
                  <div className="mt-4 h-1.5 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#AEF597] to-emerald-500" style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </Section>

      {/* AI VIRAL LAB */}
      <Section eyebrow="AI viral lab" title="Generate, score, and sharpen content before it hits the feed." className="scroll-reveal text-center relative select-none">
        <div className="grid gap-6 lg:grid-cols-2 text-left">
          <GlassPanel className="min-h-[460px] p-6 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-[20px] flex flex-col justify-between shadow-sm">
            <div className="mb-5 flex items-center gap-3 text-[#AEF597]">
              <PlayCircle className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wider font-bold">Generated Video Framework</span>
            </div>
            <div className="flex h-[340px] items-center justify-center rounded-xl border border-white/5 bg-black/40">
              <div className="max-w-xs text-center p-6">
                <WandSparkles className="mx-auto mb-5 h-12 w-12 text-[#AEF597] animate-pulse" />
                <p className="text-lg font-black text-white uppercase tracking-wide">The 7-Second Rule Pivot</p>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">Cold open, social proof snap, visual payoff, and save-trigger close.</p>
              </div>
            </div>
          </GlassPanel>
          <GlassPanel className="p-6 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-[20px] shadow-sm">
            <div className="mb-5 flex items-center gap-3 text-[#AEF597]">
              <Cpu className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wider font-bold">AI Analysis Metrics</span>
            </div>
            <div className="space-y-6">
              {["Hook Strength", "Trend Match", "Shareability", "Retention Score", "Virality Score"].map((metric, index) => {
                const value = 76 + index * 4;
                return (
                  <div key={metric}>
                    <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
                      <span>{metric.toUpperCase()}</span>
                      <span className="text-white">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#AEF597] to-emerald-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </div>
      </Section>

      {/* AUTONOMOUS AI AGENT WORKFLOW STEPS */}
      <Section eyebrow="Autonomous AI agent" title="A creator growth system that keeps working." copy="Trend, creative, campaign, and publishing agents coordinate as a single adaptive workflow." className="scroll-reveal text-center relative select-none">
        <div className="mx-auto max-w-2xl text-left">
          {agentSteps.map((step, index) => (
            <div key={step} className="relative">
              <GlassPanel className="mb-5 flex items-center gap-4 p-5 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-xl shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#AEF597]/30 bg-[#AEF597]/10 text-[#AEF597] text-xs font-black">
                  0{index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white text-xs uppercase tracking-wider">{step}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Confidence: {88 + index}%</p>
                </div>
                <Activity className="h-5 w-5 text-[#AEF597] animate-pulse" />
              </GlassPanel>
              {index < agentSteps.length - 1 && <ArrowDown className="mx-auto mb-5 h-5 w-5 text-[#AEF597]" />}
            </div>
          ))}
        </div>
      </Section>

      {/* INFLUENCE UNIVERSE 3D WEBGL GRAPH */}
      <Section
        eyebrow="Influence Universe(TM)"
        title="Every creator becomes a star system."
        copy="Zoom, pan, and explore category clusters where size, color, brightness, distance, and orbit reveal influence structure."
        className="scroll-reveal text-center relative select-none"
      >
        <GlassPanel className="relative h-[72vh] min-h-[560px] overflow-hidden p-0 bg-white/5 dark:bg-[#101424]/40 border border-slate-200/50 dark:border-white/10 rounded-[20px] shadow-sm">
          <InfluenceUniverseScene />
          <div className="pointer-events-none absolute left-4 top-4 grid gap-2 text-[10px] text-slate-400 sm:left-6 sm:top-6 z-10">
            {["Size = Influence", "Color = Category", "Brightness = Growth", "Distance = Similarity", "Orbit = Community"].map((item) => (
              <span key={item} className="rounded-full border border-white/5 bg-black/60 px-3 py-2 backdrop-blur-md">
                {item.toUpperCase()}
              </span>
            ))}
          </div>
        </GlassPanel>
      </Section>

      {/* PRICING */}
      <section id="pricing" className="py-28 px-6 max-w-[1200px] mx-auto scroll-reveal text-center relative select-none">
        
        <div className="space-y-4 mb-16">
          <span className="font-mono text-xs font-bold text-[#AEF597] uppercase tracking-widest block font-bold">PRICING PLANS</span>
          <h2 className="font-hanken font-bold text-3xl md:text-4xl text-slate-905 dark:text-white tracking-tight">Simple Access</h2>
          <p className="font-sans text-base text-slate-800 dark:text-[#a6a3bf] max-w-xl mx-auto">Scale as your insight needs grow.</p>
        </div>

        {/* Free Plan Card */}
        <div className="max-w-[420px] mx-auto bg-white dark:bg-[#0a071b]/60 border border-slate-150 dark:border-white/10 rounded-2xl p-8 sm:p-10 shadow-lg dark:shadow-soft space-y-6 text-left relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[4px] bg-brand-gradient" />
          
          <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest block">STARTER PLAN</span>
          
          <div className="flex items-baseline gap-1.5 border-b border-slate-100 dark:border-white/5 pb-4">
            <span className="font-hanken font-bold text-5xl text-slate-900 dark:text-white tracking-tight">₹0</span>
            <span className="font-sans text-sm text-slate-500 dark:text-[#a6a3bf] font-medium">/ month</span>
          </div>

          <p className="font-sans text-xs leading-relaxed text-slate-500 dark:text-[#a6a3bf]">
            Perfect for small teams and independent creators seeking to beat noise, align signals, and reversal metrics.
          </p>
          
          <button
            onClick={() => handleOpenAuth("signup")}
            className="w-full py-3.5 bg-brand-gradient hover:shadow-button-glow text-slate-955 font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 text-center"
          >
            Start Predicting
          </button>

          <ul className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5 font-sans text-xs text-slate-700 dark:text-[#f1f0f7] font-medium">
            <li className="flex items-center gap-3">
              <span className="h-5 w-5 bg-[#AEF597]/25 text-lime-800 dark:text-[#AEF597] rounded-md flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth="3.5" />
              </span>
              5 analyses / day
            </li>
            <li className="flex items-center gap-3">
              <span className="h-5 w-5 bg-[#AEF597]/25 text-lime-800 dark:text-[#AEF597] rounded-md flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth="3.5" />
              </span>
              Basic trend insights
            </li>
            <li className="flex items-center gap-3">
              <span className="h-5 w-5 bg-[#AEF597]/25 text-lime-800 dark:text-[#AEF597] rounded-md flex items-center justify-center">
                <Check className="h-3 w-3" strokeWidth="3.5" />
              </span>
              Standard formulation hooks
            </li>
          </ul>
        </div>

        <span className="block font-mono text-[10px] font-bold text-lime-750 dark:text-[#AEF597] uppercase tracking-widest mt-12 hover:scale-105 transition-transform duration-200">
          PRO PLAN COMING SOON
        </span>
      </section>

      {/* FOOTER */}
      <footer id="insights" className="py-16 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#0a071b] text-left text-xs text-slate-500 dark:text-[#a6a3bf] relative select-none">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-gradient-to-br from-[#AEF597] to-[#A8F690] text-slate-950 font-bold transition-transform group-hover:scale-105 duration-200">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-hanken font-bold text-base text-slate-900 dark:text-white tracking-tight">Trend Fatigue Engine</span>
            </Link>
            <p className="font-sans text-xs text-slate-500 dark:text-[#a6a3bf] leading-relaxed">
              Analytical, Visionary, Calm. Predicting the future of audience attention metrics.
            </p>
            <span className="block font-mono text-[9px] text-slate-400 dark:text-[#8f8ca8]">DESIGNED FOR DATA CREATORS // V1.0.4</span>
          </div>

          {/* Col 2 */}
          <div className="space-y-3.5">
            <span className="font-mono text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest block">Legal Core</span>
            <ul className="space-y-2.5 font-sans font-medium text-xs">
              <li><a href="#" className="hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3.5">
            <span className="font-mono text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest block">API Channels</span>
            <ul className="space-y-2.5 font-sans font-medium text-xs">
              <li><a href="#" className="hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3.5">
            <span className="font-mono text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest block">Strategy Desk</span>
            <ul className="space-y-2.5 font-sans font-medium text-xs">
              <li><a href="#" className="hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors">Contact Strategy</a></li>
              <li><a href="#" className="hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors">Enterprise Overlays</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-t border-slate-200/50 dark:border-white/5 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 font-sans font-medium text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span>&copy; 2026 Trend Fatigue Engine AI. All rights reserved.</span>
            <button
              onClick={() => handleOpenAuth("login", true)}
              className="text-[10px] font-mono text-slate-400/30 dark:text-slate-650/40 hover:text-red-500 hover:dark:text-red-400 transition-colors uppercase tracking-widest text-left cursor-pointer sm:ml-3"
            >
              [ Admin Terminal ]
            </button>
          </div>
          {/* Social Icons inside Footer */}
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors"><InstagramIcon /></a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors"><TikTokIcon /></a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors"><TwitterIcon /></a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE AUTHENTICATION MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass background overlay */}
          <div
            className="absolute inset-0 bg-slate-950/60 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Interactive Modal Body */}
          <div className="relative bg-white dark:bg-[#0c0a21] border border-slate-200 dark:border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl z-10 overflow-hidden transform animate-fade-in-up text-slate-900 dark:text-white">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#AEF597] to-[#A8F690]" />
            
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 dark:text-[#a6a3bf] hover:text-slate-905 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title Header */}
            <div className="text-center mb-6 space-y-1">
              {isAdminLogin ? (
                <>
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-red-955/20 border border-red-500/25 text-red-500 animate-pulse">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="font-mono font-bold text-lg tracking-wider text-white uppercase">
                    Admin Decryptor
                  </h3>
                  <p className="font-mono text-[9px] text-red-550/80 font-bold uppercase tracking-widest leading-relaxed">
                    [ SYSTEM SECURITY ARCHWAY ]
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#AEF597]/10 border border-[#AEF597]/20 text-lime-750 dark:text-[#AEF597]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="font-hanken font-bold text-xl tracking-tight">
                    {authMode === "signup" ? "Create your workspace" : "Welcome back"}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 dark:text-[#a6a3bf] font-medium leading-relaxed">
                    {authMode === "signup" ? "Get started with your free creator workspace today." : "Access your active listen nodes and telemetry."}
                  </p>
                </>
              )}
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-4 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3 text-xs font-bold text-rose-600 dark:text-rose-450 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
              
              {/* Name Field (Sign Up Only) */}
              {!isAdminLogin && authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest">Workspace Operator</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#8f8ca8]" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-55 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-[#090716] focus:border-[#AEF597] dark:focus:border-[#AEF597] transition-all focus:ring-1 focus:ring-[#AEF597]/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              {!isAdminLogin && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#8f8ca8]" />
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-55 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-[#090716] focus:border-[#AEF597] dark:focus:border-[#AEF597] transition-all focus:ring-1 focus:ring-[#AEF597]/20"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest">
                  {isAdminLogin ? "Decryption Access Key (e.g. batman2026)" : "Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-[#8f8ca8]" />
                  <input
                    type="password"
                    placeholder={isAdminLogin ? "ENTER SECURE ACCESS KEY..." : "••••••••"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-slate-55 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-[#090716] focus:border-[#AEF597] dark:focus:border-[#AEF597] transition-all focus:ring-1 focus:ring-[#AEF597]/20"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className={cn(
                  "w-full h-11 font-bold rounded-lg text-xs transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50",
                  isAdminLogin 
                    ? "bg-red-950/40 hover:bg-red-950/60 text-red-550 border border-red-500/25 hover:border-red-500/50 uppercase tracking-widest font-mono" 
                    : "bg-brand-gradient text-slate-950"
                )}
              >
                {authLoading ? (
                  <>
                    <svg className={cn("animate-spin h-4 w-4", isAdminLogin ? "text-red-550" : "text-slate-950")} viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>{isAdminLogin ? "DECRYPTING COMMAND KEY..." : "Connecting Nodes..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isAdminLogin ? "Access Terminal" : (authMode === "signup" ? "Build Workspace" : "Access Workspace")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {!isAdminLogin && (
              <>
                {/* Social Authentication divider */}
                <div className="relative my-5 text-center select-none">
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-200 dark:border-white/5" />
                  <span className="relative bg-white dark:bg-[#0c0a21] px-3 font-mono text-[8px] font-bold text-slate-400 dark:text-[#8f8ca8] uppercase tracking-widest">
                    or continue with
                  </span>
                </div>

                {/* Google Authentication button */}
                <button
                  onClick={handleAuthSubmit}
                  className="w-full h-11 border border-slate-200 dark:border-white/10 hover:bg-slate-55 dark:hover:bg-white/5 text-slate-750 dark:text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors duration-200"
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
                    className="font-sans text-xs font-bold text-slate-500 dark:text-[#8f8ca8] hover:text-lime-700 dark:hover:text-[#AEF597] transition-colors"
                  >
                    {authMode === "signup" ? (
                      <>Already have an account? <span className="text-lime-700 dark:text-[#AEF597] underline">Sign In</span></>
                    ) : (
                      <>Don&apos;t have an account? <span className="text-lime-700 dark:text-[#AEF597] underline">Build Workspace</span></>
                    )}
                  </button>
                </div>
              </>
            )}

            {isAdminLogin && (
              <div className="mt-6 text-center">
                <span className="font-mono text-[8px] font-bold text-red-500/60 uppercase tracking-widest block animate-pulse">
                  WARNSHIELD v4.0 SECURE ENVELOPE ACTIVE
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
