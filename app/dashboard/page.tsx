"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  Rocket, 
  Bookmark, 
  Sparkles, 
  Play, 
  Check, 
  Layers, 
  Flame, 
  Gauge, 
  Bot, 
  Search,
  Lock,
  Cpu,
  ChevronDown
} from "lucide-react";

// Interactive Dataset matching the specified top dying trends
const trendsDataset = [
  {
    trend: "Faceless AI Reels",
    fatigueIndex: "94/100",
    fatigueValue: 94,
    sentimentDecay: "-82%",
    velocity: "-34%",
    toxicKeywords: ["Boring", "AI Slop", "Skip"],
    strategyText: "The market is saturated with hyper-edited AI motivational reels. Pivot immediately to: Raw, unedited, single-take vulnerability videos. Predicted virality intersection in 72 hours.",
    confidence: "92%",
    confidenceValue: 92,
    trendScore: 24,
    fatigueScore: "92%",
    growth: "-34%",
    insightText: "AI slop accounts are currently experiencing an unprecedented organic reach collapse. Audiences swipe away instantly when noticing AI-generated faces or clone voiceovers. Transition to real founder building vlogs instead."
  },
  {
    trend: "Sigma Male Edits",
    fatigueIndex: "92/100",
    fatigueValue: 92,
    sentimentDecay: "-94%",
    velocity: "-41%",
    toxicKeywords: ["Cringe", "Forced", "Overused"],
    strategyText: "Staged hustle culture quotes and aggressive movie clip edits have reached absolute fatigue. Pivot to: Transparent business operations, raw margins, and practical tech tutorials.",
    confidence: "95%",
    confidenceValue: 95,
    trendScore: 18,
    fatigueScore: "94%",
    growth: "-41%",
    insightText: "Hustle culture bragging has reached a tipping point of audience cynicism. Viewer fatigue has entered critical levels; comments are highly negative. Shift content to quiet competence."
  },
  {
    trend: "5AM Routines",
    fatigueIndex: "86/100",
    fatigueValue: 86,
    sentimentDecay: "-71%",
    velocity: "-28%",
    toxicKeywords: ["Unrealistic", "Fake", "Tired"],
    strategyText: "Perfect aesthetic wake-up routines are rejected as performative. Pivot immediately to: Realistic chaotic founder mornings, messy working tables, and late-night coding sessions.",
    confidence: "88%",
    confidenceValue: 88,
    trendScore: 32,
    fatigueScore: "86%",
    growth: "-28%",
    insightText: "Performative discipline content has become an easy target for parodies. Viewers favor messy realism and actual struggles over perfectly curated morning routines."
  },
  {
    trend: "AI Guru Content",
    fatigueIndex: "89/100",
    fatigueValue: 89,
    sentimentDecay: "-88%",
    velocity: "-36%",
    toxicKeywords: ["Scam", "Slop", "Robotic"],
    strategyText: "Audiences are highly cynical of 'get rich quick using AI tools' promises. Pivot immediately to: Long-form deep research papers, code reviews, and hard engineering implementation logs.",
    confidence: "91%",
    confidenceValue: 91,
    trendScore: 27,
    fatigueScore: "88%",
    growth: "-36%",
    insightText: "AI guru courses and cash cow channel promotions have reached a saturation point. Audiences are actively calling out generic ChatGPT-written advice. Shift to hard engineering."
  },
  {
    trend: "Motivational Quotes",
    fatigueIndex: "75/100",
    fatigueValue: 75,
    sentimentDecay: "-66%",
    velocity: "-22%",
    toxicKeywords: ["Generic", "Spam", "Repetitive"],
    strategyText: "Diluted quotes plastered over stock background videos are getting muted. Pivot immediately to: Actionable micro-case studies of real failures, backed by specific product telemetry.",
    confidence: "84%",
    confidenceValue: 84,
    trendScore: 42,
    fatigueScore: "75%",
    growth: "-22%",
    insightText: "Standard stock footage with emotional overlay is being filtered out by social algorithms due to low engagement density. Transition immediately to text-based custom code snippets."
  }
];

export default function AdminDashboardPage() {
  const [selectedTrendIndex, setSelectedTrendIndex] = useState(0);
  
  // Get currently selected trend metrics
  const activeTrend = trendsDataset[selectedTrendIndex];

  // AI Insight Console stream simulation states
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [completedInsight, setCompletedInsight] = useState("");
  const [hasFinishedStream, setHasFinishedStream] = useState(false);
  
  // Custom toast notification system
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Reset insight whenever trend changes
  useEffect(() => {
    setConsoleLogs([]);
    setCompletedInsight("");
    setHasFinishedStream(false);
  }, [selectedTrendIndex]);

  // Simulate CLI compilation sequence
  const startTelemetryCalibrator = () => {
    setIsCalibrating(true);
    setConsoleLogs([]);
    setCompletedInsight("");
    setHasFinishedStream(false);

    const logSequence = [
      "SCANNING: active digital vector pipelines...",
      "FETCHING: raw comment sentiment ratios...",
      "CALCULATING: narrative burnout coefficients...",
      "COMPILING: optimal creative pivot angles...",
      "SUCCESS: telemetry diagnostic compiled successfully."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logSequence.length) {
        setConsoleLogs((prev) => [...prev, `> ${logSequence[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsCalibrating(false);
        setHasFinishedStream(true);
        
        // Typewriter effect for simulated AI output
        let charIndex = 0;
        const fullInsightText = activeTrend.insightText;
        const typingInterval = setInterval(() => {
          if (charIndex <= fullInsightText.length) {
            setCompletedInsight(fullInsightText.slice(0, charIndex));
            charIndex += 2; // Write 2 characters at a time for smooth premium acceleration
          } else {
            clearInterval(typingInterval);
          }
        }, 15);
      }
    }, 350);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 text-[#B3B3B3] font-mono select-none animate-fade-in-up">
      
      {/* Visual Ambient Grid Glows */}
      <div className="absolute top-10 right-20 h-64 w-64 bg-[#AEF597]/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-20 h-64 w-64 bg-red-500/[0.01] rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Floating System Toast */}
      {showToast && (
        <div className="fixed bottom-14 right-6 z-50 flex items-center gap-3 bg-[#0A0A0A] border border-[#AEF597]/30 text-white rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(174,245,151,0.15)] animate-fade-in-up">
          <Sparkles className="h-4 w-4 text-[#AEF597] animate-pulse" />
          <span className="text-[11px] font-mono">{toastMessage}</span>
        </div>
      )}

      {/* MAIN TOP GRID CONTROLS */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* PANEL A: CREATOR MARKET OVERVIEW (Left Column Span 8) */}
        <div className="xl:col-span-8 bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
          
          <div>
            {/* Title Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#AEF597] animate-pulse" />
                <h2 className="text-sm font-black text-white uppercase tracking-wider">Creator Market Overview</h2>
              </div>
              <span className="text-[9px] font-extrabold text-[#AEF597] bg-[#AEF597]/10 px-2 py-0.5 rounded border border-[#AEF597]/20 uppercase tracking-widest animate-pulse">LIVE FEED</span>
            </div>

            {/* Top Row: 4 KPI blocks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              
              {/* Block 1 */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Total Active Topics</div>
                <div className="text-xl font-bold text-white mt-1.5 font-sans tracking-tight">1,247</div>
                <div className="flex items-center gap-1 text-[9px] text-[#AEF597] mt-1.5 font-bold uppercase">
                  <span>↑</span>
                  <span>12.4% vs last 7d</span>
                </div>
              </div>

              {/* Block 2 */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Rising Topics</div>
                <div className="text-xl font-bold text-white mt-1.5 font-sans tracking-tight">231</div>
                <div className="flex items-center gap-1 text-[9px] text-[#AEF597] mt-1.5 font-bold uppercase">
                  <span>↑</span>
                  <span>18.7% vs last 7d</span>
                </div>
              </div>

              {/* Block 3 */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Declining Topics</div>
                <div className="text-xl font-bold text-white mt-1.5 font-sans tracking-tight">487</div>
                <div className="flex items-center gap-1 text-[9px] text-red-500 mt-1.5 font-bold uppercase">
                  <span>↓</span>
                  <span>24.3% vs last 7d</span>
                </div>
              </div>

              {/* Block 4 */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Average Lifespan</div>
                <div className="text-xl font-bold text-white mt-1.5 font-sans tracking-tight">3.2 Days</div>
                <div className="flex items-center gap-1 text-[9px] text-red-500 mt-1.5 font-bold uppercase">
                  <span>↓</span>
                  <span>0.8 days vs last 7d</span>
                </div>
              </div>

            </div>

            {/* Second Section: Top Dying Trends Table */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <span>Top Dying Trends</span>
                <span className="text-[#6B7280]">(by Fatigue Index)</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-[#6B7280] font-extrabold uppercase">
                      <th className="py-2.5">Trend Name</th>
                      <th className="py-2.5 text-center">Fatigue Index</th>
                      <th className="py-2.5 text-center">Sentiment Decay</th>
                      <th className="py-2.5 text-right">Velocity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {trendsDataset.map((t, idx) => {
                      const isSelected = idx === selectedTrendIndex;
                      return (
                        <tr 
                          key={t.trend} 
                          onClick={() => setSelectedTrendIndex(idx)}
                          className={`cursor-pointer transition-all ${
                            isSelected 
                              ? "bg-[#AEF597]/5 text-white font-extrabold border-l-2 border-[#AEF597]" 
                              : "hover:bg-white/[0.02] text-[#B3B3B3]"
                          }`}
                        >
                          <td className="py-3 px-3 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-[#AEF597] animate-pulse" : "bg-red-500"}`} />
                            <span>{t.trend}</span>
                          </td>
                          <td className="py-3 text-center text-red-500 font-extrabold">{t.fatigueIndex}</td>
                          <td className="py-3 text-center text-red-500 font-extrabold">{t.sentimentDecay}</td>
                          <td className="py-3 text-right text-red-500 font-extrabold px-3">{t.velocity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Table Footer Actions */}
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px]">
            <span className="text-[#6B7280]">Showing 5 critical attention burnout vectors</span>
            <button 
              onClick={() => triggerToast("Directing to all saturated trend matrices...")}
              className="text-[#AEF597] font-bold uppercase hover:underline flex items-center gap-1"
            >
              <span>View All Dying Trends</span>
              <span className="text-xs">→</span>
            </button>
          </div>

        </div>

        {/* PANEL B: SATURATION MATRIX (Right Column Span 4) */}
        <div className="xl:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.01] rounded-full blur-xl pointer-events-none" />
          
          <div className="space-y-6">
            
            {/* Title */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <svg className="w-4 h-4 text-[#AEF597]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v4M12 18v4M4 12H2M22 12h-4" />
              </svg>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Saturation Matrix</h2>
            </div>

            {/* Active Query Display */}
            <div className="space-y-1.5">
              <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Active Query</div>
              <div className="bg-black/60 border border-[#AEF597]/25 text-[#AEF597] rounded-xl px-4 py-2.5 font-bold text-center tracking-wide shadow-[0_0_10px_rgba(174,245,151,0.04)]">
                {activeTrend.trend}
              </div>
            </div>

            {/* Fatigue Index & Hardware Progress Bar */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Fatigue Index</span>
                <span className="text-lg font-black text-red-500">{activeTrend.fatigueIndex}</span>
              </div>
              
              {/* Segments (20 Blocks representing telemetry level) */}
              <div className="flex gap-0.5 justify-between items-center h-6 bg-black/40 border border-white/5 rounded-md p-1">
                {Array.from({ length: 20 }).map((_, blockIndex) => {
                  const thresholdValue = (blockIndex + 1) * 5;
                  const isLit = activeTrend.fatigueValue >= thresholdValue;
                  return (
                    <div 
                      key={blockIndex} 
                      className={`flex-1 h-full rounded-[1px] transition-all ${
                        isLit 
                          ? "bg-red-650 shadow-[0_0_8px_rgba(220,38,38,0.45)]" 
                          : "bg-white/[0.02]"
                      }`} 
                    />
                  );
                })}
              </div>
            </div>

            {/* Sentiment Decay */}
            <div className="space-y-1">
              <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Sentiment Decay (48H)</div>
              <div className="text-3xl font-black text-red-500 tracking-tight leading-none pt-1">
                {activeTrend.sentimentDecay}
              </div>
            </div>

            {/* Toxic Keywords Tags */}
            <div className="space-y-2 pt-2">
              <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Toxic Keywords Detected</div>
              <div className="flex flex-wrap gap-2">
                {activeTrend.toxicKeywords.map((word) => (
                  <span 
                    key={word}
                    className="text-[9px] font-bold text-red-500 bg-red-950/20 border border-red-500/20 px-2.5 py-1 rounded-md uppercase tracking-wider hover:bg-red-950/40 transition-colors"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-4 border-t border-white/5 text-center mt-6">
            CALCULATED THROUGH DIRECT COMMENTS TELEMETRY
          </div>

        </div>

      </div>

      {/* PANEL C: AI COUNTER-STRISE STRATEGY GENERATED (Middle Section) */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
          
          {/* Strategy Details (Left Span 8) */}
          <div className="xl:col-span-8 space-y-4">
            
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Bot className="h-4 w-4 text-[#AEF597] animate-bounce" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">AI Counter-Strike Strategy Generated</h2>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#AEF597]/[0.02] rounded-full blur-md" />
              <div className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Strategic Recommendation</div>
              <p className="text-xs leading-relaxed text-[#f1f0f7] tracking-wide">
                {activeTrend.strategyText}
              </p>
            </div>

          </div>

          {/* Confidence Indicator & Actions (Right Span 4) */}
          <div className="xl:col-span-4 flex flex-col md:flex-row xl:flex-col gap-6 items-center justify-center border-l xl:border-l border-white/5 pl-0 xl:pl-6 pt-6 xl:pt-0">
            
            {/* Circular Confidence Meter */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeWidth="5" 
                  />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    fill="none" 
                    stroke="#AEF597" 
                    strokeWidth="5" 
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 - (activeTrend.confidenceValue / 100) * (2 * Math.PI * 26)}
                    strokeLinecap="round"
                    className="shadow-[0_0_12px_rgba(174,245,151,0.5)] transition-all duration-1000"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xs font-black text-white font-mono">{activeTrend.confidence}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black text-white uppercase tracking-wider">High Confidence</div>
                <div className="text-[8px] text-[#6B7280] uppercase tracking-widest font-bold mt-0.5">Calculated Success Potential</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex-1 w-full space-y-2">
              <button 
                onClick={() => triggerToast("Strategized angle deployed! Initializing script compiler...")}
                className="w-full h-11 bg-[#AEF597] hover:bg-[#A8F690] text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(174,245,151,0.3)] flex items-center justify-center gap-2"
              >
                <Rocket className="w-3.5 h-3.5 fill-slate-950 text-slate-950 animate-pulse" />
                <span>Deploy Strategy to Content Studio</span>
              </button>
              
              <button 
                onClick={() => triggerToast("Strategic blueprint securely logged to vault.")}
                className="w-full h-9 bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-white/20 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Bookmark className="w-3 h-3 text-[#B3B3B3]" />
                <span>Save Strategy</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* PANEL D: BOTTOM METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Card 1: Trend Score */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#AEF597]/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#AEF597]/[0.01] rounded-full blur-md" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                <span>🔥</span>
                <span>Trend Score</span>
              </div>
              <span className="text-[8px] font-extrabold text-red-500 bg-red-950/20 border border-red-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">DECLINE</span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono leading-none">{activeTrend.trendScore}</span>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase">OUT OF 100</span>
            </div>
          </div>

          {/* Decline Green Sparkline */}
          <div className="h-10 mt-6 flex items-center justify-center overflow-hidden w-full relative">
            <svg className="w-full h-full stroke-[#AEF597] fill-none" viewBox="0 0 100 20">
              <path 
                d="M0,5 Q20,3 40,12 T80,14 T100,18" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2 border-t border-white/5 mt-2">
            ORGANIC INTEREST LEVELS
          </div>
        </div>

        {/* Card 2: Fatigue Score */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#AEF597]/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/[0.01] rounded-full blur-md" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                <span>⚠️</span>
                <span>Fatigue Score</span>
              </div>
              <span className="text-[8px] font-extrabold text-[#AEF597] bg-[#AEF597]/10 border border-[#AEF597]/20 px-1.5 py-0.5 rounded uppercase tracking-wider">OUR USP</span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-[#6B7280] block uppercase tracking-wider">Metrics Status</span>
                <span className="text-xs font-black text-white leading-none">
                  Fatigue: <span className="text-red-500">{activeTrend.fatigueScore}</span>
                </span>
                <span className="text-[8px] font-bold text-red-500 bg-red-950/20 border border-red-500/20 px-1 py-0.5 rounded uppercase tracking-widest block w-fit mt-1">CRITICAL</span>
              </div>

              {/* Mini SVGCircle */}
              <div className="w-12 h-12 flex items-center justify-center shrink-0 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                  <circle 
                    cx="16" 
                    cy="16" 
                    r="12" 
                    fill="none" 
                    stroke="red" 
                    strokeWidth="3" 
                    strokeDasharray={2 * Math.PI * 12}
                    strokeDashoffset={2 * Math.PI * 12 - (activeTrend.fatigueValue / 100) * (2 * Math.PI * 12)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-[8px] font-black text-white">{activeTrend.fatigueScore}</span>
              </div>
            </div>
          </div>

          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2 border-t border-white/5 mt-2">
            BASED ON: Trend decline, Overuse
          </div>
        </div>

        {/* Card 3: Growth */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#AEF597]/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#AEF597]/[0.01] rounded-full blur-md" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                <span>📈</span>
                <span>Growth</span>
              </div>
              <span className="text-[8px] font-extrabold text-red-500 bg-red-950/20 border border-red-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">VELOCITY</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono leading-none">{activeTrend.growth}</span>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase">7-DAY CHANGE</span>
            </div>
          </div>

          {/* Decline Red Sparkline */}
          <div className="h-10 mt-6 flex items-center justify-center overflow-hidden w-full relative">
            <svg className="w-full h-full stroke-red-500 fill-none animate-pulse" viewBox="0 0 100 20">
              <path 
                d="M0,2 Q25,3 50,12 T90,16 T100,19" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2 border-t border-white/5 mt-2">
            7-DAY ATTENTION GROWTH
          </div>
        </div>

        {/* Card 4: Narrative Status (Console Simulator) */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#AEF597]/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#AEF597]/[0.01] rounded-full blur-md" />
          
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-1 text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                <span>🤖</span>
                <span>Narrative Status</span>
              </div>
              <span className="text-[8px] font-extrabold text-[#AEF597] bg-[#AEF597]/10 border border-[#AEF597]/20 px-1.5 py-0.5 rounded uppercase tracking-wider">WOW FEATURE</span>
            </div>

            {/* Simulated Shell Screen */}
            <div className="bg-black/60 border border-white/5 rounded-lg p-2.5 min-h-[70px] max-h-[85px] flex items-center justify-center overflow-y-auto relative text-left">
              {!isCalibrating && !hasFinishedStream && (
                <p className="text-[8px] leading-relaxed text-[#6B7280] text-center uppercase tracking-wide font-extrabold select-none">
                  Ready to synthesize curves.<br />Click 'Get AI Insight' to trigger prediction.
                </p>
              )}

              {isCalibrating && (
                <div className="w-full space-y-0.5 text-[8px] font-bold text-[#AEF597] uppercase">
                  {consoleLogs.map((log, idx) => (
                    <div key={idx} className="animate-pulse">{log}</div>
                  ))}
                  <div className="flex items-center gap-1.5 text-white pt-1">
                    <span className="w-2 h-2 rounded-full border-t border-[#AEF597] animate-spin" />
                    <span>CALIBRATING INDEX...</span>
                  </div>
                </div>
              )}

              {hasFinishedStream && !isCalibrating && (
                <p className="text-[8px] leading-relaxed text-white uppercase tracking-wider w-full h-full font-bold select-text">
                  {completedInsight}
                  {completedInsight.length < activeTrend.insightText.length && (
                    <span className="inline-block w-1 h-3 bg-[#AEF597] animate-pulse ml-0.5" />
                  )}
                </p>
              )}
            </div>

            {/* Run Button */}
            <button 
              onClick={startTelemetryCalibrator}
              disabled={isCalibrating}
              className="w-full h-8 bg-brand-gradient hover:shadow-button-glow text-slate-950 font-black rounded-lg text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 disabled:opacity-50 transition-all duration-250 active:scale-95 shrink-0"
            >
              <span>Get AI Insight</span>
              <span className="text-[10px]">→</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
