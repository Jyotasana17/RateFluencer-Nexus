"use client";

import React from "react";
import {
  Sliders,
  Volume2,
  VolumeX,
  Cpu,
  RefreshCw,
  Bell
} from "lucide-react";
import { useNexusStore } from "@/lib/store";

export default function SettingsPage() {
  const {
    fatigueThreshold,
    setFatigueThreshold,
    audioAlerts,
    setAudioAlerts,
    scanInterval,
    setScanInterval,
    aiModel,
    setAiModel
  } = useNexusStore();

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight md:text-2xl uppercase">
          Tactical Configurations
        </h2>
        <p className="text-xs text-ghost">
          Configure scanning sensitivity parameters, custom alert thresholds, and preferred NLP sentiment models.
        </p>
      </div>

      {/* Configurations Panel */}
      <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md space-y-8">
        <div className="border-b border-white/5 pb-4">
          <h3 className="text-sm font-bold tracking-tight flex items-center gap-2 font-mono">
            <Sliders className="h-4 w-4 text-cyan" />
            CORE SETTINGS CONTROL PANEL
          </h3>
          <span className="text-[10px] font-mono text-ghost/40">SYSTEM ADJUSTMENT MATRIX</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Configuration Column */}
          <div className="space-y-6">
            {/* Fatigue Slider metric */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ghost">FATIGUE ALERT THRESHOLD:</span>
                <span className="text-cyan font-bold">{fatigueThreshold}% Burnout</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={fatigueThreshold}
                onChange={(e) => setFatigueThreshold(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <p className="text-[10px] font-mono text-ghost/40 leading-relaxed">
                Critical warnings will only flag trends surpassing this target fatigue burnout score globally.
              </p>
            </div>

            {/* AI Model selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-ghost block flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-cyan" />
                SENTIMENT LLM ENGINE:
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black py-2.5 px-3 text-xs font-mono text-white focus:outline-none focus:border-cyan/30"
              >
                <option value="nexus-v4-turbo">nexus-v4-turbo (Reversal optimized)</option>
                <option value="tfe-gpt-4o">tfe-gpt-4o (Deep listening)</option>
                <option value="pulse-relevance-v1">pulse-relevance-v1 (Low latency)</option>
              </select>
              <p className="text-[10px] font-mono text-ghost/40 leading-relaxed">
                Configures the target linguistic pipeline model used to process social comments and compute sentiments.
              </p>
            </div>
          </div>

          {/* Right Configuration Column */}
          <div className="space-y-6">
            {/* Listening scan intervals */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-ghost block flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-cyan" />
                TELEMETRY SCAN MATRIX INTERVAL:
              </label>
              <select
                value={scanInterval}
                onChange={(e) => setScanInterval(Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-black py-2.5 px-3 text-xs font-mono text-white focus:outline-none focus:border-cyan/30"
              >
                <option value="1">1 second (High priority scan)</option>
                <option value="3">3 seconds (Standard telemetry)</option>
                <option value="5">5 seconds (Low bandwidth)</option>
                <option value="10">10 seconds (Lazy listening)</option>
              </select>
              <p className="text-[10px] font-mono text-ghost/40 leading-relaxed">
                Controls the refresh rate on social listening feeds and simulation log tickers.
              </p>
            </div>

            {/* Auditory Warnings toggle */}
            <div className="flex items-center justify-between border-t border-white/5 pt-5">
              <div className="space-y-1 pr-4">
                <span className="text-xs font-mono text-ghost block flex items-center gap-1.5">
                  <Bell className="h-3.5 w-3.5 text-cyan" />
                  TACTICAL AUDIO WARNINGS
                </span>
                <span className="text-[10px] font-mono text-ghost/40 leading-relaxed block">
                  Enable warning sound cues during sudden trend burnout anomalies.
                </span>
              </div>
              <button
                onClick={() => setAudioAlerts(!audioAlerts)}
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
  );
}
