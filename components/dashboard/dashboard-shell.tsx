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
    <div className="relative min-h-screen text-slate-800 selection:bg-indigo-50 selection:text-indigo-600 overflow-x-hidden font-sans">
      {/* Dynamic Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {notifications.map((note, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white border border-slate-100 text-slate-700 rounded-lg px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] animate-fade-in-up"
          >
            <Terminal className="h-4 w-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-medium tracking-tight">{note}</span>
          </div>
        ))}
      </div>

      {!isAuthenticated ? (
        /* ═══════════════════════════════════════════════════════
            SECURED LOGIN SCREEN - Apple-like Minimal Light Theme
            ═══════════════════════════════════════════════════════ */
        <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#FCFCFD] px-6">
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Lock className="h-6 w-6" />
            </div>

            <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900">
              Trend Fatigue Engine AI
            </h1>
            <p className="mb-8 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Creator Dashboard Entrance
            </p>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-indigo-500 shadow-sm disabled:opacity-50 active:scale-95 uppercase tracking-wider"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Entering System...</span>
                </>
              ) : (
                <>
                  <span>Creator Login</span>
                  <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <div className="mt-6">
              <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors duration-200">
                ← Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════
            SECURED DASHBOARD CORE SHELL - EXTREMELY CLEAN & MINIMAL LIGHT THEME
            ═══════════════════════════════════════════════════════ */
        <main className="min-h-screen bg-[#F8F9FD] flex text-slate-800 font-sans antialiased overflow-hidden">
          {/* Left Sidebar Layout */}
          <aside className="w-[280px] bg-white border-r border-[#E2E8F0] flex flex-col justify-between shrink-0 h-screen select-none">
            <div className="flex flex-col overflow-y-auto flex-1 py-6">
              {/* Brand Header */}
              <div className="px-6 mb-8">
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-9 4 18 3-13 4 4" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold tracking-tight text-slate-900 leading-tight">WaveShift AI</span>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Fatigue Engine</span>
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
                      onClick={() => triggerNotification(`Loading: ${item.label}`)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200",
                        active
                          ? "bg-[#EEF2FF] text-[#4F46E5] shadow-sm font-extrabold"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-[#4F46E5]" : "text-slate-400")} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Bottom widgets */}
            <div className="p-4 border-t border-[#F1F5F9] shrink-0 bg-white">
              {/* Creator Card */}
              <div className="flex items-center justify-between bg-[#F8F9FD] border border-[#E9EEF5] rounded-2xl p-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold font-mono">
                    CR
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Creator</span>
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide bg-slate-100 px-1 py-0.5 rounded-md border border-slate-200/50">
                      Free Plan
                    </span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          </aside>

          {/* Right Main Panel */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="h-20 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between shrink-0 select-none">
              <div className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Workspace Panel
              </div>

              {/* Right Utility Icons */}
              <div className="flex items-center gap-4">
                {/* Disconnect Shell button */}
                <button
                  onClick={handleDisconnect}
                  className="h-10 px-4 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 border border-rose-100 transition-all rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </header>

            {/* Scrollable Dashboard Page Content */}
            <div className="flex-1 overflow-y-auto bg-[#F8F9FD] p-8">
              {children}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
