"use client";

import React, { useState, useEffect } from "react";
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
  Zap,
  Play,
  Copy,
  Check
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
import { creators, growthCurve, labStages } from "@/lib/data";
import { useNexusStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const panelMotion = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const }
};

function PageHeader({ icon: Icon, title, copy }: { icon: LucideIcon; title: string; copy: string }) {
  return (
    <div className="mb-8 select-none">
      <div className="mb-2 flex items-center gap-2 text-[#AEF597]">
        <Icon className="h-4.5 w-4.5 text-[#AEF597] animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-[0.25em] font-mono">NEXUS CONTROL MATRIX</span>
      </div>
      <h1 className="max-w-4xl text-balance text-2xl font-black tracking-tight text-white sm:text-3xl leading-tight font-sans">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-xs font-medium text-[#94A3B8] leading-relaxed">{copy}</p>
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
    indigo: { 
      text: "text-[#AEF597]", 
      bg: "bg-[#AEF597]/5 border-[#AEF597]/20",
      glow: "hover:border-[#AEF597]/30 hover:shadow-[0_0_20px_rgba(174,245,151,0.08)]",
      accent: "bg-[#AEF597]",
      radial: "from-[#AEF597]/10"
    },
    emerald: { 
      text: "text-emerald-400", 
      bg: "bg-emerald-500/5 border-emerald-500/20",
      glow: "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.08)]",
      accent: "bg-emerald-400",
      radial: "from-emerald-500/10"
    },
    rose: { 
      text: "text-rose-400", 
      bg: "bg-rose-500/5 border-rose-500/20",
      glow: "hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.08)]",
      accent: "bg-rose-400",
      radial: "from-rose-500/10"
    },
    cyan: { 
      text: "text-cyan-400", 
      bg: "bg-cyan-500/5 border-cyan-500/20",
      glow: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]",
      accent: "bg-cyan-400",
      radial: "from-cyan-500/10"
    },
    mint: { 
      text: "text-emerald-400", 
      bg: "bg-emerald-500/5 border-emerald-500/20",
      glow: "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.08)]",
      accent: "bg-emerald-400",
      radial: "from-emerald-500/10"
    },
    pink: { 
      text: "text-pink-400", 
      bg: "bg-pink-500/5 border-pink-500/20",
      glow: "hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.08)]",
      accent: "bg-pink-400",
      radial: "from-pink-500/10"
    }
  };
  const currentTone = toneMap[tone] || toneMap.indigo;

  return (
    <div className={cn(
      "glass-panel border bg-[#060606]/85 border-white/5 rounded-[24px] p-5 shadow-2xl transition hover:-translate-y-0.5 duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[92px]",
      currentTone.glow
    )}>
      {/* Spotlight Radial Background Glow on Hover */}
      <div className={cn(
        "absolute -right-6 -top-6 h-20 w-20 bg-gradient-to-br to-transparent rounded-full blur-xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-40",
        currentTone.radial
      )} />

      {/* Moving Diagonal Shimmer Line */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-[900ms] ease-in-out" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105",
            currentTone.bg,
            currentTone.text
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-widest leading-none font-mono group-hover:text-white/60 transition-colors">{label}</p>
            <p className="text-base font-black text-white tracking-tight leading-none pt-1.5">{value}</p>
          </div>
        </div>

        {/* Small pulsing indicator dot on the right */}
        <span className="relative flex h-1.5 w-1.5 mr-1 shrink-0 select-none">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", currentTone.accent)} />
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", currentTone.accent)} />
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   1. DASHBOARD HOME (AI COMMAND CENTER)
   ========================================================================= */
export function DashboardHome() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Sparkles}
        title="AI Command Center"
        copy="A dynamic spatial intelligence layer monitoring attention metrics, active fatigue lifespans, and autonomous growth operations."
      />
      
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Globe Visualization */}
        <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[32px] relative min-h-[580px] overflow-hidden p-0 shadow-2xl">
          <InfluenceHeroScene compact />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,22,.65)_78%)]" />
          <div className="absolute left-6 top-6 rounded-2xl border border-[#AEF597]/20 bg-black/75 px-4 py-3 backdrop-blur-xl">
            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#AEF597] font-mono">Attention Matrix Globe</p>
            <p className="mt-1 text-xs font-extrabold text-white">42,118 Active Creator Nodes Crawled</p>
          </div>
        </div>
        
        {/* Quick Readout & Guides */}
        <div className="space-y-6 self-start">
          <div className="grid gap-4">
            <IntelligenceTile label="Trending Creators" value="+418 emerging waves" icon={TrendingUp} tone="indigo" />
            <IntelligenceTile label="Brand Opportunities" value="$12.4M forecast" icon={Target} tone="mint" />
            <IntelligenceTile label="Active Alerts" value="27 cringe anomalies" icon={RadioTower} tone="pink" />
            <IntelligenceTile label="Simulator Accuracy" value="94.2% confidence" icon={Gauge} tone="cyan" />
          </div>

          {/* Quick Onboarding Tip Card */}
          <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#AEF597]/[0.02] rounded-full blur-md" />
            <span className="text-[8px] font-extrabold text-[#AEF597] uppercase tracking-widest block mb-2 font-mono">💡 QUICK OPERATOR GUIDE</span>
            <h4 className="text-xs font-black text-white uppercase tracking-tight">How to use RateFluencer Nexus:</h4>
            <ul className="mt-3.5 space-y-3 font-mono text-[10px] text-[#94A3B8] leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#AEF597] shrink-0 font-bold">1.</span>
                <span>Select **Fatigue Radar** to vibe check oversaturated topics and discover optimal pivot pathways.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#AEF597] shrink-0 font-bold">2.</span>
                <span>Calibrate your creator profile metrics inside the dynamic **Influence DNA** space.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#AEF597] shrink-0 font-bold">3.</span>
                <span>Deploy **Autonomous AI Agents** to compile video scripts and creative briefs overnight.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. CREATOR DISCOVERY
   ========================================================================= */
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
        copy="Locate fresh, non-saturated content partners based on audience realness scores, growth indexes, and campaign fit vectors."
      />

      {/* Search and Filters */}
      <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 shadow-2xl space-y-4 select-none">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
          <input
            placeholder="Search creators by handle, specific niche tags, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-black/60 border border-white/5 focus:border-[#AEF597]/40 focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] rounded-xl text-xs font-semibold text-white placeholder-slate-650 focus:outline-none transition-all uppercase"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mr-2 font-mono">NICHE GATES:</span>
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={cn(
                "text-[9px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 uppercase tracking-wider font-mono",
                selectedNiche === niche
                  ? "bg-[#AEF597] border-[#AEF597] text-slate-950 shadow-sm font-black"
                  : "bg-black/60 border-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/[0.01]"
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
          <div className="md:col-span-2 text-center py-12 glass-panel bg-[#0A0A0A] border border-white/5 rounded-[24px] shadow-sm select-none">
            <span className="text-[#6B7280] text-xs font-bold font-mono">NO ACTIVE CREATORS FOUND MATCHING VECTOR KEYWORDS.</span>
          </div>
        ) : (
          filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.handle}
              {...panelMotion}
              transition={{ ...panelMotion.transition, delay: index * 0.05 }}
            >
              <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[28px] p-6 shadow-2xl hover:border-[#AEF597]/20 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 h-24 w-24 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none -z-10" />
                
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-base font-black text-white tracking-tight group-hover:text-[#AEF597] transition-colors font-sans">
                        {creator.name}
                      </h3>
                      <p className="text-[10px] font-bold text-[#AEF597] tracking-wider font-mono mt-0.5">
                        {creator.handle}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest block mb-1 font-mono">Aura Index</span>
                      <span className="bg-[#AEF597]/10 border border-[#AEF597]/20 text-[#AEF597] text-xs font-black px-2.5 py-1 rounded-lg leading-none font-mono">
                        {creator.score}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-white leading-relaxed mb-6 bg-black/40 border border-white/5 rounded-xl p-3.5 font-mono">
                    <span className="font-extrabold text-[#6B7280] block text-[8px] uppercase tracking-widest mb-1.5">NICHE SECTOR Focus</span>
                    {creator.niche.toUpperCase()}
                  </div>

                  <div className="space-y-4 mb-6 select-none">
                    {[
                      { label: "Glowup Potential", val: creator.growth },
                      { label: "Realness (No Cap)", val: creator.authenticity },
                      { label: "Viral Propensity", val: creator.virality }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-[9px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
                          <span>{item.label}</span>
                          <span className="text-[#AEF597]">{item.val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative border border-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#AEF597] to-[#A8F690] transition-all duration-1000 ease-out"
                            style={{ width: `${item.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[9px] font-bold text-white bg-black/40 border border-white/5 rounded-xl p-3 flex items-center justify-between mt-auto font-mono">
                  <span className="text-[#6B7280] uppercase tracking-widest">Target Nurture Niche:</span>
                  <span className="uppercase text-[#AEF597] font-black">{creator.audience}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   3. INFLUENCE DNA (CREATOR DIGITAL TWIN)
   ========================================================================= */
export function DnaProfilePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [activeCreator, setActiveCreator] = useState<string>("Mira Vale");
  
  // Biometric presets
  const [realness, setRealness] = useState(95);
  const [trust, setTrust] = useState(88);
  const [growthVal, setGrowthVal] = useState(92);
  const [virality, setVirality] = useState(89);
  const [brandFit, setBrandFit] = useState(86);
  const [community, setCommunity] = useState(93);

  const selectCreatorPreset = (name: string) => {
    setActiveCreator(name);
    if (name === "Mira Vale") {
      setRealness(95);
      setTrust(88);
      setGrowthVal(92);
      setVirality(89);
      setBrandFit(86);
      setCommunity(93);
    } else if (name === "Ari North") {
      setRealness(88);
      setTrust(90);
      setGrowthVal(98);
      setVirality(96);
      setBrandFit(82);
      setCommunity(91);
    } else if (name === "Nia Sol") {
      setRealness(97);
      setTrust(94);
      setGrowthVal(87);
      setVirality(84);
      setBrandFit(90);
      setCommunity(89);
    } else if (name === "Kai Atlas") {
      setRealness(90);
      setTrust(89);
      setGrowthVal(94);
      setVirality(91);
      setBrandFit(88);
      setCommunity(93);
    }
  };

  const currentDnaMetrics = [
    { subject: "REALNESS (NO CAP)", value: realness },
    { subject: "TRUST FACTOR (W)", value: trust },
    { subject: "HYPE RATE (GLOWUP)", value: growthVal },
    { subject: "RIZZ RATE (VIRAL)", value: virality },
    { subject: "BRAND FIT (SLAY)", value: brandFit },
    { subject: "SQUAD HYPE (AURA)", value: community }
  ];

  const auraScore = Math.round((realness + trust + growthVal + virality + brandFit + community) / 6);

  const getAuraBadge = () => {
    if (auraScore >= 93) return "MAIN CHARACTER (GOD TIER)";
    if (auraScore >= 87) return "W RIZZ (VERY BASED)";
    if (auraScore >= 80) return "DRIPPHY (PASSABLE)";
    return "SUS VIBES (DO NOT POST)";
  };

  const getNicheLabel = () => {
    if (activeCreator === "Mira Vale") return "Wellness stans";
    if (activeCreator === "Ari North") return "Creator-tech adopters";
    if (activeCreator === "Nia Sol") return "Low-equip fitness buffs";
    if (activeCreator === "Kai Atlas") return "Future foodies";
    return "Custom vibe circles";
  };

  const getTrustLabel = () => {
    if (activeCreator === "Mira Vale") return "0.92 trust density";
    if (activeCreator === "Ari North") return "0.88 tech rating";
    if (activeCreator === "Nia Sol") return "0.97 peak realness";
    if (activeCreator === "Kai Atlas") return "0.90 taste score";
    return `0.${trust} custom rating`;
  };

  const getAiSpit = () => {
    const handle = activeCreator === "Mira Vale" ? "@miravalelabs" :
                   activeCreator === "Ari North" ? "@northframes" :
                   activeCreator === "Nia Sol" ? "@niasolfit" :
                   activeCreator === "Kai Atlas" ? "@kaiatlas.eats" : "@custom-twin";
    
    if (activeCreator === "Mira Vale") {
      return `Mira Vale (${handle}) is severely underpriced. Her REALNESS (NO CAP) index of ${realness}% converts wellness stans at a 2.3x higher rate. Audience loyalty is incredibly solid, making her the perfect choice to anchor clean biohacking campaigns.`;
    }
    if (activeCreator === "Ari North") {
      return `Ari North (${handle}) is absolutely cooking in AI filmmaking. With a RIZZ RATE of ${virality}% and HYPE RATE of ${growthVal}%, his content is prime-time attention bait for technical adopters. Ideal for fast-paced design launches.`;
    }
    if (activeCreator === "Nia Sol") {
      return `Nia Sol (${handle}) represents elite trust density. Her TRUST FACTOR is at ${trust}%, backed by zero clout chasing. Routine fitness showcases convert beginners exceptionally well due to high authentic retention.`;
    }
    if (activeCreator === "Kai Atlas") {
      return `Kai Atlas (${handle}) is leading the future food segment. The SQUAD HYPE stands at ${community}%, demonstrating highly engaged urban stans who active-save cooking hacks. High potential for organic product launches.`;
    }
    
    return `Custom Creator Twin (${handle}) shows an Aura rating of ${auraScore}%. Adjusting your core biometric sliders reveals that your ${realness >= 90 ? "unmatched realness" : "current niche"} maps to a solid vibe check. Deploy rizz immediately to bypass standard saturation!`;
  };

  if (!mounted) {
    return (
      <div className="space-y-8 animate-fade-in-up text-[#B3B3B3] font-mono">
        <PageHeader
          icon={RadarIcon}
          title="INFLUENCE DNA // CREATOR DIGITAL TWIN"
          copy="Influence DNA models creators as living market signals across aura, realness, creative rizz, and hype velocity."
        />
        <div className="rounded-[32px] border border-white/5 bg-[#0A0A0A] p-12 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="flex items-center gap-3 text-xs text-[#AEF597] font-black uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#AEF597] animate-ping shrink-0" />
            <span>SYNCHRONIZING CREATOR DIGITAL TWIN BIOMETRICS...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up text-[#B3B3B3] font-mono">
      <PageHeader
        icon={RadarIcon}
        title="Influence DNA"
        copy="Models any digital creator profile as a dynamic signature fingerprint covering authenticity, realness, virality potential, and community trust."
      />

      {/* Creator selector bar */}
      <div className="flex flex-wrap gap-2 bg-[#0A0A0A] border border-white/5 p-2 rounded-2xl select-none">
        {(["Mira Vale", "Ari North", "Nia Sol", "Kai Atlas", "Custom Twin"] as const).map((name) => (
          <button
            key={name}
            onClick={() => {
              if (name === "Custom Twin") {
                setActiveCreator("Custom Twin");
              } else {
                selectCreatorPreset(name);
              }
            }}
            className={cn(
              "text-[10px] font-black px-4 py-2.5 rounded-xl border transition-all duration-150 uppercase tracking-wider font-mono",
              activeCreator === name
                ? "bg-[#AEF597] border-[#AEF597] text-slate-955 shadow-[0_0_12px_rgba(174,245,151,0.2)] font-black"
                : "bg-black/40 border-white/5 text-[#6B7280] hover:text-white hover:bg-white/[0.01]"
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* Left Side: Radar Chart Panel + Sliders */}
        <div className="glass-panel border border-white/5 rounded-[32px] p-6 shadow-2xl bg-[#0A0A0A] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
          
          <div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
              <div>
                <span className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest block font-mono">BIOMETRIC SIGNAL MATRIX</span>
                <h3 className="text-xs font-black text-white uppercase tracking-tight font-mono">Aura Competency Sweep</h3>
              </div>
              
              <div className="text-right">
                <span className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest block">OVERALL AURA RATE</span>
                <span className="text-base font-black text-[#AEF597] font-mono">{auraScore}%</span>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="h-[280px] flex items-center justify-center relative w-full overflow-hidden mb-6 bg-black/40 rounded-2xl border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={currentDnaMetrics} outerRadius="70%">
                  <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#6B7280", fontSize: 8, fontWeight: "bold" }} />
                  <Radar dataKey="value" stroke="#AEF597" fill="#AEF597" fillOpacity={0.15} strokeWidth={2.5} />
                  <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 10, color: "#fff", fontFamily: "monospace" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Slider Controls */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <span className="text-[9px] font-extrabold text-[#AEF597] uppercase tracking-wider block">🧬 FINE-TUNE CUSTOM AURA WEIGHTS</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "REALNESS (NO CAP)", val: realness, setter: setRealness },
                  { label: "TRUST FACTOR (W)", val: trust, setter: setTrust },
                  { label: "HYPE RATE (GLOWUP)", val: growthVal, setter: setGrowthVal },
                  { label: "RIZZ RATE (VIRAL)", val: virality, setter: setVirality },
                  { label: "BRAND FIT (SLAY)", val: brandFit, setter: setBrandFit },
                  { label: "SQUAD HYPE (AURA)", val: community, setter: setCommunity }
                ].map((slider) => (
                  <div key={slider.label} className="space-y-1 bg-black/60 border border-white/5 rounded-xl p-3">
                    <div className="flex justify-between items-center text-[9px] font-bold text-[#6B7280]">
                      <span>{slider.label}</span>
                      <span className="text-white font-mono">{slider.val}%</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={slider.val}
                      onChange={(e) => {
                        slider.setter(Number(e.target.value));
                        if (activeCreator !== "Custom Twin") setActiveCreator("Custom Twin");
                      }}
                      className="w-full accent-[#AEF597] h-1 bg-white/5 rounded-lg cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side telemetry widgets */}
        <div className="space-y-6 flex flex-col justify-between select-none">
          <div className="space-y-6">
            <IntelligenceTile label="AUDIENCE COHORT FOCUS" value={getNicheLabel()} icon={BadgeCheck} tone="mint" />
            <IntelligenceTile label="TRUST COEFFICIENT" value={getTrustLabel()} icon={ShieldCheck} />

            {/* Growth Curve */}
            <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[28px] p-6 shadow-2xl space-y-4">
              <div>
                <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">HYPE SPEED TELEMETRY</span>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">7-Day Growth Projection</h4>
              </div>

              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthCurve} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 8, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 8, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 9, color: "#fff", fontFamily: "monospace" }} />
                    <defs>
                      <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#AEF597" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#AEF597" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="nexus" stroke="#AEF597" fill="url(#emeraldGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[28px] p-6 shadow-2xl space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2 text-[#AEF597]">
                <BrainCircuit className="h-4 w-4 text-[#AEF597] animate-bounce" />
                <h4 className="text-xs font-black uppercase tracking-wider font-mono">DNA Biometric Verdict</h4>
              </div>
              <span className="text-[8px] font-black text-white bg-white/10 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest block font-mono">
                {getAuraBadge()}
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-[#B3B3B3] font-mono leading-relaxed select-text">
              {getAiSpit()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. CAMPAIGN SIMULATOR
   ========================================================================= */
export function CampaignLabPage() {
  const { budget, goal, setBudget, setGoal } = useNexusStore();
  const success = Math.min(96, Math.round(68 + budget / 4200 + (goal === "Conversion" ? 6 : 2)));
  const roi = (2.1 + budget / 100000).toFixed(1);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Orbit}
        title="Predictive Campaign Simulator"
        copy="Estimate campaign conversions, overall reach margins, and ROI index before launching marketing budgets."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Simulator Inputs Panel */}
        <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6 flex flex-col justify-between select-none">
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[9px] font-bold text-[#AEF597] uppercase tracking-widest block mb-1 font-mono">SIMULATION COEFFICIENT</span>
              <h3 className="text-xs font-black text-white uppercase tracking-tight font-mono">Input Parameters</h3>
            </div>

            {/* Budget range slider */}
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block font-mono font-bold">Allocated Budget</span>
              <input
                type="range"
                min={20000}
                max={180000}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="w-full accent-[#AEF597] h-1.5 bg-white/5 rounded-lg cursor-pointer border border-white/10"
              />
              <p className="text-3xl font-black text-[#AEF597] tracking-tight font-mono">${budget.toLocaleString()}</p>
            </div>

            {/* Goal selector */}
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block font-mono font-bold">Optimization Goal</span>
              <div className="grid grid-cols-3 gap-2">
                {(["Awareness", "Conversion", "Retention"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setGoal(item)}
                    className={cn(
                      "text-[9px] font-bold px-2 py-2.5 rounded-xl border transition-all duration-200 uppercase tracking-wider font-mono",
                      goal === item
                        ? "bg-[#AEF597] border-[#AEF597] text-slate-950 shadow-sm font-black"
                        : "bg-black/60 border-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/[0.01]"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-black/40 p-4 text-[9px] font-bold text-[#6B7280] flex flex-col gap-1.5 mt-6 font-mono">
            <div className="flex justify-between">
              <span>Target Brand:</span>
              <span className="text-white font-black uppercase">Astra Skin Inc</span>
            </div>
            <div className="flex justify-between">
              <span>Primary Partner:</span>
              <span className="text-white font-black uppercase">Mira Vale (@miravalelabs)</span>
            </div>
          </div>
        </div>

        {/* Right side outcome metrics & graphs */}
        <div className="grid gap-6 sm:grid-cols-2">
          <IntelligenceTile label="Success Probability" value={`${success}%`} icon={Target} tone="mint" />
          <IntelligenceTile label="ROI Forecast" value={`${roi}x`} icon={TrendingUp} />
          <IntelligenceTile label="Risk Rating" value="Low Risk / 12" icon={ShieldCheck} />
          <IntelligenceTile label="Simulated Reach" value="18.6M stans" icon={RadioTower} tone="pink" />

          {/* Recharts Bar Chart */}
          <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 shadow-2xl sm:col-span-2 space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">MATHEMATICAL TELEMETRY OUTCOME</span>
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Simulation Forecast Matrix</h4>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Reach Potential", value: 82 },
                  { name: "SQUAD Engaged", value: 78 },
                  { name: "Conversions", value: success },
                  { name: "Brand Safety", value: 92 }
                ]} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 10, color: "#fff" }} />
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

/* =========================================================================
   5. CONTENT COOKHOUSE / STUDIO
   ========================================================================= */
export function ContentLabPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [topicInput, setTopicInput] = useState("");
  const [activeTopic, setActiveTopic] = useState("Quiet Biohacking");
  const [isCooking, setIsCooking] = useState(false);

  const handleCookAssets = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    
    setIsCooking(true);
    let stage = 0;
    
    const interval = setInterval(() => {
      if (stage < 5) {
        setActiveStage(stage);
        stage++;
      } else {
        clearInterval(interval);
        setIsCooking(false);
        setActiveTopic(topicInput);
        setTopicInput("");
      }
    }, 500);
  };

  const getStageOutput = () => {
    const topic = activeTopic.toUpperCase();
    if (activeStage === 0) {
      return {
        tag: "STAGE 1 // OVERUSE RATIO DIAGNOSTIC",
        main: `Parsed 18.4M digital nodes. '${topic}' shows strong overlap with falling organic search indexes, making it a high-potential reverse attention wave.`,
        desc: "CRUNCHED METRICS: Overuse Index: 34%, Burnout Risk: Low, Attention Density Index: 89%."
      };
    }
    if (activeStage === 1) {
      return {
        tag: "STAGE 2 // RIZZ VIDEO COLD OPEN & OUTLINE",
        main: `“Everyone is standard-posting about ${activeTopic}—so I banned all generic templates and built this instead.”`,
        desc: "AUDIO FLOW GUIDE: 0-3s: Immediate pattern interrupt, 4-15s: Show real proof of work, 16-25s: Audience call-out, 26-30s: Save trigger."
      };
    }
    if (activeStage === 2) {
      return {
        tag: "STAGE 3 // VISUAL BRIEF FOR THUMBNAIL DESIGN",
        main: `Renders an elevated carbon background with a vibrant, glowing #AEF597 (lime-green) vector line charting '${topic}' performance. Use thin monospace font overlays.`,
        desc: "CRITICAL BRIEF: Banish high-contrast shock faces. Shift to professional, quiet cyber-terminal wireframe layouts."
      };
    }
    if (activeStage === 3) {
      return {
        tag: "STAGE 4 // HIGH RETENTION SOCIAL CAPTION",
        main: `Standard templates for '${activeTopic}' are officially cooked. Reclaim your stans. 👇\n\nNo clout chasing. Just proof of work.\n\n#${activeTopic.toLowerCase().replace(/\s+/g, '')} #nocap #based`,
        desc: "STRUCTURE SPECS: Short line breaks, zero emojis in body, clean font formatting, high-relevancy hashtags only."
      };
    }
    
    return {
      tag: "STAGE 5 // VIRAL VELOCITY FORECAST BRIEF",
      main: `Telemetry predicts '${topic}' asset package has a massive W Potential. Engagement retention remains high due to premium, non-cringe scripting formats.`,
      desc: "VIRAL RADAR: Peak engagement potential between 7PM-9PM, exceptionally high direct sharing coefficient."
    };
  };

  const getStageForecast = () => {
    const score = activeStage === 0 ? 82 :
                  activeStage === 1 ? 94 :
                  activeStage === 2 ? 88 :
                  activeStage === 3 ? 91 : 96;
                   
    const metric = activeStage === 0 ? "SATURATION COEFFICIENT" :
                   activeStage === 1 ? "HOOK RETENTION EXPECTANCY" :
                   activeStage === 2 ? "CTR ACCELERATION SCORE" :
                   activeStage === 3 ? "SAVE PROBABILITY INDEX" : "OVERALL W RATE";
                   
    const desc = activeStage === 0 ? "Very low crowd density in this specific niche, leaving huge organic gaps to exploit." :
                 activeStage === 1 ? "Strong initial retention hook prevents early user swipes." :
                 activeStage === 2 ? "High contrast visual terminal layout increases curiosity." :
                 activeStage === 3 ? "Tactical value-add breakdown prompts viewers to save for reference." :
                 "Peak structural score. This content package is fully cooked and ready to ship.";
                 
    return { score, metric, desc };
  };

  const outputData = getStageOutput();
  const forecastData = getStageForecast();

  return (
    <div className="space-y-8 animate-fade-in-up text-[#B3B3B3] font-mono">
      <PageHeader
        icon={Flame}
        title="AI Creator Cookhouse"
        copy="Turn raw trend fatigue readings into script hooks, graphic thumbnail specs, custom captions, and virality forecasts."
      />

      {/* Target Topic Input Box */}
      <form onSubmit={handleCookAssets} className="flex gap-3 bg-[#0A0A0A] border border-white/5 p-4 rounded-[20px] shadow-2xl items-center relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
        <div className="flex-1 space-y-1">
          <span className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest block">ENTER TARGET TOPIC</span>
          <input
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            disabled={isCooking}
            placeholder={isCooking ? "COMPILING SYSTEM WARES..." : `ACTIVE: ${activeTopic.toUpperCase()} // INPUT NEXT CONCEPT...`}
            className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-white placeholder-white/20 focus:border-[#AEF597]/40 focus:outline-none focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] transition-all uppercase"
          />
        </div>
        
        <button
          type="submit"
          disabled={isCooking || !topicInput.trim()}
          className="h-12 flex items-center justify-center gap-2 rounded-xl bg-brand-gradient hover:shadow-button-glow px-6 text-xs font-black text-slate-950 transition-all active:scale-95 disabled:opacity-50 shrink-0 self-end"
        >
          <Flame className="h-4 w-4 text-slate-955 animate-pulse" />
          <span>{isCooking ? "COMPILING..." : "COOK ASSETS"}</span>
        </button>
      </form>

      {/* Stage Grid */}
      <div className="grid gap-4 sm:grid-cols-5 select-none">
        {labStages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === activeStage;
          const getGenZStatus = (idx: number) => {
            if (idx === 0) return "SCANNING COHORTS";
            if (idx === 1) return "RIZZ DRAFTING";
            if (idx === 2) return "DRIP COMPILING";
            if (idx === 3) return "THE TEA CAPTION";
            return "AURA PREDICTION";
          };
          return (
            <motion.div
              key={stage.title}
              {...panelMotion}
              transition={{ ...panelMotion.transition, delay: index * 0.05 }}
              className="h-full"
            >
              <div
                onClick={() => {
                  if (!isCooking) setActiveStage(index);
                }}
                className={cn(
                  "glass-panel border rounded-[24px] p-5 h-full cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-2xl bg-[#0A0A0A] border-white/5",
                  isActive
                    ? "border-[#AEF597]/40 ring-2 ring-[#AEF597]/5 shadow-[0_12px_35px_rgba(174,245,151,0.05)] bg-[#AEF597]/5"
                    : "hover:border-[#AEF597]/20 hover:-translate-y-0.5"
                )}
              >
                <div className="absolute top-0 right-0 h-12 w-12 bg-[#AEF597]/[0.01] rounded-full blur-md" />
                <div>
                  <div
                    className={cn(
                      "mb-4 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300",
                      isActive
                        ? "bg-[#AEF597] border-[#AEF597] text-slate-950"
                        : "bg-black/60 border border-white/5 text-[#AEF597] group-hover:bg-[#AEF597] group-hover:border-[#AEF597] group-hover:text-slate-955"
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-[10px] font-black tracking-tight text-white leading-tight uppercase font-sans">
                    {stage.title === "Script" ? "Rizz Hook Script" :
                     stage.title === "Thumbnail" ? "Drip Thumbnail" :
                     stage.title === "Caption" ? "The Tea Caption" : stage.title}
                  </h3>
                </div>
                <p className="mt-4 text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest leading-relaxed pt-2 border-t border-white/5 font-mono">
                  {isCooking && index === activeStage ? "COOKING..." : getGenZStatus(index)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Generated Outputs Card */}
      <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 shadow-2xl grid gap-6 md:grid-cols-2 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-32 w-32 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />

        <div className="rounded-[24px] border border-white/5 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[8px] font-bold text-[#AEF597] bg-[#AEF597]/10 border border-[#AEF597]/20 px-2 py-0.5 rounded uppercase tracking-wider inline-block font-mono">
              {outputData.tag}
            </span>
            <p className="text-sm font-bold text-white leading-relaxed font-mono select-text italic">
              {outputData.main}
            </p>
          </div>
          <p className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wide leading-relaxed border-t border-white/5 pt-3 font-mono">
            {outputData.desc}
          </p>
        </div>

        <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/[0.01] p-6 flex flex-col justify-between relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/[0.01] rounded-full blur-xl" />
          <div className="space-y-2">
            <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider inline-block font-mono">
              {forecastData.metric}
            </span>
            <p className="text-5xl font-black text-emerald-400 tracking-tighter leading-none pt-2 font-mono">{forecastData.score}%</p>
          </div>
          <p className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wide leading-relaxed border-t border-[#AEF597]/10 pt-3 font-mono">
            VIBE INDEX CHECKSUM: {forecastData.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. PREDICTIVE ANALYTICS
   ========================================================================= */
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
        copy="Locate structural inflection windows, attention curves, and volume decay matrices plotted in real time."
      />

      {/* Grid Summary Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <IntelligenceTile label="Market Movement Velocity" value="+18.7%" icon={Activity} tone="cyan" />
        <IntelligenceTile label="Hidden Gems Identified" value="1,284" icon={Gem} tone="mint" />
        <IntelligenceTile label="Operational Risk Saved" value="$3.8M" icon={ShieldCheck} tone="pink" />
        <IntelligenceTile label="AI Model Calibration" value="94% W Rating" icon={Zap} tone="indigo" />
      </div>

      {/* Deep-Dive Chart Panel */}
      <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 select-none">
          <div>
            <span className="text-[9px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">Attention curves matrix</span>
            <h3 className="text-xs font-black text-white uppercase tracking-tight font-mono">System Forecast Diagnostics</h3>
          </div>

          <div className="flex gap-2">
            {[
              { id: "growth", label: "Attention Growth" },
              { id: "fatigue", label: "Fatigue Horizon" },
              { id: "velocity", label: "Velocity Curve" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMetricTab(tab.id as "growth" | "fatigue" | "velocity")}
                className={cn(
                  "text-[9px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 uppercase tracking-wider font-mono",
                  activeMetricTab === tab.id
                    ? "bg-[#AEF597] border-[#AEF597] text-slate-950 shadow-sm font-black"
                    : "bg-black/60 border-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/[0.01]"
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
                  <stop offset="0%" stopColor={activeMetricTab === "growth" ? "#AEF597" : currentStrokeColor} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={activeMetricTab === "growth" ? "#AEF597" : currentStrokeColor} stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="legacyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.02)" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 9, fontWeight: "bold" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, fontSize: 10, color: "#fff" }} />
              
              <Area type="monotone" dataKey="legacy" name="Legacy standard" stroke="rgba(255,255,255,0.15)" strokeWidth={2} strokeDasharray="4 4" fill="url(#legacyGrad)" />
              <Area type="monotone" dataKey="nexus" name="WaveShift Nexus" stroke={activeMetricTab === "growth" ? "#AEF597" : currentStrokeColor} strokeWidth={3} fill={`url(#${chartGradientId})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-white/5 text-[9px] font-bold text-[#6B7280] uppercase tracking-widest font-mono select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-[#AEF597] rounded-full inline-block" />
            <span className="text-white font-extrabold">NEXUS ATTENTION WAVE</span>
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

/* =========================================================================
   7. AUTONOMOUS AI AGENT
   ========================================================================= */
type AgentType = "sniper" | "alchemist" | "strategist";

export function AIAgentPage() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>([72, 79, 86, 93]);
  
  // Custom states for selectable agents
  const [agentType, setAgentType] = useState<AgentType>("sniper");
  const [copied, setCopied] = useState<boolean>(false);
  const [showBrief, setShowBrief] = useState<boolean>(false);

  const runAgentJob = () => {
    setIsRunning(true);
    setActiveStep(0);
    setShowBrief(false);
    
    const baseLogs = {
      sniper: [
        "INITIALIZING: trend vectors scan...",
        "CRAWLING: Instagram comment sections...",
        "CRUNCHING: yikes and cringe semantic keywords...",
        "ISOLATING: fatigue decay coefficients...",
        "SUCCESS: high-potential organic opportunity wave isolated!"
      ],
      alchemist: [
        "PARSING: social hooks logs...",
        "SWEPING: low-retention video parameters...",
        "COMPILING: premium, non-cringe video open...",
        "Calibrating: structural hook pacing timings...",
        "SUCCESS: high-virality, anti-slop copy ready!"
      ],
      strategist: [
        "FETCHING: daily engagement curves...",
        "ANALYZING: category contrast spectrums...",
        "MAPPING: publisher velocity parameters...",
        "SCHEDULING: prime-attention time window...",
        "SUCCESS: creative contrast thumbnail outlines locked!"
      ]
    }[agentType];

    setLogs([`[+] DEPLOYED ${agentType.toUpperCase()} AGENT MATRIX`, `> ${baseLogs[0]}`, `> ${baseLogs[1]}`]);

    setTimeout(() => {
      setActiveStep(1);
      setLogs((prev) => [...prev, `> ${baseLogs[2]}`, `> ${baseLogs[3]}`]);
      setProgress([84, 82, 86, 93]);

      setTimeout(() => {
        setActiveStep(2);
        setLogs((prev) => [...prev, `> ${baseLogs[4]}`]);
        setProgress([84, 91, 89, 93]);

        setTimeout(() => {
          setActiveStep(3);
          setLogs((prev) => [
            ...prev,
            `[+] ${agentType.toUpperCase()} CALIBRATION FINISHED SUCCESSFULLY.`,
            `[+] Compiled strategic brief mapped below.`
          ]);
          setProgress([96, 95, 98, 97]);
          setIsRunning(false);
          setShowBrief(true);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const getAgentBrief = () => {
    if (agentType === "sniper") {
      return `========================================
[ NEXUS AI CREATIVE BRIEF // NICHE SNIPER ]
========================================
TARGET saturated TREND: Faceless AI Motivational Reels
FATIGUE HORIZON: 94.2% (Burnout reached)
ALTERNATIVE OPPORTUNITY WAVE: Raw, unedited founder build-in-public logs.
GEN Z CORE Pivot DIRECTION: Stop performative slop. Viewers swipe away instantly upon seeing stock images and robotic voices. Focus on real code margins, messy coding desks, and authentic failure readouts.
EXPECTED CONVERSIONS LIFT: +148% CTR recovery within 72 hours.
========================================`;
    }
    if (agentType === "alchemist") {
      return `========================================
[ NEXUS AI CREATIVE BRIEF // SCRIPT ALCHEMIST ]
========================================
TARGET saturated TREND: Performative "5AM Hustle Routines"
DISRUPTIVE NARRATIVE OPENER:
“Stop waking up at 5AM just to film aesthetic coffee loops. The algorithm is sick of it, and so are your stans. Here is the messy late-night engineering log that actually built our app...”
AUDIO FLOW TIMING SKELETON:
- 0-3s: Loud pattern interrupt (throw coffee away)
- 4-12s: Show terminal code logs and raw server analytics
- 13-22s: Call out the performative morning routine influencers
- 23-30s: Prompt stans to active-save the tutorial
========================================`;
    }
    
    // strategist
    return `========================================
[ NEXUS AI CREATIVE BRIEF // VISUAL STRATEGIST ]
========================================
TARGET saturated TREND: Clean Pastel Minimalism
CONTRAST COLOR SCHEME: Carbon Dark mesh + Neon Lime (#AEF597) wireframe lines.
THUMBNAIL typography GUIDELINES:
Thin monospace font overlays reading "[DECRYPTED]" or "[PROOF OF WORK]". Absolute ban on shock faces or high-saturation red arrows.
PUBLISHING WINDOW ACCELERATION:
Deploy videos on Monday and Wednesday at exactly 6:45 PM. Velocity tracking maps a major organic reach gap in that specific time gate.
========================================`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getAgentBrief());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSimplifiedStepExplanation = (idx: number) => {
    return [
      "Audits comments across social graphs to find cringe words (cringe, skip, ad).",
      "Drafts custom script hooks that go directly counter to the saturated slop.",
      "Optimizes thumbnail typography contrast grids and visual heatmaps.",
      "Identifies the exact day and hour audience attention metrics peak."
    ][idx] || "";
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        icon={Bot}
        title="Autonomous AI Growth Agent"
        copy="Configure and run specialized background agents to crawl active social feeds, diagnose trend fatigue, and write custom copyable script drafts."
      />

      {/* Interactive Role Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#AEF597] animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-wider font-mono">SELECT AUTONOMOUS AGENT TYPE:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "sniper", label: "🎯 Niche Sniper", desc: "Finds high-potential untapped keywords" },
            { id: "alchemist", label: "📝 Script Alchemist", desc: "Generates high-retention video script opens" },
            { id: "strategist", label: "🎨 Visual Strategist", desc: "Outlines thumbnail layouts and times" }
          ].map((agent) => (
            <button
              key={agent.id}
              onClick={() => {
                if (!isRunning) {
                  setAgentType(agent.id as AgentType);
                  setShowBrief(false);
                  setLogs([]);
                }
              }}
              disabled={isRunning}
              title={agent.desc}
              className={cn(
                "text-[10px] font-black px-4 py-2.5 rounded-xl border transition-all duration-150 uppercase tracking-wider font-mono",
                agentType === agent.id
                  ? "bg-[#AEF597] border-[#AEF597] text-slate-955 shadow-[0_0_12px_rgba(174,245,151,0.2)] font-black"
                  : "bg-black/60 border-white/5 text-[#6B7280] hover:text-white hover:bg-white/[0.01]"
              )}
            >
              {agent.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        
        {/* Left Hand: Workflow Steps */}
        <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6 flex flex-col justify-between select-none">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
              <div>
                <span className="text-[8px] font-extrabold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">COGNITIVE CALIBRATION MATRIX</span>
                <h3 className="text-xs font-black text-white uppercase tracking-tight">System Workflow Steps</h3>
              </div>
              
              <button
                onClick={runAgentJob}
                disabled={isRunning}
                className="px-4 py-2 bg-brand-gradient text-slate-955 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-sm duration-200 active:scale-95 shrink-0 flex items-center gap-1.5"
              >
                <Play className="h-3 w-3 fill-current text-slate-955" />
                <span>{isRunning ? "Calibrating..." : "Launch Agent Pipeline"}</span>
              </button>
            </div>

            <div className="space-y-4">
              {["Trend Scanning Diagnostic", "Anti-Slop Script Writer", "Thumbnail Visual Mapping", "Publish Timeline Optimizer"].map((step, index) => {
                const isStepActive = index === activeStep;
                const isStepCompleted = index < activeStep;
                
                return (
                  <div
                    key={step}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 relative overflow-hidden",
                      isStepActive
                        ? "border-[#AEF597]/40 bg-[#AEF597]/5 shadow-sm"
                        : "border-white/5 bg-black/40"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[10px] font-black transition-all font-mono mt-0.5",
                        isStepActive
                          ? "bg-[#AEF597] border-[#AEF597] text-slate-955 animate-pulse"
                          : isStepCompleted
                          ? "bg-emerald-400 border-emerald-400 text-slate-955"
                          : "bg-white/5 border border-white/10 text-[#6B7280]"
                      )}
                    >
                      {isStepCompleted ? "✓" : index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={cn("text-xs font-black leading-none", isStepActive ? "text-[#AEF597]" : "text-white")}>{step.toUpperCase()}</p>
                      <p className="text-[9px] font-semibold text-[#6B7280] uppercase tracking-wide mt-1.5 font-mono">
                        {getSimplifiedStepExplanation(index)}
                      </p>
                    </div>

                    {isStepActive && (
                      <span className="h-2 w-2 rounded-full bg-emerald-450 shadow-[0_0_16px_rgba(16,185,129,.8)] animate-ping mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Hand: Action logs terminal */}
        <div className="space-y-6">
          
          {/* Logs terminal */}
          <div className="glass-panel bg-[#090716]/65 border border-white/5 rounded-[28px] p-6 shadow-2xl space-y-4 font-mono text-[9px] min-h-[220px] flex flex-col justify-between select-none">
            <div className="border-b border-white/5 pb-2.5">
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block">TELEMETRY STREAM CLI</span>
            </div>

            <div className="flex-1 space-y-2 py-3 overflow-y-auto max-h-[160px] text-slate-400">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-slate-650 h-full py-8">
                  <span>SYSTEM ONLINE. WAITING FOR PIPELINE EXECUTION...</span>
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 leading-relaxed">
                    <span className="text-[#AEF597] shrink-0">&gt;</span>
                    <span className={log.includes("SUCCESS") || log.includes("SUCCESSFULLY") ? "text-emerald-400 font-extrabold" : ""}>{log}</span>
                  </div>
                ))
              )}
            </div>
            
            <div className="text-[7px] text-[#6B7280] uppercase tracking-widest pt-2 border-t border-white/5">
              NEXUS CALIBRATION AGENT v4.6
            </div>
          </div>

          {/* Operational Progress tracking */}
          <div className="glass-panel bg-[#0A0A0A] border border-white/5 rounded-[28px] p-6 shadow-2xl space-y-5 select-none">
            <div>
              <span className="text-[8px] font-bold text-[#AEF597] uppercase tracking-widest block mb-0.5 font-mono">COMPUTATIONAL ALLOCATIONS</span>
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Agent Performance Load</h4>
            </div>

            <div className="space-y-4">
              {["Parsing Comment Entropy", "Hook Iterations Swept", "Publishing Window Velocity", "Disruptive Fit Matching"].map((item, index) => (
                <div key={item} className="space-y-1">
                  <div className="flex justify-between text-[8px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
                    <span>{item}</span>
                    <span className="text-[#AEF597]">{progress[index]}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden relative border border-white/10">
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

      {/* Dynamic Strategic Brief Output Area */}
      {showBrief && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel bg-[#0A0A0A] border border-[#AEF597]/20 rounded-[32px] p-8 shadow-[0_12px_36px_rgba(174,245,151,0.06)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-32 w-32 bg-[#AEF597]/[0.01] rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#AEF597]/15 border border-[#AEF597]/20 text-[#AEF597] animate-radar">
                <BrainCircuit className="h-4.5 w-4.5 text-[#AEF597]" />
              </div>
              <div>
                <span className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-widest block font-mono">GENERATED SYSTEM DELIVERABLE</span>
                <h3 className="text-xs font-black text-white uppercase tracking-tight font-mono">Dynamic Strategic Creative Brief</h3>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 active:scale-95",
                copied 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" 
                  : "bg-white/5 text-white border border-white/10 hover:border-white/20 hover:bg-white/10"
              )}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Brief Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Brief</span>
                </>
              )}
            </button>
          </div>

          {/* Text Output Box */}
          <div className="bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xs text-[#AEF597] leading-relaxed whitespace-pre-wrap select-text selection:bg-[#AEF597]/20">
            {getAgentBrief()}
          </div>

          <div className="mt-6 text-[8px] text-[#6B7280] uppercase tracking-widest flex items-center gap-1 font-mono select-none">
            <ShieldCheck className="h-3.5 w-3.5 text-[#AEF597]" />
            <span>This creative brief represents mathematically optimal outputs computed to pivot against trend burnout.</span>
          </div>
        </motion.div>
      )}

    </div>
  );
}
