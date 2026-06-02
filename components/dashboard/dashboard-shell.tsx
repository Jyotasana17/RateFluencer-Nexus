"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Lock,
  RefreshCw,
  ArrowRight,
  Terminal,
  LogOut,
  ChevronDown
} from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useNexusStore } from "@/lib/store";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, setIsAuthenticated } = useNexusStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulation notification system
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
      triggerNotification("Secured Connection Established. Welcome back.");
    }, 350);
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
    triggerNotification("Session terminated safely.");
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#AEF597]/30 selection:text-white overflow-x-hidden font-sans bg-[#050505]">
      
      {/* 2D LIQUID METABALL BACKGROUND */}
      <div className="liquid-bg-container" aria-hidden="true" style={{ opacity: 0.05 }} />

      {/* Dynamic Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {notifications.map((note, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-[#0A0A0A]/95 border border-white/10 text-[#f1f0f7] rounded-xl px-4 py-3 shadow-2xl animate-fade-in-up backdrop-blur-md"
          >
            <Terminal className="h-4 w-4 text-[#AEF597] shrink-0 animate-pulse" />
            <span className="text-xs font-mono tracking-tight">{note}</span>
          </div>
        ))}
      </div>

      {!isAuthenticated ? (
        /* ═══════════════════════════════════════════════════════
            SECURED LOGIN SCREEN - Custom Luxury Cyber Command Login
            ═══════════════════════════════════════════════════════ */
        <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#050505] bg-dot-pattern px-6">
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#0A0A0A] border border-white/10 p-8 text-center shadow-2xl animate-fade-in-up">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#AEF597]/15 border border-[#AEF597]/25 text-[#AEF597]">
              <Lock className="h-6 w-6" />
            </div>

            <h1 className="mb-2 text-2xl font-black tracking-tight text-white font-hanken">
              RateFluencer <span className="text-[#AEF597] font-black">AI</span>
            </h1>
            <p className="mb-8 text-[9px] font-bold text-[#a6a3bf] uppercase tracking-widest font-mono">
              Admin intelligence Command Center
            </p>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gradient hover:shadow-button-glow text-slate-950 font-bold py-3.5 text-xs transition-all duration-300 disabled:opacity-50 active:scale-95 uppercase tracking-wider shadow-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                  <span>Calibrating Entrance...</span>
                </>
              ) : (
                <>
                  <span>Enter Command Center</span>
                  <ArrowRight className="h-4 w-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════
            SECURED DASHBOARD CORE SHELL - BATMAN TECH SAAS INTERFACE
            ═══════════════════════════════════════════════════════ */
        <main className="min-h-screen bg-[#050505] bg-dot-pattern flex text-[#f1f0f7] font-sans antialiased overflow-hidden relative">
          
          {/* Left Sidebar Layout */}
          <aside className="w-[280px] bg-[#0A0A0A] border-r border-white/5 flex flex-col justify-between shrink-0 h-screen select-none relative z-10">
            <div className="flex flex-col overflow-y-auto flex-1 py-6">
              
              {/* Brand Header */}
              <div className="px-6 mb-8">
                <Link href="/dashboard" className="flex items-center gap-3 group select-none">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#AEF597] to-[#A8F690] text-slate-950 shadow-md font-bold transition-transform group-hover:scale-105 duration-200">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-black tracking-tight text-white leading-tight font-hanken">RateFluencer</span>
                    <span className="block text-[9px] font-bold text-[#AEF597] uppercase tracking-widest font-mono mt-0.5">Fatigue Engine</span>
                  </div>
                </Link>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-1.5 px-3">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => triggerNotification(`Accessing: ${item.label}`)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 relative font-mono",
                        active
                          ? "bg-[#AEF597] text-slate-950 shadow-[0_0_15px_rgba(174,245,151,0.35)] font-black"
                          : "text-[#B3B3B3] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-slate-950" : "text-[#6B7280]")} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Bottom widgets */}
            <div className="p-4 border-t border-white/5 shrink-0 bg-[#0A0A0A]">
              {/* Creator Card */}
              <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl p-3 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#AEF597]/15 text-[#AEF597] border border-[#AEF597]/10 text-xs font-bold font-mono">
                    CR
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Creator</span>
                    <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-[#AEF597] mt-0.5 uppercase tracking-wide bg-[#AEF597]/10 px-1 py-0.5 rounded border border-[#AEF597]/10">
                      Free Plan
                    </span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </aside>

          {/* Right Main Panel */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
            {/* Top Navigation Bar */}
            <header className="h-20 bg-[#050505] border-b border-white/5 px-8 flex items-center justify-between shrink-0 select-none">
              
              <div className="flex items-center gap-3">
                <div className="text-xs font-bold text-white font-mono uppercase tracking-widest">
                  Workspace Panel // <span className="text-[#B3B3B3]">Admin Intelligence Command Center</span>
                </div>
                
                {/* Admin Active Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-950/40 border border-red-500/20 text-red-500 rounded-md text-[9px] font-black tracking-widest font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-550 animate-ping shrink-0" />
                  <span>ADMIN PRIVILEGES ACTIVE</span>
                </div>
              </div>

              {/* Scrolling dying-trends ticker */}
              <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8 overflow-hidden h-8 border border-white/5 bg-black/40 rounded-md relative select-none">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="animate-marquee inline-flex gap-8 items-center text-[9px] font-bold font-mono text-[#6B7280] uppercase">
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> Faceless AI Reels (-82%)</span>
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> Sigma Male Edits (-94%)</span>
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> 5AM Routines (-71%)</span>
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> AI Guru Content (-88%)</span>
                  {/* Duplicate for infinite seamless scroll */}
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> Faceless AI Reels (-82%)</span>
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> Sigma Male Edits (-94%)</span>
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> 5AM Routines (-71%)</span>
                  <span className="flex items-center gap-1 text-red-500 font-extrabold"><span className="text-xs">↓</span> AI Guru Content (-88%)</span>
                </div>
              </div>

              {/* Right Utility Icons */}
              <div className="flex items-center gap-4">
                {/* Disconnect Shell button */}
                <button
                  onClick={handleDisconnect}
                  className="h-10 px-4 bg-red-650/10 hover:bg-red-650/20 text-red-550 border border-red-500/20 hover:border-red-500/40 transition-all rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 font-mono"
                >
                  <LogOut className="h-3.5 w-3.5 text-red-550" />
                  <span>Disconnect</span>
                </button>
              </div>
            </header>

            {/* Scrollable Dashboard Page Content */}
            <div className="flex-1 overflow-y-auto bg-transparent p-8 pb-12">
              {children}
            </div>

            {/* Sticky System Telemetry Footer */}
            <footer className="h-10 bg-[#0A0A0A] border-t border-white/5 px-6 flex items-center justify-between shrink-0 text-[9px] font-mono text-[#6B7280] select-none">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold text-[#6B7280]">SYSTEM STATUS:</span>
                <span className="flex items-center gap-1 text-[#AEF597] font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEF597] animate-pulse shrink-0" />
                  OPERATIONAL
                </span>
                
                {/* Animated Green Oscilloscope SVG Waveform */}
                <div className="w-24 h-4 flex items-center justify-center overflow-hidden opacity-85 ml-2">
                  <svg className="w-full h-full stroke-[#AEF597] fill-none" viewBox="0 0 100 20">
                    <path
                      d="M0,10 L30,10 L35,2 L40,18 L45,10 L50,10 L52,5 L54,15 L56,10 L70,10 L75,10 L100,10"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-heartbeat"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div>
                  <span className="text-[#6B7280]">DATA FEED: </span>
                  <span className="text-[#AEF597] font-extrabold uppercase animate-pulse">LIVE</span>
                </div>
                
                <div>
                  <span className="text-[#6B7280]">ENGINE: </span>
                  <span className="text-white font-extrabold">TREND FATIGUE AI v2.7</span>
                </div>
                
                <div>
                  <span className="text-[#6B7280]">UPTIME: </span>
                  <span className="text-[#AEF597] font-extrabold">47D 23H 19M</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-[#AEF597]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-white font-extrabold uppercase">AES-256</span>
                </div>
              </div>
            </footer>
          </div>
        </main>
      )}
    </div>
  );
}
