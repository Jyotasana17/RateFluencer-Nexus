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
  RefreshCw,
  Play
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
}

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
  const [generationFinished, setGenerationFinished] = useState<boolean>(false);

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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simulate LLM Suggestion generation process with terminal logs
  const triggerReversalGeneration = () => {
    if (!selectedTrend) return;
    
    setIsGenerating(true);
    setGenerationFinished(false);
    setGenerationLogs([]);

    const logSequence = [
      "SCAN: Opening connection to social listening NLP matrix...",
      "TFE: Analyzing keyword saturation and comment sentiment densities...",
      "TFE: Calculating burnout coefficients against active trend model...",
      "SYNTHESIS: Recomposing tactical angles and disruptive hooks...",
      "COMPLETED: Creative counter-narrative and virality brief compiled successfully."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSequence.length) {
        setGenerationLogs((prev) => [...prev, logSequence[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setGenerationFinished(true);
      }
    }, 600);
  };

  const handleCustomTrendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTrend.trim()) return;

    // Create a new analyzed trend on-the-fly to populate the radar!
    const score = Math.floor(Math.random() * 20) + 76; // Generate highly realistic high fatigue score
    const newTrend: TrendData = {
      id: `custom_${Date.now()}`,
      trendName: customTrend,
      status: score >= fatigueThreshold ? "Critical Fatigue" : "High Fatigue",
      fatigueScore: score,
      sentiment: ["oversaturated", "repetitive", "annoying", "tired"],
      aiCounterNarrative: `Disrupting the "${customTrend}" Trend: An Honest & Unfiltered Reality Check`,
      viralityPrediction: `${Math.floor(Math.random() * 10) + 88}%`,
      hooks: [
        `Why I am officially quitting the "${customTrend}" trend.`,
        `The uncomfortable truth about "${customTrend}" nobody wants to admit.`,
        `How the "${customTrend}" wave is actually ruining your audience engagement.`
      ]
    };

    setTrendsList((prev) => [newTrend, ...prev]);
    setSelectedTrend(newTrend);
    setCustomTrend("");
    setGenerationFinished(false);
    setGenerationLogs([]);
  };

  const filteredTrends = trendsList.filter(
    (t) =>
      t.trendName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.aiCounterNarrative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight md:text-2xl uppercase">
          Fatigue Radar Workspace
        </h2>
        <p className="text-xs text-ghost">
          Direct counter-narratives calculated from active fatigue indices. Select or input a trend to generate reversal concepts.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_450px]">
        {/* Left Side: Saturated Trends Radar Feed */}
        <div className="space-y-6">
          {/* Search and custom input */}
          <div className="flex flex-col sm:flex-row gap-4">
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
            
            <form onSubmit={handleCustomTrendSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Analyze custom trend..."
                value={customTrend}
                onChange={(e) => setCustomTrend(e.target.value)}
                className="rounded-lg border border-white/5 bg-black px-4 py-2.5 text-xs font-mono text-white placeholder-ghost/30 focus:border-cyan/30 focus:outline-none transition-all min-w-[200px]"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-cyan px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] active:scale-95 shrink-0"
              >
                <Cpu className="h-3.5 w-3.5 text-black" />
                <span>Analyze</span>
              </button>
            </form>
          </div>

          {/* Saturated Feed List */}
          <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
                <Skull className="h-4 w-4 text-cyan" />
                ACTIVE BURNOUT INTELLIGENCE
              </h3>
              <span className="text-[10px] font-mono text-ghost/40">REAL-TIME TELEMETRY</span>
            </div>

            <div className="space-y-4">
              {filteredTrends.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-ghost/40">
                  No saturated vectors found matching your search.
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
                        setGenerationFinished(false);
                        setGenerationLogs([]);
                      }}
                      className={`group rounded-xl border p-5 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-cyan/[0.02] border-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.05)]"
                          : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan transition-colors">
                            {trend.trendName}
                          </h4>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span
                              className={`text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-black/40 border ${
                                isHighFatigue
                                  ? "text-red-400 border-red-500/20"
                                  : "text-cyan border-cyan/20"
                              }`}
                            >
                              {isHighFatigue ? "Critical Fatigue" : trend.status}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              {trend.sentiment.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[9px] font-mono text-ghost/40 bg-white/5 rounded px-1.5 py-0.5 border border-white/5"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Progress meter */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-mono text-ghost/60">FATIGUE INDEX</span>
                            <span
                              className={`text-sm font-bold font-mono ${
                                isHighFatigue ? "text-red-400" : "text-cyan"
                              }`}
                            >
                              {trend.fatigueScore} / 100
                            </span>
                          </div>
                          
                          <div className="h-10 w-1.5 rounded-full bg-white/5 overflow-hidden relative">
                            <div
                              className={`absolute bottom-0 inset-x-0 rounded-full transition-all duration-500 ${
                                isHighFatigue
                                  ? "bg-gradient-to-t from-red-500 to-rose-600 animate-pulse"
                                  : "bg-gradient-to-t from-cyan to-blue-500"
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
          <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md flex flex-col min-h-[500px]">
            <div className="border-b border-white/5 pb-4 mb-5">
              <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan" />
                TACTICAL REVERSAL LAB
              </h3>
              <p className="text-[11px] font-mono text-ghost/50 uppercase tracking-widest mt-1">
                Workspace Concept Formulator
              </p>
            </div>

            {selectedTrend ? (
              <div className="flex-1 flex flex-col justify-between">
                {/* Active selection info */}
                <div className="space-y-5">
                  <div className="rounded-lg bg-black border border-white/5 p-4 space-y-2">
                    <span className="text-[9px] font-mono text-cyan uppercase tracking-widest block">
                      Target Vector
                    </span>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {selectedTrend.trendName}
                    </h4>
                    
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-ghost/50">FATIGUE:</span>
                      <span className="text-xs font-mono font-bold text-cyan">{selectedTrend.fatigueScore}/100</span>
                      <span className="text-[10px] font-mono text-ghost/50 ml-2">VIRALITY MULTIPLIER:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{selectedTrend.viralityPrediction}</span>
                    </div>
                  </div>

                  {/* Terminal Action Trigger */}
                  {!isGenerating && !generationFinished && (
                    <div className="text-center py-6 border border-dashed border-white/10 rounded-lg p-5">
                      <p className="text-xs text-ghost mb-4">
                        Load the active fatigue index into the AI generator to draft highly provocative, counter-narrative scripts.
                      </p>
                      
                      <button
                        onClick={triggerReversalGeneration}
                        className="group inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-3 text-xs font-bold text-black transition-all hover:bg-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] active:scale-95"
                      >
                        <Play className="h-3.5 w-3.5 fill-black text-black" />
                        <span>Formulate Reversal Strategy</span>
                      </button>
                    </div>
                  )}

                  {/* Simulated Terminal processing logs */}
                  {isGenerating && (
                    <div className="rounded-lg bg-black border border-cyan/20 p-5 space-y-3 font-mono text-[11px] min-h-[160px] flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-cyan">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>COMPILING SEMANTIC DESTRUCTION MODEL...</span>
                      </div>
                      
                      <div className="space-y-1.5 text-ghost/70">
                        {generationLogs.map((log, index) => (
                          <div key={index} className="flex gap-2">
                            <span className="text-cyan/50">&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Output Result brief */}
                  {generationFinished && (
                    <div className="space-y-5 animate-fade-in-up">
                      {/* Concept brief Card */}
                      <div className="rounded-lg bg-black border border-emerald-500/25 p-5 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/[0.02] blur-md pointer-events-none" />
                        
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                            Disruptive Narrative Angle
                          </span>
                          <p className="text-sm font-semibold text-white leading-relaxed">
                            {selectedTrend.aiCounterNarrative}
                          </p>
                        </div>

                        {/* Interactive Hook ideas */}
                        <div className="space-y-3 pt-3 border-t border-white/5">
                          <span className="text-[9px] font-mono text-ghost/50 uppercase tracking-widest block">
                            Provocative Script Hooks (Copy to Use)
                          </span>
                          
                          <div className="space-y-2">
                            {selectedTrend.hooks.map((hook, i) => (
                              <div
                                key={i}
                                className="flex items-start justify-between gap-3 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-lg p-3 group/hook transition-all"
                              >
                                <span className="text-xs text-ghost leading-snug font-serif italic">
                                  &ldquo;{hook}&rdquo;
                                </span>
                                <button
                                  onClick={() => copyToClipboard(hook, `${selectedTrend.id}_h_${i}`)}
                                  className="rounded p-1 text-ghost/40 hover:text-cyan hover:bg-cyan/10 transition-all shrink-0"
                                  title="Copy hook to tactical clipboard"
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
                      
                      {/* Secondary brief detail */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-black border border-white/5 p-4 text-center">
                          <span className="text-[9px] font-mono text-ghost/40 block">VIRALITY ESTIMATE</span>
                          <span className="text-lg font-bold font-mono text-cyan">{selectedTrend.viralityPrediction}</span>
                        </div>
                        <div className="rounded-lg bg-black border border-white/5 p-4 text-center">
                          <span className="text-[9px] font-mono text-ghost/40 block">OPPORTUNITY LEVEL</span>
                          <span className="text-lg font-bold font-mono text-emerald-400">OPTIMAL</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset button at the bottom */}
                {generationFinished && (
                  <button
                    onClick={() => {
                      setGenerationFinished(false);
                      setGenerationLogs([]);
                    }}
                    className="mt-6 w-full flex items-center justify-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] py-2.5 text-xs font-mono text-ghost hover:text-white hover:bg-white/[0.04] transition-all"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset Lab Canvas</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-ghost/30">
                <Terminal className="h-10 w-10 text-ghost/20 mb-3" />
                <span className="text-xs font-mono">No target vector selected. Scan or select a trend to load.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
