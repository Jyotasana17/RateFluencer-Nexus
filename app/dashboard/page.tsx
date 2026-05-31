"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Sparkles,
  Terminal,
  Cpu,
  Shield,
  Compass
} from "lucide-react";
import mockTrendsData from "../../mockTrends.json";
import { useNexusStore } from "@/lib/store";

export default function OverviewPage() {
  const { fatigueThreshold, aiModel, scanInterval } = useNexusStore();
  
  // Terminal logs simulation
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS: System integrity check completed [OK]",
    "NET: Connected to social listening matrix node #14",
    "TFE: Deep NLP sentiment processor initialised successfully",
    "SEC: AES-256 tactical tunnel established on Port 2244"
  ]);

  useEffect(() => {
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
  }, []);

  const criticalAlertsCount = mockTrendsData.filter(
    (t) => t.fatigueScore >= fatigueThreshold
  ).length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight md:text-2xl uppercase">
          AI Command Center
        </h2>
        <p className="text-xs text-ghost">
          System status dashboard & operational node telemetry.
        </p>
      </div>

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
            {criticalAlertsCount}
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

      {/* Diagnostic details panel */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left diagnostic */}
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

        {/* Right diagnostic */}
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
  );
}
