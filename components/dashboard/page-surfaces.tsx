"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Compass,
  Flame,
  Gauge,
  Gem,
  LineChart,
  Orbit,
  Radar as RadarIcon,
  RadioTower,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
  Zap
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { InfluenceHeroScene } from "@/components/landing/influence-scene";
import { agentSteps, creators, dnaMetrics, growthCurve, labStages } from "@/lib/data";
import { useNexusStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const panelMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" as const }
};

function PageHeader({ icon: Icon, title, copy }: { icon: LucideIcon; title: string; copy: string }) {
  return (
    <div className="mb-8 select-none">
      <div className="mb-2 flex items-center gap-2 text-[#AEF597]">
        <Icon className="h-4.5 w-4.5 text-[#AEF597] animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.25em] font-mono">RateFluencer Nexus AI</span>
      </div>
      <h1 className="max-w-4xl text-balance text-2xl font-black tracking-tight text-white sm:text-3xl leading-tight font-hanken">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-xs font-semibold text-[#a6a3bf] leading-relaxed">{copy}</p>
    </div>
  );
}

function IntelligenceTile({
  label,
  value,
  icon: Icon,
  tone = "indigo"
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "indigo" | "emerald" | "rose" | "cyan" | "mint" | "pink";
}) {
  const toneMap = {
    indigo: { text: "text-[#AEF597]", bg: "bg-[#AEF597]/10 border-[#AEF597]/20" },
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    rose: { text: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
    mint: { text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    pink: { text: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" }
  };
  const currentTone = toneMap[tone] || toneMap.indigo;

  return (
    <div className="glass-panel border-white/5 rounded-[24px] p-5 shadow-2xl transition hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(174,245,151,0.12)] hover:border-[#AEF597]/30 duration-300 relative overflow-hidden group cursor-pointer">
      <div className="absolute top-0 right-0 h-16 w-16 bg-[#AEF597]/5 rounded-full blur-lg pointer-events-none -z-10 group-hover:bg-[#AEF597]/10 transition-colors" />
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${currentTone.bg} ${currentTone.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-[#a6a3bf] uppercase tracking-widest leading-none font-mono">{label}</p>
          <p className="text-lg font-black text-white tracking-tight leading-none pt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardHome() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Sparkles}
        title="AI Command Center"
        copy="A spatial intelligence layer for creators, brands, campaigns, content, and autonomous growth operations."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Globe Visualization */}
        <div className="glass-panel-dark border-white/5 rounded-[32px] relative min-h-[600px] overflow-hidden p-0 shadow-2xl">
          <InfluenceHeroScene compact />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,22,.7)_78%)]" />
          <div className="absolute left-6 top-6 rounded-2xl border border-[#AEF597]/20 bg-black/55 px-4 py-3 backdrop-blur-xl">
            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#AEF597] font-mono">Intelligence globe</p>
            <p className="mt-1 text-xs font-semibold text-[#f1f0f7]">42,118 live creator vectors</p>
          </div>
        </div>
        
        {/* Overview Tiles */}
        <div className="grid gap-4 self-start">
          <IntelligenceTile label="Trending Creators" value="+418 emerging" icon={TrendingUp} tone="indigo" />
          <IntelligenceTile label="Brand Opportunities" value="$12.4M forecast" icon={Target} tone="mint" />
          <IntelligenceTile label="Growth Alerts" value="27 anomalies" icon={RadioTower} tone="pink" />
          <IntelligenceTile label="Campaign Insights" value="89% avg confidence" icon={Gauge} tone="cyan" />
        </div>
      </div>
    </div>
  );
}

export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");

  const niches = ["All", "Clean Beauty", "AI Filmmaking", "Fitness", "Food"];

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (selectedNiche === "All") return matchesSearch;
    
    if (selectedNiche === "Clean Beauty") return matchesSearch && creator.niche.toLowerCase().includes("beauty");
    if (selectedNiche === "AI Filmmaking") return matchesSearch && creator.niche.toLowerCase().includes("ai");
    if (selectedNiche === "Fitness") return matchesSearch && creator.niche.toLowerCase().includes("fitness");
    if (selectedNiche === "Food") return matchesSearch && creator.niche.toLowerCase().includes("food");
    
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Compass}
        title="Creator Discovery Engine"
        copy="Search creators by hidden growth signals, semantic audience quality, trust density, and commercial fit."
      />

      {/* Search and Filters */}
      <div className="glass-panel border-white/5 rounded-[24px] p-6 shadow-2xl space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[#a6a3bf]" />
          <input
            aria-label="Search creators"
            placeholder="Search by handle, niche specs, or target audiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/10 focus:border-[#AEF597]/40 focus:bg-white/10 focus:shadow-[0_0_12px_rgba(174,245,151,0.08)] rounded-xl text-xs font-semibold text-white placeholder-slate-450 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[9px] font-bold text-[#a6a3bf] uppercase tracking-wider mr-2 font-mono">Niche filter:</span>
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={cn(
                "text-[9px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 uppercase tracking-wider font-mono",
                selectedNiche === niche
                  ? "bg-[#AEF597] border-[#AEF597] text-slate-950 shadow-sm font-black"
                  : "bg-white/5 border-white/10 text-[#a6a3bf] hover:text-white hover:bg-white/10"
              )}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredCreators.length === 0 ? (
          <div className="md:col-span-2 text-center py-12 glass-panel border-white/5 rounded-[24px] shadow-sm">
            <span className="text-[#a6a3bf] text-xs font-semibold">No creators found matching your selection. Try a different query.</span>
          </div>
        ) : (
          filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.handle}
              {...panelMotion}
              transition={{ ...panelMotion.transition, delay: index * 0.05 }}
            >
              <div className="glass-panel border-white/5 rounded-[28px] p-6 shadow-2xl hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(174,245,151,0.12)] hover:border-[#AEF597]/30 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 h-24 w-24 bg-[#AEF597]/5 rounded-full blur-xl pointer-events-none -z-10" />
                
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-base font-black text-white tracking-tight group-hover:text-[#AEF597] transition-colors font-hanken">
                        {creator.name}
                      </h3>
                      <p className="text-xs font-bold text-[#AEF597] tracking-wide font-mono">
                        {creator.handle}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-bold text-[#a6a3bf] uppercase tracking-widest block mb-0.5 font-mono">Nexus Score</span>
                      <span className="bg-[#AEF597]/15 border border-[#AEF597]/25 text-[#AEF597] text-xs font-black px-2.5 py-1 rounded-full leading-none font-mono">
                        {creator.score}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-[#f1f0f7] leading-relaxed mb-6 bg-white/5 border border-white/5 rounded-xl p-3">
                    <span className="font-bold text-[#a6a3bf] block text-[8px] uppercase tracking-widest mb-1 font-mono">NICHE SECTOR</span>
                    {creator.niche}
                  </div>

                  <div className="space-y-4 mb-6">
                    {[
                      { label: "Growth Potential", val: creator.growth },
                      { label: "Authenticity Index", val: creator.authenticity },
                      { label: "Virality Propensity", val: creator.virality }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-[9px] font-bold text-[#a6a3bf] uppercase tracking-wider font-mono">
                          <span>{item.label}</span>
                          <span className="text-[#AEF597]">{item.val}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden relative border border-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#AEF597] to-[#A8F690] transition-all duration-1000 ease-out"
                            style={{ width: `${item.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] font-bold text-[#f1f0f7] bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between mt-auto">
                  <span className="text-[#a6a3bf] uppercase tracking-widest text-[8px] font-mono">Target Niche Nurture:</span>
                  <span className="uppercase text-[#AEF597] font-mono">{creator.audience}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export function DnaProfilePage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={RadarIcon}
        title="Influence DNA: Creator Digital Twin"
        copy="Influence DNA models the creator as a living market signal across trust, audience, creative velocity, and brand memory fit."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Radar Chart Panel */}
        <div className="glass-panel border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[9px] font-bold text-[#AEF597] uppercase tracking-widest block mb-1 font-mono">BIOMETRIC SIGNAL MATRIX</span>
            <h3 className="text-sm font-black text-white uppercase tracking-tight font-hanken">Core Competencies Radar</h3>
          </div>

          <div className="h-[360px] flex items-center justify-center relative w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dnaMetrics} outerRadius="75%">
                <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#a6a3bf", fontSize: 10, fontWeight: "bold" }} />
                <Radar dataKey="value" stroke="#AEF597" fill="#AEF597" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip contentStyle={{ background: "#0c0f1d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, fontSize: 11, fontWeight: "semibold", color: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {dnaMetrics.map((metric) => (
              <div key={metric.subject} className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
                <p className="text-[9px] font-bold text-[#a6a3bf] uppercase tracking-widest font-mono">{metric.subject}</p>
                <p className="mt-1 text-xl font-black text-[#AEF597] tracking-tight font-mono">{metric.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side telemetry widgets */}
        <div className="space-y-6">
          <IntelligenceTile label="Audience Quality Index" value="Premium wellness buyers" icon={BadgeCheck} tone="mint" />
          <IntelligenceTile label="Trust Metrics density" value="0.92 trust density" icon={ShieldCheck} />

          {/* Growth Curve */}
          <div className="glass-panel border-white/5 rounded-[28px] p-6 shadow-2xl space-y-4">
            <div>
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">ATTENTION LIFT</span>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-hanken">Historical Growth Curve</h4>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthCurve} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0c0f1d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 10, color: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)" }} />
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#AEF597" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#AEF597" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="nexus" stroke="#AEF597" fill="url(#emeraldGrad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="glass-panel border-white/5 rounded-[28px] p-6 shadow-2xl space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#AEF597]/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-[#AEF597] pb-1 border-b border-white/5">
              <BrainCircuit className="h-4.5 w-4.5 text-[#AEF597] animate-bounce" />
              <h4 className="text-xs font-black uppercase tracking-wider font-mono">DNA Diagnostic AI</h4>
            </div>
            
            <p className="text-xs font-semibold text-[#a6a3bf] leading-relaxed">
              Mira Vale is heavily underpriced for premium wellness launches. Her active community saves video tutorials at a <span className="text-[#AEF597] font-extrabold">2.3x higher rate</span> than the category median and converts exceptionally well following authentic routine showcases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CampaignLabPage() {
  const { budget, goal, setBudget, setGoal } = useNexusStore();
  const success = Math.min(96, Math.round(68 + budget / 4200 + (goal === "Conversion" ? 6 : 2)));
  const roi = (2.1 + budget / 100000).toFixed(1);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Orbit}
        title="Predictive Campaign Simulator"
        copy="Adjust inputs and watch predictive outcomes recompose in real time using our live telemetry models."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Simulator Inputs Panel */}
        <div className="glass-panel border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[9px] font-bold text-[#AEF597] uppercase tracking-widest block mb-1 font-mono">PREDICTIVE STAGE VARIABLE</span>
              <h3 className="text-sm font-black text-white uppercase tracking-tight font-hanken">Campaign Parameters</h3>
            </div>

            {/* Budget range slider */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#a6a3bf] uppercase tracking-widest block font-mono">Allocated Budget</span>
              <input
                type="range"
                min={20000}
                max={180000}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="w-full accent-[#AEF597] h-2 bg-white/5 rounded-lg cursor-pointer border border-white/10"
              />
              <p className="text-3xl font-black text-[#AEF597] tracking-tight font-mono">${budget.toLocaleString()}</p>
            </div>

            {/* Goal selector */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#a6a3bf] uppercase tracking-widest block font-mono">Optimization Goal</span>
              <div className="grid grid-cols-3 gap-2">
                {(["Awareness", "Conversion", "Retention"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setGoal(item)}
                    className={cn(
                      "text-[9px] font-bold px-3 py-2.5 rounded-xl border transition-all duration-200 uppercase tracking-wider font-mono",
                      goal === item
                        ? "bg-[#AEF597] border-[#AEF597] text-slate-950 shadow-sm font-black"
                        : "bg-white/5 border-white/10 text-[#a6a3bf] hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-[10px] font-bold text-[#a6a3bf] flex flex-col gap-1.5 mt-6 font-mono">
            <div className="flex justify-between">
              <span className="text-[#a6a3bf] uppercase">Target Brand:</span>
              <span className="text-white uppercase">Astra Skin Inc</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a6a3bf] uppercase">Primary Talent:</span>
              <span className="text-white uppercase">Mira Vale (@miravalelabs)</span>
            </div>
          </div>
        </div>

        {/* Right side outcome metrics & graphs */}
        <div className="grid gap-6 sm:grid-cols-2">
          <IntelligenceTile label="Success Probability" value={`${success}%`} icon={Target} tone="mint" />
          <IntelligenceTile label="ROI Forecast" value={`${roi}x`} icon={TrendingUp} />
          <IntelligenceTile label="Risk Assessment" value="Low / 12" icon={ShieldCheck} />
          <IntelligenceTile label="Expected Reach" value="18.6M" icon={RadioTower} tone="pink" />

          {/* Recharts Bar Chart */}
          <div className="glass-panel border-white/5 rounded-[32px] p-6 shadow-2xl sm:col-span-2 space-y-4">
            <div>
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">METRIC COMPARISON GRAPH</span>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-hanken">Predictive Telemetry Breakdown</h4>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Reach", value: 82 },
                  { name: "Engagement", value: 78 },
                  { name: "Conversion", value: success },
                  { name: "Safety", value: 92 }
                ]} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0c0f1d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 10, color: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)" }} />
                  <Bar dataKey="value" fill="#AEF597" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentLabPage() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Flame}
        title="AI Content Creation Studio"
        copy="Turn trend intelligence into scripts, thumbnails, captions, and virality forecasts through coordinated agent stages."
      />

      {/* Stage Grid */}
      <div className="grid gap-4 sm:grid-cols-5">
        {labStages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === activeStage;
          return (
            <motion.div
              key={stage.title}
              {...panelMotion}
              transition={{ ...panelMotion.transition, delay: index * 0.05 }}
            >
              <div
                onClick={() => setActiveStage(index)}
                className={cn(
                  "glass-panel border rounded-[24px] p-5 h-full cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden group select-none shadow-2xl",
                  isActive
                    ? "border-[#AEF597]/40 ring-2 ring-[#AEF597]/10 shadow-[0_12px_35px_rgba(174,245,151,0.08)] bg-[#AEF597]/5"
                    : "border-white/5 hover:border-[#AEF597]/20 hover:-translate-y-1"
                )}
              >
                <div className="absolute top-0 right-0 h-12 w-12 bg-[#AEF597]/5 rounded-full blur-md" />
                <div>
                  <div
                    className={cn(
                      "mb-4 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300",
                      isActive
                        ? "bg-[#AEF597] border-[#AEF597] text-slate-950"
                        : "bg-white/5 border border-white/5 text-[#AEF597] group-hover:bg-[#AEF597] group-hover:border-[#AEF597] group-hover:text-slate-950"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-black tracking-tight text-white leading-tight font-hanken">
                    {stage.title}
                  </h3>
                </div>
                <p className="mt-3 text-[10px] font-semibold text-[#a6a3bf] uppercase tracking-wide leading-relaxed pt-2 border-t border-white/5 font-mono">
                  {stage.status}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Generated Outputs Card */}
      <div className="glass-panel border-white/5 rounded-[32px] p-6 shadow-2xl grid gap-6 md:grid-cols-2 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-32 w-32 bg-[#AEF597]/5 rounded-full blur-xl pointer-events-none" />

        <div className="rounded-[24px] border border-white/5 bg-white/5 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-[#AEF597] bg-[#AEF597]/15 border border-[#AEF597]/25 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block font-mono">
              Stage Output: AI Script
            </span>
            <p className="text-xl font-black text-white leading-snug font-serif italic">
              &ldquo;I replaced my morning social media scroll with this 38-second mental reset.&rdquo;
            </p>
          </div>
          <p className="text-[10px] font-semibold text-[#a6a3bf] uppercase tracking-wide leading-relaxed border-t border-white/5 pt-3 font-mono">
            Composition Structure: Hook hook, tactile product demonstration, creator trust proof, before-after payoff, viral save index cue.
          </p>
        </div>

        <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/[0.02] rounded-full blur-xl" />
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block font-mono">
              Virality Forecast Outcome
            </span>
            <p className="text-6xl font-black text-emerald-400 tracking-tighter leading-none pt-2 font-mono">91%</p>
          </div>
          <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide leading-relaxed border-t border-emerald-500/20 pt-3 font-mono">
            Attention diagnosis: strong user retention through second 2, high comment prompt engagement quotient, exceptional direct save intent.
          </p>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  const [activeMetricTab, setActiveMetricTab] = useState<"growth" | "fatigue" | "velocity">("growth");

  const fatigueData = [
    { month: "Jan", legacy: 80, nexus: 70 },
    { month: "Feb", legacy: 82, nexus: 62 },
    { month: "Mar", legacy: 85, nexus: 51 },
    { month: "Apr", legacy: 89, nexus: 42 },
    { month: "May", legacy: 91, nexus: 30 },
    { month: "Jun", legacy: 94, nexus: 18 }
  ];

  const velocityData = [
    { month: "Jan", legacy: 5, nexus: 15 },
    { month: "Feb", legacy: 4, nexus: 28 },
    { month: "Mar", legacy: 6, nexus: 45 },
    { month: "Apr", legacy: 8, nexus: 68 },
    { month: "May", legacy: 7, nexus: 95 },
    { month: "Jun", legacy: 5, nexus: 130 }
  ];

  const currentChartData =
    activeMetricTab === "growth"
      ? growthCurve
      : activeMetricTab === "fatigue"
      ? fatigueData
      : velocityData;

  const currentStrokeColor =
    activeMetricTab === "growth"
      ? "#10B981"
      : activeMetricTab === "fatigue"
      ? "#EF4444"
      : "#6366F1";

  const chartGradientId = `grad_${activeMetricTab}`;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={LineChart}
        title="Predictive Analytics Suite"
        copy="A focused deep-dive intelligence readout of creator growth rates, campaign lift margins, risks, and market velocity index."
      />

      {/* Grid Summary Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <IntelligenceTile label="Market Movement Velocity" value="+18.7%" icon={Activity} tone="cyan" />
        <IntelligenceTile label="Hidden Gems Identified" value="1,284" icon={Gem} tone="mint" />
        <IntelligenceTile label="Operational Risk Avoided" value="$3.8M" icon={ShieldCheck} tone="pink" />
        <IntelligenceTile label="AI Core Match Accuracy" value="94%" icon={Zap} tone="indigo" />
      </div>

      {/* Deep-Dive Chart Panel */}
      <div className="glass-panel border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <span className="text-[9px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">TELEMETRY DIAGNOSTIC MATRIX</span>
            <h3 className="text-sm font-black text-white uppercase tracking-tight font-hanken">System Forecasting Graphs</h3>
          </div>

          <div className="flex gap-2">
            {[
              { id: "growth", label: "Attention Growth" },
              { id: "fatigue", label: "Fatigue Forecast" },
              { id: "velocity", label: "Velocity Curves" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMetricTab(tab.id as "growth" | "fatigue" | "velocity")}
                className={cn(
                  "text-[9px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 uppercase tracking-wider font-mono",
                  activeMetricTab === tab.id
                    ? "bg-[#AEF597] border-[#AEF597] text-slate-950 shadow-sm font-black"
                    : "bg-white/5 border border-white/10 text-[#a6a3bf] hover:text-white hover:bg-white/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-80 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={activeMetricTab === "growth" ? "#AEF597" : currentStrokeColor} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={activeMetricTab === "growth" ? "#AEF597" : currentStrokeColor} stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="legacyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.05)" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0c0f1d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, fontSize: 10, color: "#fff", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)" }} />
              
              <Area type="monotone" dataKey="legacy" name="Legacy standard" stroke="rgba(255,255,255,0.2)" strokeWidth={2} strokeDasharray="4 4" fill="url(#legacyGrad)" />
              <Area type="monotone" dataKey="nexus" name="WaveShift Nexus" stroke={activeMetricTab === "growth" ? "#AEF597" : currentStrokeColor} strokeWidth={3.5} fill={`url(#${chartGradientId})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-white/5 text-[9px] font-bold text-[#a6a3bf] uppercase tracking-widest font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-[#AEF597] rounded-full inline-block" />
            <span>NEXUS ATTENTION INDEX</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-white/20 border-dashed border border-white/30 rounded-full inline-block" />
            <span>LEGACY SATURATION PATHWAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AIAgentPage() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>([72, 79, 86, 93]);

  const runAgentJob = () => {
    setIsRunning(true);
    setActiveStep(0);
    setLogs(["SCANNING: social listen streams...", "ANALYZING: keyword density trends..."]);

    setTimeout(() => {
      setActiveStep(1);
      setLogs((prev) => [...prev, "PARSING: sentiment logs database...", "CALCULATING: attention fatigue score..."]);
      setProgress([84, 82, 86, 93]);

      setTimeout(() => {
        setActiveStep(2);
        setLogs((prev) => [...prev, "MATCHING: active brand opportunities...", "FORMULATING: disruptive counter-concepts..."]);
        setProgress([84, 91, 89, 93]);

        setTimeout(() => {
          setActiveStep(3);
          setLogs((prev) => [...prev, "COMPILING: tactical video scripts...", "predictive virality score calibrated to 91%!", "COMPLETED: autonomous agent pipeline executed successfully."]);
          setProgress([96, 95, 98, 97]);
          setIsRunning(false);
        }, 1200);
      }, 1000);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Bot}
        title="Autonomous AI Growth Agent"
        copy="Our autonomous growth assistant monitors active trend vectors, compiles script concepts, analyzes audiences, and optimizes publishing timelines."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left Hand: Progressive Steps Panel */}
        <div className="glass-panel border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[9px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">AUTONOMIC CALIBRATION MATRIX</span>
                <h3 className="text-sm font-black text-white uppercase tracking-tight font-hanken">Workflow Phases</h3>
              </div>
              
              <button
                onClick={runAgentJob}
                disabled={isRunning}
                className="px-4 py-2 bg-brand-gradient text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-sm duration-200 active:scale-95 shrink-0"
              >
                {isRunning ? "Calibrating..." : "Run Agent Matrix"}
              </button>
            </div>

            <div className="space-y-4">
              {agentSteps.map((step, index) => {
                const isStepActive = index === activeStep;
                const isStepCompleted = index < activeStep;
                
                return (
                  <div
                    key={step}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 relative overflow-hidden",
                      isStepActive
                        ? "border-[#AEF597]/40 bg-[#AEF597]/5 shadow-sm"
                        : isStepCompleted
                        ? "border-white/5 bg-white/5"
                        : "border-white/5 bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-black transition-all font-mono",
                        isStepActive
                          ? "bg-[#AEF597] border-[#AEF597] text-slate-950 animate-pulse"
                          : isStepCompleted
                          ? "bg-emerald-400 border-emerald-400 text-slate-955"
                          : "bg-white/5 border border-white/10 text-[#a6a3bf]"
                      )}
                    >
                      {isStepCompleted ? "✓" : index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={cn("text-xs font-bold leading-tight", isStepActive ? "text-[#AEF597]" : "text-white")}>{step}</p>
                      <p className="text-[10px] font-semibold text-[#a6a3bf] uppercase tracking-wide mt-1 font-mono">
                        {["Trend scanning", "Script generation", "Tactical thumbnail analysis", "Caption CTR mapping", "Risk assessment & safety checks", "Timeline scheduling"][index]}
                      </p>
                    </div>

                    {isStepActive && (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-450 shadow-[0_0_16px_rgba(16,185,129,.8)] animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Hand: Action logs terminal & operational tracking */}
        <div className="space-y-6">
          {/* Logs terminal */}
          <div className="glass-panel-dark border-white/5 rounded-[28px] p-6 shadow-2xl space-y-4 font-mono text-[10px] min-h-[220px] flex flex-col justify-between">
            <div className="border-b border-white/5 pb-2">
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block">TELEMETRY SYSTEM STREAM</span>
            </div>

            <div className="flex-1 space-y-2 py-3 overflow-y-auto max-h-[160px] text-slate-350">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-slate-500 h-full py-8">
                  <span>Waiting for system calibration trigger...</span>
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 leading-relaxed">
                    <span className="text-[#AEF597] shrink-0">&gt;</span>
                    <span className={log.includes("COMPLETED") || log.includes("successfully") ? "text-emerald-450 font-extrabold" : ""}>{log}</span>
                  </div>
                ))
              )}
            </div>
            
            <div className="text-[7px] text-slate-550 uppercase tracking-widest pt-2 border-t border-white/5">
              WAVESHIFT AI AGENT v4.6
            </div>
          </div>

          {/* Operational Progress tracking */}
          <div className="glass-panel border-white/5 rounded-[28px] p-6 shadow-2xl space-y-5">
            <div>
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">COMPUTATIONAL TELEMETRY</span>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-hanken">Agent Load Allocations</h4>
            </div>

            <div className="space-y-4">
              {["Parsing Creator Comments", "Hook Testing Iteration", "Friday Schedule Velocity", "Brand Opportunities Matching"].map((item, index) => (
                <div key={item} className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-[#a6a3bf] uppercase tracking-wider font-mono">
                    <span>{item}</span>
                    <span className="text-[#AEF597]">{progress[index]}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative border border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#AEF597] to-[#A8F690] transition-all duration-1000 ease-out"
                      style={{ width: `${progress[index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
