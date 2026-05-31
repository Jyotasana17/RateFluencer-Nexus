"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Lock,
  RefreshCw,
  ArrowRight,
  Terminal,
  LogOut
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
      triggerNotification("Secured Connection Established. Tactical overview loaded.");
    }, 350);
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
    triggerNotification("Session terminated safely.");
  };

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
            TACTICAL LOCK SCREEN (BATMAN STYLE)
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
            SECURED DASHBOARD CORE SHELL
            ═══════════════════════════════════════════════════════ */
        <main className="mesh-bg min-h-screen pb-28 text-white">
          <div className="pointer-events-none fixed inset-0 panel-grid opacity-25" aria-hidden="true" />
          
          {/* Top header navigation details */}
          <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8 border-b border-white/5 bg-[#050505]/40 backdrop-blur-md">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyan/30 bg-cyan/10 text-cyan shadow-cyan">
                <Sparkles className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-[0.24em]">RATEFLUENCER</span>
                <span className="block text-xs text-ghost">Nexus Command Layer</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-mono text-cyan sm:flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                Live tactical stream active
              </div>
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-ghost hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Disconnect Node</span>
              </button>
            </div>
          </header>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>

          {/* Persistent interactive floating glass bottom dock */}
          <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto max-w-[calc(100%-1.5rem)] px-2 sm:max-w-fit" aria-label="Dashboard navigation">
            <div className="glass mx-auto flex items-center gap-1 overflow-x-auto rounded-full p-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => triggerNotification(`Accessing secure node: ${item.label}`)}
                    className={cn(
                      "relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-medium text-ghost transition hover:text-white sm:px-4",
                      active && "text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute inset-0 rounded-full bg-white/12 shadow-[0_0_30px_rgba(0,229,255,.25)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                      />
                    )}
                    <Icon className="relative h-4 w-4" />
                    <span className="relative hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </main>
      )}
    </div>
  );
}
