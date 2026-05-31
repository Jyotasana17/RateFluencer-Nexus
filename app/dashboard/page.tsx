"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  Lock,
  Compass,
  Settings as SettingsIcon,
  Skull,
  Search,
  Sparkles,
  ArrowRight,
  User,
  LogOut,
  RefreshCw,
  Terminal,
  Copy,
  Check,
  Cpu,
  Shield,
  Sliders,
  Volume2,
  VolumeX
} from "lucide-react";
import mockTrendsData from "../../mockTrends.json";

// Dynamic import for react-apexcharts to avoid Next.js SSR build errors
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] w-full items-center justify-center bg-black/40 border border-white/5 rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <RefreshCw className="h-8 w-8 text-cyan animate-spin" />
        <span className="text-xs font-mono text-ghost/60">Initializing Tactical Charts...</span>
      </div>
    </div>
  )
});

export default function DashboardHome() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [selectedTrendId, setSelectedTrendId] = useState<string>("t1");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notifications, setNotifications] = useState<string[]>([]);

  // Settings states
  const [fatigueThreshold, setFatigueThreshold] = useState<number>(80);
  const [audioAlerts, setAudioAlerts] = useState<boolean>(true);
  const [scanInterval, setScanInterval] = useState<number>(3);
  const [aiModel, setAiModel] = useState<string>("nexus-v4-turbo");

  // Terminal stats simulator
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS: System integrity check completed [OK]",
    "NET: Connected to social listening matrix node #14",
    "TFE: Deep NLP sentiment processor initialised successfully"
  ]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      const logs = [
        `SCAN: Scanned comment node cluster ${Math.floor(Math.random() * 9000) + 1000}`,
        `TFE: Recalculated sentiment score on active vector ID: ${Math.random() > 0.5 ? "t1" : "t2"}`,
        `SYS: CPU load ${Math.floor(Math.random() * 15) + 5}% | Mem Usage 34%`,
        `NET: Latency to counter-model API: ${Math.floor(Math.random() * 50) + 12}ms`
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setTerminalLogs((prev) => [...prev.slice(-4), randomLog]);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Simulate notification system
  const triggerNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      triggerNotification("Secured Connection Established. Tactical overview loaded.");
    }, 1200);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerNotification(`Copied to tactical cache: "${text}"`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedTrend =
    mockTrendsData.find((t) => t.id === selectedTrendId) || mockTrendsData[0];

  // ApexCharts Config
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 380,
      background: "transparent",
      toolbar: {
        show: false
      },
      animations: {
        enabled: true
      }
    },
    theme: {
      mode: "dark"
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: "rgba(255,255,255,0.05)"
      },
      axisTicks: {
        color: "rgba(255,255,255,0.05)"
      },
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "12px",
          fontFamily: "var(--font-inter), sans-serif"
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "12px",
          fontFamily: "var(--font-inter), sans-serif"
        }
      }
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.03)",
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00FFDD", // Neon Cyan for trend growth/peak
          downward: "#FF3366" // Neon Magenta/Red for trend fatigue crash
        },
        wick: {
          useFillColor: true
        }
      }
    },
    annotations: {
      points: [
        {
          x: "Week 3",
          y: 90,
          marker: {
            size: 6,
            fillColor: "#00FFFF",
            strokeColor: "#000"
          },
          label: {
            borderColor: "rgba(0,255,255,0.3)",
            borderWidth: 1,
            style: {
              color: "#000000",
              background: "#00FFFF",
              fontSize: "11px",
              fontWeight: 700,
              padding: {
                left: 8,
                right: 8,
                top: 4,
                bottom: 4
              }
            },
            text: "FATIGUE THRESHOLD BROKEN: Suggesting Counter-Narrative"
          }
        }
      ]
    }
  };

  const chartSeries = [
    {
      name: selectedTrend.trendName,
      data: selectedTrend.candlestickData.map((d) => ({
        x: d.x,
        y: d.y
      }))
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan/35 overflow-x-hidden font-sans">
      {/* Dynamic Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {notifications.map((note, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-[#0A0A0A] border border-cyan/30 text-white rounded-lg px-4 py-3 shadow-[0_0_15px_rgba(0,255,255,0.15)] animate-fade-in-up"
          >
            <Terminal className="h-4 w-4 text-cyan shrink-0" />
            <span className="text-xs font-mono tracking-tight">{note}</span>
          </div>
        ))}
      </div>

      {!isAuthenticated ? (
        /* ═══════════════════════════════════════════════════════
            LOCK SCREEN (BATMAN TECH STYLE)
            ═══════════════════════════════════════════════════════ */
        <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black px-6">
          {/* Tactical grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] bg-repeat"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }}
          />
          {/* Glowing central orb */}
          <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-cyan/[0.03] blur-[100px]" />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8 text-center shadow-2xl">
            {/* Header Tech Logo */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan/5 border border-cyan/25 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
              <Lock className="h-6 w-6 text-cyan" />
            </div>

            <h1 className="mb-2 text-2xl font-bold tracking-tight">
              TREND FATIGUE <span className="text-cyan">ENGINE AI</span>
            </h1>
            <p className="mb-8 text-xs font-mono tracking-widest text-ghost/60 uppercase">
              Tactical Analysis & Reversal Command
            </p>

            {/* Login Prompt details */}
            <div className="mb-6 rounded-lg bg-black/60 border border-white/5 p-4 text-left font-mono text-[11px] text-ghost/80">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>SECURE ENDPOINT:</span>
                <span className="text-cyan">ACTIVE</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>SYSTEM VERSION:</span>
                <span>v4.6.0-NEXUS</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>ENCRYPTION STATE:</span>
                <span className="text-emerald-500">AES-256</span>
              </div>
            </div>

            {/* Glowing CTA Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-lg bg-cyan py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] disabled:opacity-50 active:scale-95"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-black" />
                  <span>AUTHORIZING SYSTEM...</span>
                </>
              ) : (
                <>
                  <span>Creator Login</span>
                  <ArrowRight className="h-4 w-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Return link */}
            <div className="mt-6">
              <Link href="/" className="text-xs text-ghost hover:text-white transition-colors duration-200">
                ← Back to Platform Overview
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════
            DASHBOARD LAYOUT (BATMAN TECH STYLE)
            ═══════════════════════════════════════════════════════ */
        <div className="flex min-h-screen bg-[#020202]">
          {/* 1. Sidebar Navigation */}
          <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/5 bg-[#050505] lg:flex">
            {/* Header/Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/10 border border-cyan/20">
                <Activity className="h-4 w-4 text-cyan" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                Fatigue Engine <span className="text-cyan">AI</span>
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ghost">
                <User className="h-4 w-4 text-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">Special Ops Creator</span>
                <span className="text-[10px] font-mono text-ghost/50">Level 04 Intelligence</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-1.5 px-4 py-6">
              {[
                { label: "Overview", icon: Activity },
                { label: "Fatigue Radar", icon: Skull },
                { label: "Creator Stock Market", icon: TrendingUp },
                { label: "Settings", icon: SettingsIcon }
              ].map((item) => {
                const isActive = activeTab === item.label;
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      triggerNotification(`Navigating to ${item.label}`);
                    }}
                    className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-xs font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-cyan/5 text-cyan border-l-2 border-cyan pl-3.5"
                        : "text-ghost hover:bg-white/[0.02] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout button in sidebar footer */}
            <div className="border-t border-white/5 p-4">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  triggerNotification("Session terminated safely.");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs font-medium text-ghost hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-300"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Disconnect Node</span>
              </button>
            </div>
          </aside>

          {/* Main Area */}
          <div className="flex flex-1 flex-col lg:pl-64">
            {/* Top Command Bar */}
            <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#050505]/60 px-6 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-4">
                {/* Mobile Tab selector header info */}
                <div className="lg:hidden flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan/10 border border-cyan/20">
                    <Activity className="h-4 w-4 text-cyan" />
                  </div>
                  <span className="text-xs font-bold font-mono tracking-tight">{activeTab.toUpperCase()}</span>
                </div>
              </div>

              {/* Status & Quick Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 text-[10px] font-mono text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                  CORE ENGINE ONLINE
                </div>
                {/* Mobile Logout (visible on small viewports) */}
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.01] hover:bg-red-500/10 hover:text-red-400 lg:hidden transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Mobile Bottom Navigation Dock */}
            <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-white/5 bg-[#050505]/95 py-2 lg:hidden backdrop-blur-lg">
              {[
                { label: "Overview", icon: Activity },
                { label: "Fatigue Radar", icon: Skull },
                { label: "Creator Stock Market", icon: TrendingUp },
                { label: "Settings", icon: SettingsIcon }
              ].map((item) => {
                const isActive = activeTab === item.label;
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.label)}
                    className={`flex flex-col items-center gap-1 text-[9px] font-medium tracking-tight transition-colors ${
                      isActive ? "text-cyan" : "text-ghost"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Dashboard Content Container */}
            <main className="flex-1 p-6 md:p-8 space-y-8 pb-24 lg:pb-8">
              {/* Header Title */}
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl uppercase">
                    {activeTab} PANEL
                  </h2>
                  <p className="text-xs text-ghost">
                    {activeTab === "Overview" && "System status dashboard & operational node telemetry."}
                    {activeTab === "Fatigue Radar" && "List of saturated social media trends & AI counter-narratives."}
                    {activeTab === "Creator Stock Market" && "Market candlestick lifecycle charts & fatigue crashes."}
                    {activeTab === "Settings" && "Adjust AI models, scanning thresholds, and notification configs."}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => triggerNotification("Initiating custom deep scan database...")}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-mono text-ghost hover:text-white hover:bg-white/[0.04] transition-all"
                  >
                    <Terminal className="h-3.5 w-3.5 text-cyan" />
                    <span>Deep Scan Node</span>
                  </button>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════
                  TAB 1: OVERVIEW
                  ═══════════════════════════════════════════════════════ */}
              {activeTab === "Overview" && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* KPI Widgets */}
                  <div className="grid gap-6 sm:grid-cols-3">
                    {/* Card 1: Active Trends Scanned */}
                    <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                      <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-cyan/[0.01] blur-md pointer-events-none" />
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-[11px] font-mono tracking-wider text-ghost uppercase">
                          Active Trends Scanned
                        </span>
                        <Compass className="h-4 w-4 text-cyan" />
                      </div>
                      <div className="text-2xl font-bold tracking-tight md:text-3xl">14,204</div>
                      <div className="mt-2 text-[10px] font-mono text-ghost/50 flex items-center gap-1.5">
                        <span className="text-emerald-500">▲ +12.4%</span> since yesterday
                      </div>
                    </div>

                    {/* Card 2: Critical Fatigue Alerts */}
                    <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                      <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-red-500/[0.01] blur-md pointer-events-none" />
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-[11px] font-mono tracking-wider text-ghost uppercase">
                          Critical Fatigue Alerts
                        </span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="text-2xl font-bold tracking-tight md:text-3xl text-red-500 animate-pulse">
                        {mockTrendsData.filter(t => t.fatigueScore >= fatigueThreshold).length}
                      </div>
                      <div className="mt-2 text-[10px] font-mono text-red-500/70 flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                        Exceeding {fatigueThreshold}% fatigue threshold
                      </div>
                    </div>

                    {/* Card 3: Highest Virality Prediction */}
                    <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                      <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/[0.01] blur-md pointer-events-none" />
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-[11px] font-mono tracking-wider text-ghost uppercase">
                          Highest Virality Prediction
                        </span>
                        <Sparkles className="h-4 w-4 text-cyan" />
                      </div>
                      <div className="text-2xl font-bold tracking-tight md:text-3xl text-cyan shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                        96%
                      </div>
                      <div className="mt-2 text-[10px] font-mono text-cyan/70 flex items-center gap-1.5">
                        <span>Counter-narrative advantage:</span> HIGH
                      </div>
                    </div>
                  </div>

                  {/* System Terminal Console */}
                  <div className="rounded-xl border border-white/5 bg-black p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-cyan" />
                        <h3 className="text-sm font-bold tracking-tight font-mono">TACTICAL LOG STREAM</h3>
                      </div>
                      <span className="text-[9px] font-mono text-ghost/40">SECURE CONSOLE LINK ACTIVE</span>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      {terminalLogs.map((log, index) => (
                        <div key={index} className="flex gap-3 text-ghost/90 hover:text-white transition-colors duration-200">
                          <span className="text-cyan/60 font-semibold select-none">&gt;&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Start Action panel */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 space-y-4">
                      <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-cyan" />
                        AI MODEL STATUS
                      </h3>
                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-ghost/60">ACTIVE ENGINE:</span>
                          <span className="text-cyan">{aiModel.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-ghost/60">SCAN MATRIX INTERVAL:</span>
                          <span>{scanInterval} SECONDS</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ghost/60">INTELLIGENCE SYNC:</span>
                          <span className="text-emerald-500">100% ONLINE</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 space-y-4">
                      <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
                        <Shield className="h-4 w-4 text-cyan" />
                        THREAT SECURITY
                      </h3>
                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-ghost/60">SSL NODE HANDSHAKE:</span>
                          <span className="text-emerald-500">SECURE</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-ghost/60">SECURE SHELL AGENT:</span>
                          <span>PORT 2244</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ghost/60">IP TUNNEL OVERLAY:</span>
                          <span>10.197.184.7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════════════
                  TAB 2: FATIGUE RADAR
                  ═══════════════════════════════════════════════════════ */}
              {activeTab === "Fatigue Radar" && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Search and Filters */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute top-3 left-3 h-4 w-4 text-ghost/50" />
                      <input
                        type="text"
                        placeholder="Filter active trends by name or narrative..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-white/5 bg-black py-2.5 pr-4 pl-10 text-xs font-mono text-white placeholder-ghost/30 focus:border-cyan/30 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Reversal Feed */}
                  <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                        <Skull className="h-4 w-4 text-cyan" />
                        REVERSAL ENGINE FEED
                      </h3>
                      <p className="text-xs text-ghost">
                        Direct counter-narratives calculated from active fatigue indexes. Click to copy and deploy.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/5 text-ghost/60">
                            <th className="pb-3 font-semibold">SATURATED TREND</th>
                            <th className="pb-3 font-semibold">FATIGUE INDEX</th>
                            <th className="pb-3 font-semibold">AUDIENCE SENTIMENT</th>
                            <th className="pb-3 font-semibold text-right">AI SUGGESTED COUNTER-NARRATIVE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {mockTrendsData
                            .filter((trend) =>
                              trend.trendName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              trend.aiCounterNarrative.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((trend) => {
                              const isHighFatigue = trend.fatigueScore >= fatigueThreshold;
                              return (
                                <tr key={trend.id} className="hover:bg-white/[0.01] transition-colors">
                                  <td className="py-4 font-bold text-white pr-4">
                                    <div className="flex flex-col gap-1">
                                      <span>{trend.trendName}</span>
                                      <span className={`text-[9px] font-mono uppercase ${isHighFatigue ? "text-red-400" : "text-cyan"}`}>
                                        {isHighFatigue ? "Critical Fatigue" : trend.status}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-4 pr-4">
                                    <div className="flex items-center gap-3 min-w-[120px]">
                                      <div className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                          className={`h-full rounded-full transition-all duration-500 ${
                                            isHighFatigue
                                              ? "bg-gradient-to-r from-red-500 to-rose-600 animate-pulse"
                                              : "bg-gradient-to-r from-cyan to-blue-500"
                                          }`}
                                          style={{ width: `${trend.fatigueScore}%` }}
                                        />
                                      </div>
                                      <span
                                        className={`font-semibold ${
                                          isHighFatigue ? "text-red-400" : "text-cyan"
                                        }`}
                                      >
                                        {trend.fatigueScore}/100
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-4 pr-4">
                                    <div className="flex flex-wrap gap-1.5">
                                      {trend.sentiment.map((tag) => (
                                        <span
                                          key={tag}
                                          className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] text-ghost/80"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 text-right">
                                    <button
                                      onClick={() =>
                                        copyToClipboard(trend.aiCounterNarrative, trend.id)
                                      }
                                      className="group inline-flex items-center gap-2 rounded-lg border border-cyan/20 bg-cyan/5 px-3 py-1.5 font-sans text-xs font-semibold text-cyan transition-all duration-300 hover:bg-cyan/20 hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                                    >
                                      <span>{trend.aiCounterNarrative}</span>
                                      {copiedId === trend.id ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════════════
                  TAB 3: CREATOR STOCK MARKET
                  ═══════════════════════════════════════════════════════ */}
              {activeTab === "Creator Stock Market" && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Candlestick Chart */}
                  <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-5">
                      <div>
                        <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-cyan" />
                          CREATOR STOCK MARKET: TREND LIFECYCLE & FATIGUE CRASH
                        </h3>
                        <p className="text-xs text-ghost">
                          Observe how content niches peak, hit critical audience fatigue, and trigger sharp crashes.
                        </p>
                      </div>

                      {/* Trend Selector Switcher */}
                      <div className="flex items-center gap-1.5 bg-black p-1 border border-white/5 rounded-lg self-start">
                        {mockTrendsData.map((trend) => (
                          <button
                            key={trend.id}
                            onClick={() => {
                              setSelectedTrendId(trend.id);
                              triggerNotification(`Switched chart model to ${trend.trendName}`);
                            }}
                            className={`rounded-md px-3 py-1.5 text-[10px] font-mono font-semibold transition-all duration-300 ${
                              selectedTrendId === trend.id
                                ? "bg-cyan text-black"
                                : "text-ghost hover:text-white"
                            }`}
                          >
                            {trend.trendName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="relative">
                      <div className="absolute top-2 left-2 z-10 flex items-center gap-2 rounded bg-black/80 border border-cyan/20 px-3 py-1.5 font-mono text-[9px] text-cyan">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                        MODEL: {selectedTrend.trendName.toUpperCase()}
                      </div>

                      <div className="min-h-[380px]">
                        <Chart
                          options={chartOptions}
                          series={chartSeries}
                          type="candlestick"
                          height={380}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Extra Candlestick details panel */}
                  <div className="grid gap-6 md:grid-cols-4">
                    <div className="rounded-xl border border-white/5 bg-black p-4 font-mono text-xs text-center space-y-1">
                      <span className="text-ghost/60 text-[10px] block">PEAK FATIGUE VALUE</span>
                      <span className="text-base font-bold text-cyan">{selectedTrend.fatigueScore} / 100</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black p-4 font-mono text-xs text-center space-y-1">
                      <span className="text-ghost/60 text-[10px] block">VIRALITY SCORE</span>
                      <span className="text-base font-bold text-cyan">{selectedTrend.viralityPrediction}</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black p-4 font-mono text-xs text-center space-y-1">
                      <span className="text-ghost/60 text-[10px] block">REVERSAL VELOCITY</span>
                      <span className="text-base font-bold text-emerald-500">OPTIMAL</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black p-4 font-mono text-xs text-center space-y-1">
                      <span className="text-ghost/60 text-[10px] block">THRESHOLD METRIC</span>
                      <span className="text-base font-bold text-red-500">TRIGGERED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════════════
                  TAB 4: SETTINGS
                  ═══════════════════════════════════════════════════════ */}
              {activeTab === "Settings" && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md space-y-8">
                    <div className="border-b border-white/5 pb-4">
                      <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                        <Sliders className="h-4 w-4 text-cyan" />
                        TACTICAL ENGINE CONFIGURATIONS
                      </h3>
                      <p className="text-xs text-ghost">
                        Configure scanning levels, model metrics, and active notifications triggers.
                      </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                      {/* Left configs */}
                      <div className="space-y-6">
                        {/* Fatigue slider */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-ghost">FATIGUE RADAR ALERTS LIMIT:</span>
                            <span className="text-cyan font-bold">{fatigueThreshold}%</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="95"
                            value={fatigueThreshold}
                            onChange={(e) => {
                              setFatigueThreshold(Number(e.target.value));
                              triggerNotification(`Fatigue threshold alert level shifted to ${e.target.value}%`);
                            }}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan"
                          />
                          <p className="text-[10px] font-mono text-ghost/40">
                            Alerts will only trigger for trends surpassing this target fatigue index level.
                          </p>
                        </div>

                        {/* Model selector */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-ghost block">SENTIMENT LLM ENGINE:</label>
                          <select
                            value={aiModel}
                            onChange={(e) => {
                              setAiModel(e.target.value);
                              triggerNotification(`LLM core swapped to ${e.target.value}`);
                            }}
                            className="w-full rounded-lg border border-white/10 bg-black py-2.5 px-3 text-xs font-mono text-white focus:outline-none focus:border-cyan/30"
                          >
                            <option value="nexus-v4-turbo">nexus-v4-turbo (Reversal optimized)</option>
                            <option value="tfe-gpt-4o">tfe-gpt-4o (Deep listening)</option>
                            <option value="pulse-relevance-v1">pulse-relevance-v1 (Low latency)</option>
                          </select>
                        </div>
                      </div>

                      {/* Right configs */}
                      <div className="space-y-6">
                        {/* Scan intervals */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-ghost block">listening SCAN INTERVAL:</label>
                          <select
                            value={scanInterval}
                            onChange={(e) => {
                              setScanInterval(Number(e.target.value));
                              triggerNotification(`Scan refresh interval set to ${e.target.value}s`);
                            }}
                            className="w-full rounded-lg border border-white/10 bg-black py-2.5 px-3 text-xs font-mono text-white focus:outline-none focus:border-cyan/30"
                          >
                            <option value="1">1 second (High priority)</option>
                            <option value="3">3 seconds (Standard telemetry)</option>
                            <option value="5">5 seconds (Battery saver)</option>
                            <option value="10">10 seconds (Lazy listen)</option>
                          </select>
                        </div>

                        {/* Audio Notification alerts */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <div className="space-y-1">
                            <span className="text-xs font-mono text-ghost block">TACTICAL AUDIO ALERTS</span>
                            <span className="text-[10px] font-mono text-ghost/40">Enable warning audio chimes during critical fatigue spikes</span>
                          </div>
                          <button
                            onClick={() => {
                              setAudioAlerts(!audioAlerts);
                              triggerNotification(`Audio warnings ${!audioAlerts ? "enabled" : "disabled"}`);
                            }}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
                              audioAlerts
                                ? "bg-cyan/10 border-cyan/30 text-cyan shadow-[0_0_10px_rgba(0,255,255,0.15)]"
                                : "bg-white/[0.01] border-white/5 text-ghost"
                            }`}
                          >
                            {audioAlerts ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-6 px-6 mt-12 bg-black">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ghost/40">
                <span className="font-mono">© 2026 Trend Fatigue Engine AI — Tactical Terminal v4.6</span>
                <span className="font-mono">ENCRYPTED CONNECT: SSL/AES-256</span>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
