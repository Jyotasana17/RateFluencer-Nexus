"use client";

import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090716] text-[#f1f0f7] font-sans antialiased flex flex-col items-center justify-center p-6 relative bg-dot-pattern">
      {/* Liquid background blobs */}
      <div className="liquid-bg-container" aria-hidden="true">
        <div className="liquid-blob blob-purple" style={{ top: "20%", left: "10%" }} />
        <div className="liquid-blob blob-blue" style={{ bottom: "20%", right: "10%" }} />
      </div>

      <div className="max-w-md w-full text-center space-y-8 glass-panel-heavy rounded-xl p-8 sm:p-10 border border-white/10 shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-transparent" />
        
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
          <Activity className="h-7 w-7 animate-radar" />
        </div>

        <div className="space-y-3">
          <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest block">
            ERROR 404 // COGNITIVE BURNOUT
          </span>
          <h1 className="font-hanken font-bold text-3xl text-white tracking-tight leading-tight">
            Vector Not Found
          </h1>
          <p className="font-sans text-xs leading-relaxed text-[#a6a3bf]">
            The attention coordinate you are seeking is outside the active telemetry spectrum or has hit critical fatigue saturation.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex w-full h-11 bg-brand-gradient hover:shadow-button-glow text-white font-bold rounded-lg text-xs items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 active:scale-95"
        >
          <span>Return to Telemetry Root</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
