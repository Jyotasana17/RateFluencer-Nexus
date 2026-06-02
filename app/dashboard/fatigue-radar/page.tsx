"use client";

import React, { useState, useEffect } from "react";
import {
  Skull,
  Search,
  Sparkles,
  Terminal,
  Copy,
  Check,
  Cpu,
  RefreshCw
} from "lucide-react";
import { useNexusStore } from "@/lib/store";

interface TrendData {
  id: string;
  trendName: string;
  status: string;
  fatigueScore: number;
  sentiment: string[];
  aiCounterNarrative: string;
  viralityPrediction: string;
  hooks: string[];
  
  // Instant visual feedback fields
  clicheAvoid: string;
  freshPivot: string;
  audienceBacklash: string;
  saturationDensity: string;
  creatorDirective: string;
}

const COPY_FEEDBACK_MS = 900;
const GENERATION_LOG_INTERVAL_MS = 150;

export default function FatigueRadarPage() {
  const { fatigueThreshold } = useNexusStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom Trend Analysis inputs
  const [customTrend, setCustomTrend] = useState<string>("");
  
  // Workspace active item
  const [selectedTrend, setSelectedTrend] = useState<TrendData | null>(null);
  
  // Generator/Terminal states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);

  // Active 2026 Trend Fatigue Vectors
  const [trendsList, setTrendsList] = useState<TrendData[]>([
    {
      id: "t1",
      trendName: "Faceless AI Slop & Cash-Cow Channels",
      status: "Critical Fatigue",
      fatigueScore: 94,
      sentiment: ["robotic", "low effort", "fake", "spam"],
      aiCounterNarrative: "The Human Restitution: Why Creators are Banning AI to Reclaim Real Trust",
      viralityPrediction: "98%",
      hooks: [
        "Why I deleted my 100k follower 'faceless AI' channel this morning.",
        "The AI content gold rush is officially dead: here is the data.",
        "How to spot an AI-written script in 3 seconds (and why viewers swipe away)."
      ],
      clicheAvoid: "Generating generic ChatGPT-scripted videos using stock AI avatars and robotic clone voiceovers.",
      freshPivot: "Creating real, raw behind-the-scenes vlogs showing actual engineering, manual design, or founder diaries.",
      audienceBacklash: "CRITICAL (94%)",
      saturationDensity: "98%",
      creatorDirective: "Instantly banish AI voice clones. Show your real face or voice to salvage organic reach collapse."
    },
    {
      id: "t2",
      trendName: "Performative Vulnerability (LinkedIn Cry Selfies)",
      status: "Critical Fatigue",
      fatigueScore: 89,
      sentiment: ["cringe", "narcissistic", "performative", "oversharing"],
      aiCounterNarrative: "The Rise of Silent Competence: Why Bragging About Failure is the New Vanity",
      viralityPrediction: "92%",
      hooks: [
        "Please stop crying on LinkedIn for clicks: it is getting weird.",
        "Why 'building in quiet' beats performative failure oversharing every single time.",
        "The anatomy of a staged trauma-post (and the silent backlash it creates)."
      ],
      clicheAvoid: "Staging photos of yourself crying or writing over-dramatized essays about micro-failures to farm engagement.",
      freshPivot: "Sharing raw business margins, precise spreadsheet screenshots, or practical developer logs without self-praise.",
      audienceBacklash: "SEVERE (89%)",
      saturationDensity: "92%",
      creatorDirective: "Transition from 'crying about failure' to 'quiet competence'. Show proof of work, not tears."
    },
    {
      id: "t3",
      trendName: "Staged 'Casual' Photo Dumps",
      status: "High Fatigue",
      fatigueScore: 82,
      sentiment: ["manipulative", "staged", "exhausting", "fake-casual"],
      aiCounterNarrative: "The Curated Mess: Deconstructing the Spontaneous Photo Dump Illusion",
      viralityPrediction: "86%",
      hooks: [
        "I spent 2 hours staging a 'spontaneous' photo dump to prove a point.",
        "Why Gen Z is getting exhausted by 'carefully uncurated' feeds.",
        "The death of the aesthetic: what actually happens when we stop trying to look casual."
      ],
      clicheAvoid: "Carefully curating photos that pretend to look spontaneous, messy, or casual to fit the Gen-Z aesthetic.",
      freshPivot: "Posting high-density technical screenshots, book excerpts, or unfiltered physical workspace layouts.",
      audienceBacklash: "HIGH (82%)",
      saturationDensity: "86%",
      creatorDirective: "Discard aesthetic curation. Post real-time work environments, diagrams, or useful reference code."
    },
    {
      id: "t4",
      trendName: "\"Unhinged\" Brand Accounts & Shock-Value Comments",
      status: "High Fatigue",
      fatigueScore: 78,
      sentiment: ["forced", "cringe", "corporate", "trying too hard"],
      aiCounterNarrative: "Why 'Unhinged' Corporate Brands are the New Digital Boardroom Cringe",
      viralityPrediction: "84%",
      hooks: [
        "Corporate accounts trying to act like unhinged teenagers are officially over.",
        "How shock-value brand marketing lost its soul in 2026.",
        "The brands winning right now are the ones who just talk like normal humans."
      ],
      clicheAvoid: "Corporate accounts typing lowercase replies, using teenage internet slang, or seeking shock value under popular posts.",
      freshPivot: "Publishing insightful technical micro-breakdowns, architectural designs, or helpful, mature industry advice.",
      audienceBacklash: "HIGH (78%)",
      saturationDensity: "84%",
      creatorDirective: "Ditch corporate meme attempts. Win by talking like a competent, clear human operator."
    },
    {
      id: "t5",
      trendName: "Diluted Instagram 'Close Friends' Broadcasting",
      status: "Moderate Fatigue",
      fatigueScore: 72,
      sentiment: ["noisy", "spammy", "fake-exclusive", "unsolicited"],
      aiCounterNarrative: "Why I Nuked My 500-Person 'Close Friends' List & Swapped to Real Privacy",
      viralityPrediction: "79%",
      hooks: [
        "Your 'Close Friends' list is just another public feed with worse lighting.",
        "Why I deleted 400 people from my private circle and what happened to my sanity.",
        "True digital connection is moving away from the social feed entirely."
      ],
      clicheAvoid: "Using 'Close Friends' stories as a secondary public broadcast channel to sell courses or soft-promo products.",
      freshPivot: "Shifting key conversations to deep-dive newsletters, direct email lines, or true private micro-communities.",
      audienceBacklash: "ELEVATED (72%)",
      saturationDensity: "79%",
      creatorDirective: "Stop spamming close friends. Deliver high-value long-form letters or real 1-on-1 private links."
    }
  ]);

  // Set the first trend as default selection on mount
  useEffect(() => {
    if (trendsList.length > 0 && !selectedTrend) {
      setSelectedTrend(trendsList[0]);
    }
  }, [trendsList, selectedTrend]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), COPY_FEEDBACK_MS);
  };

  // Simulate LLM Suggestion generation process with terminal logs for recalibration
  const triggerReversalGeneration = () => {
    if (!selectedTrend) return;
    
    setIsGenerating(true);
    setGenerationLogs([]);

    const logSequence = [
      "ESTABLISHING: secure socket to social matrix indices...",
      "FETCHING: raw comment sentiment arrays...",
      "CALCULATING: burnout parameters against 2026 models...",
      "SYNTHESIZING: tactical creator pivot directives...",
      "SUCCESS: dynamic counter-strategy telemetry compiled successfully."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSequence.length) {
        setGenerationLogs((prev) => [...prev, logSequence[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
        }, 300);
      }
    }, GENERATION_LOG_INTERVAL_MS);
  };

  const handleCustomTrendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTrend.trim()) return;

    // Create a new analyzed trend on-the-fly to populate the radar!
    const score = Math.floor(Math.random() * 20) + 76; // Generate highly realistic high fatigue score
    const cleanTrend = customTrend.trim();
    
    const newTrend: TrendData = {
      id: `custom_${Date.now()}`,
      trendName: cleanTrend,
      status: score >= fatigueThreshold ? "Critical Fatigue" : "High Fatigue",
      fatigueScore: score,
      sentiment: ["oversaturated", "repetitive", "annoying", "tired"],
      aiCounterNarrative: `Disrupting the "${cleanTrend}" Wave: An Honest & Unfiltered Creator Blueprint`,
      viralityPrediction: `${Math.floor(Math.random() * 10) + 88}%`,
      hooks: [
        `Why I am officially quitting the "${cleanTrend}" trend.`,
        `The uncomfortable truth about "${cleanTrend}" nobody wants to admit.`,
        `How the "${cleanTrend}" wave is actually ruining your audience engagement.`
      ],
      clicheAvoid: `Churning out standard, repetitive ${cleanTrend} posts that replicate existing viral formulas without original value.`,
      freshPivot: `Pivoting to high-density operational breakdowns, authentic failures, or unique technical telemetry of ${cleanTrend}.`,
      audienceBacklash: score >= 90 ? "CRITICAL" : "HIGH",
      saturationDensity: `${score + 2}%`,
      creatorDirective: `Break the ${cleanTrend} mold. Introduce hard empirical data or raw personal accountability to bypass viewer fatigue.`
    };

    setTrendsList((prev) => [newTrend, ...prev]);
    setSelectedTrend(newTrend);
    setCustomTrend("");
    setGenerationLogs([]);
  };

  const filteredTrends = trendsList.filter(
    (t) =>
      t.trendName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.aiCounterNarrative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in-up text-[#B3B3B3] font-mono">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-black tracking-wider text-white uppercase font-mono">
          Fatigue Radar Workspace
        </h2>
        <p className="text-xs font-semibold text-[#6B7280]">
          Direct counter-narratives calculated from active fatigue indices. Select or input a trend to inspect action plans instantly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
        {/* Left Side: Saturated Trends Radar Feed */}
        <div className="space-y-6">
          {/* Search and custom input */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 h-4 w-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="FILTER ACTIVE SATURATED VECTORS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-[#0A0A0A] py-2.5 pr-4 pl-10 text-xs font-bold text-white placeholder-white/20 focus:border-[#AEF597]/40 focus:outline-none focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] transition-all uppercase"
              />
            </div>
            
            <form onSubmit={handleCustomTrendSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="ANALYZE CUSTOM WAVE..."
                value={customTrend}
                onChange={(e) => setCustomTrend(e.target.value)}
                className="min-w-[200px] rounded-xl border border-white/5 bg-[#0A0A0A] px-4 py-2.5 text-xs font-bold text-white placeholder-white/20 focus:border-[#AEF597]/40 focus:outline-none focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] transition-all uppercase"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-brand-gradient hover:shadow-button-glow px-4 py-2.5 text-xs font-black text-slate-950 transition-all active:scale-95 shrink-0"
              >
                <Cpu className="h-3.5 w-3.5 text-slate-950 animate-pulse" />
                <span>ANALYZE</span>
              </button>
            </form>
          </div>

          {/* Saturated Feed List */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.005] rounded-full blur-xl pointer-events-none" />
            
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xs font-black tracking-wider flex items-center gap-2 text-white">
                <Skull className="h-4 w-4 text-[#AEF597] animate-pulse" />
                ACTIVE BURNOUT RADAR FEED
              </h3>
              <span className="text-[9px] font-extrabold text-[#AEF597] bg-[#AEF597]/10 px-2 py-0.5 rounded border border-[#AEF597]/20 uppercase tracking-widest animate-pulse">REAL-TIME</span>
            </div>

            <div className="space-y-4">
              {filteredTrends.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-[#6B7280] uppercase">
                  No saturated vectors found matching your filter criteria.
                </div>
              ) : (
                filteredTrends.map((trend) => {
                  const isSelected = selectedTrend?.id === trend.id;
                  const isHighFatigue = trend.fatigueScore >= fatigueThreshold;
                  
                  return (
                    <div
                      key={trend.id}
                      onClick={() => {
                        setSelectedTrend(trend);
                        setGenerationLogs([]);
                      }}
                      className={`group rounded-xl border p-5 cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-[#AEF597]/5 border-[#AEF597]/30 shadow-[0_0_15px_rgba(174,245,151,0.04)]"
                          : "bg-black/40 border border-white/5 hover:border-[#AEF597]/20 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-white group-hover:text-[#AEF597] transition-colors uppercase tracking-wide">
                            {trend.trendName}
                          </h4>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span
                              className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                isHighFatigue
                                  ? "text-red-500 border-red-500/20 bg-red-950/20"
                                  : "text-[#AEF597] border-[#AEF597]/20 bg-[#AEF597]/10"
                              }`}
                            >
                              {isHighFatigue ? "Critical Fatigue" : trend.status}
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                              {trend.sentiment.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[8px] font-extrabold text-[#6B7280] bg-black/40 rounded px-2 py-0.5 border border-white/5 uppercase tracking-wide"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Progress meter */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex flex-col items-end font-mono">
                            <span className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">FATIGUE INDEX</span>
                            <span
                              className={`text-sm font-black tracking-tight ${
                                isHighFatigue ? "text-red-500" : "text-[#AEF597]"
                              }`}
                            >
                              {trend.fatigueScore} / 100
                            </span>
                          </div>
                          
                          <div className="h-11 w-2 rounded bg-black/60 overflow-hidden relative border border-white/5 p-[1px]">
                            <div
                              className={`absolute bottom-[1px] inset-x-[1px] rounded transition-all duration-300 ${
                                isHighFatigue
                                  ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)] animate-pulse"
                                  : "bg-[#AEF597]"
                              }`}
                              style={{ height: `${trend.fatigueScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Tactical Reversal Lab */}
        <div className="space-y-6">
          <div className="glass-panel rounded-[20px] p-6 shadow-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden flex flex-col min-h-[500px]">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
            
            <div className="border-b border-white/5 pb-4 mb-5 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-black tracking-wider flex items-center gap-2 text-white">
                  <Sparkles className="h-4 w-4 text-[#AEF597]" />
                  TACTICAL REVERSAL LAB
                </h3>
                <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest mt-1 font-mono">
                  Instant Creator Actions & Pivots
                </p>
              </div>
              <span className="text-[8px] font-extrabold text-[#AEF597] bg-[#AEF597]/10 px-2 py-0.5 rounded border border-[#AEF597]/20 uppercase tracking-widest animate-pulse">ACTIVE ENGINE</span>
            </div>

            {selectedTrend ? (
              <div className="flex-grow flex flex-col justify-between space-y-6">
                
                {/* 1. Target Vector & Metrics Banner */}
                <div className="rounded-xl bg-black/40 border border-white/5 p-4 space-y-3 relative overflow-hidden">
                  <span className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest block font-mono">
                    TARGET SATURATED VECTOR
                  </span>
                  <h4 className="text-xs font-black text-white leading-normal uppercase tracking-wide">
                    {selectedTrend.trendName}
                  </h4>
                  
                  {/* Rapid Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-center">
                    <div className="bg-black/50 rounded-lg p-2 border border-white/5">
                      <span className="text-[8px] font-bold text-[#6B7280] block uppercase">FATIGUE</span>
                      <span className="text-xs font-black text-red-500">{selectedTrend.fatigueScore}/100</span>
                    </div>
                    <div className="bg-black/50 rounded-lg p-2 border border-white/5">
                      <span className="text-[8px] font-bold text-[#6B7280] block uppercase">SATURATION</span>
                      <span className="text-xs font-black text-red-400">{selectedTrend.saturationDensity}</span>
                    </div>
                    <div className="bg-black/50 rounded-lg p-2 border border-white/5">
                      <span className="text-[8px] font-bold text-[#6B7280] block uppercase">VIRALITY PILL</span>
                      <span className="text-xs font-black text-[#AEF597]">{selectedTrend.viralityPrediction}</span>
                    </div>
                  </div>
                </div>

                {/* 2. INSTANT CREATOR CHEAT SHEET (AVOID vs EMBRACE Split Panel) */}
                <div className="space-y-2">
                  <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider font-mono">
                    ⚡ INSTANT CREATOR DIRECTIVE
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* AVOID (Red Border Card) */}
                    <div className="rounded-xl border border-red-500/20 bg-red-950/5 p-3.5 space-y-1.5 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase tracking-wider">
                        <span>❌ AVOID CLICHÉ</span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-[#B3B3B3] font-mono">
                        {selectedTrend.clicheAvoid}
                      </p>
                    </div>

                    {/* EMBRACE (Green Border Card) */}
                    <div className="rounded-xl border border-[#AEF597]/25 bg-[#AEF597]/[0.02] p-3.5 space-y-1.5 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-[#AEF597] uppercase tracking-wider">
                        <span>✅ EMBRACE PIVOT</span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-white font-mono font-bold">
                        {selectedTrend.freshPivot}
                      </p>
                    </div>
                  </div>
                  
                  {/* Creator Action Banner */}
                  <div className="rounded-lg bg-black/60 border border-white/5 p-3 text-[10px] leading-relaxed text-[#B3B3B3]">
                    <span className="font-extrabold text-[#AEF597] uppercase tracking-wider block mb-1">PRO DIRECTIVE:</span>
                    {selectedTrend.creatorDirective}
                  </div>
                </div>

                {/* 3. Disruptive Narrative & Script Hooks */}
                <div className="space-y-4 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-widest block mb-1 font-mono">
                      RECOMMENDED COUNTER-NARRATIVE ANGLE
                    </span>
                    <div className="bg-[#AEF597]/5 border border-[#AEF597]/20 rounded-xl p-3.5 text-xs text-white font-black leading-relaxed">
                      {selectedTrend.aiCounterNarrative}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-widest block font-mono">
                      HIGH-VIRALITY SCRIPT HOOKS (CLICK TO COPY)
                    </span>
                    
                    <div className="space-y-2">
                      {selectedTrend.hooks.map((hook, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-3 bg-black/40 border border-white/5 hover:border-[#AEF597]/20 rounded-xl p-3 group/hook transition-all duration-150"
                        >
                          <span className="text-[11px] text-white leading-normal font-sans tracking-wide italic font-bold">
                            &ldquo;{hook}&rdquo;
                          </span>
                          <button
                            onClick={() => copyToClipboard(hook, `${selectedTrend.id}_h_${i}`)}
                            className="rounded-lg p-1 text-[#6B7280] hover:text-[#AEF597] hover:bg-white/5 transition-all shrink-0"
                            title="Copy hook to clipboard"
                          >
                            {copiedId === `${selectedTrend.id}_h_${i}` ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 transition-transform group-hover/hook:scale-105" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Telemetry Calibration simulator */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  {isGenerating ? (
                    <div className="rounded-xl bg-black/80 border border-[#AEF597]/30 p-4 space-y-2.5 text-[9px] font-mono">
                      <div className="flex items-center gap-2 text-[#AEF597] font-black animate-pulse">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>RECALIBRATING LLM SEMANTIC RADAR INDEX...</span>
                      </div>
                      
                      <div className="space-y-1 text-[#6B7280]">
                        {generationLogs.map((log, index) => (
                          <div key={index} className="flex gap-2">
                            <span className="text-[#AEF597]">&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={triggerReversalGeneration}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gradient hover:shadow-button-glow py-3 text-xs font-black text-slate-955 shadow-sm transition-all active:scale-95 shrink-0"
                    >
                      <Cpu className="h-4 w-4 text-slate-950 animate-pulse" />
                      <span>RECALIBRATE LLM TELEMETRY LOGS</span>
                    </button>
                  )}
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#6B7280]">
                <Terminal className="h-10 w-10 text-white/10 mb-3 animate-pulse" />
                <span className="text-xs font-semibold">NO SATURATED VECTOR LOADED</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
