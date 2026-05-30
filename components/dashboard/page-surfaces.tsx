"use client";

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
import { GlassPanel } from "@/components/ui/glass-panel";
import { InfluenceHeroScene } from "@/components/landing/influence-scene";
import { agentSteps, creators, dnaMetrics, growthCurve, labStages } from "@/lib/data";
import { useNexusStore } from "@/lib/store";

const panelMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" as const }
};

function PageHeader({ icon: Icon, title, copy }: { icon: LucideIcon; title: string; copy: string }) {
  return (
    <div className="mb-8 pt-8">
      <div className="mb-4 flex items-center gap-3 text-cyan">
        <Icon className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-[0.28em]">Ratefluencer Nexus</span>
      </div>
      <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{copy}</p>
    </div>
  );
}

function IntelligenceTile({ label, value, icon: Icon, tone = "cyan" }: { label: string; value: string; icon: LucideIcon; tone?: "cyan" | "mint" | "pink" }) {
  const toneClass = tone === "mint" ? "text-mint" : tone === "pink" ? "text-bloom" : "text-cyan";
  return (
    <GlassPanel className="p-5 transition hover:-translate-y-1 hover:border-cyan/40">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.05] ${toneClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-ghost">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </GlassPanel>
  );
}

export function DashboardHome() {
  return (
    <>
      <PageHeader
        icon={Sparkles}
        title="AI Command Center"
        copy="A spatial intelligence layer for creators, brands, campaigns, content, and autonomous growth operations."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <GlassPanel className="relative min-h-[620px] overflow-hidden p-0">
          <InfluenceHeroScene compact />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,22,.7)_78%)]" />
          <div className="absolute left-5 top-5 rounded-[8px] border border-cyan/20 bg-black/25 px-4 py-3 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan">Intelligence globe</p>
            <p className="mt-1 text-sm text-muted">42,118 live creator vectors</p>
          </div>
        </GlassPanel>
        <div className="grid gap-4">
          <IntelligenceTile label="Trending Creators" value="+418 emerging" icon={TrendingUp} />
          <IntelligenceTile label="Brand Opportunities" value="$12.4M forecast" icon={Target} tone="mint" />
          <IntelligenceTile label="Growth Alerts" value="27 anomalies" icon={RadioTower} tone="pink" />
          <IntelligenceTile label="Campaign Insights" value="89% avg confidence" icon={Gauge} />
        </div>
      </div>
    </>
  );
}

export function DiscoveryPage() {
  return (
    <>
      <PageHeader
        icon={Compass}
        title="Creator discovery without the vanity fog."
        copy="Search creators by hidden growth signals, semantic audience quality, trust density, and commercial fit."
      />
      <GlassPanel className="mb-6 flex items-center gap-3 p-4">
        <Search className="h-5 w-5 text-cyan" />
        <input
          aria-label="Search creators"
          placeholder="Search by niche, audience, brand fit, trend, or creator handle"
          className="min-h-11 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-ghost"
        />
        <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-void">Search</button>
      </GlassPanel>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {creators.map((creator, index) => (
          <motion.div key={creator.handle} {...panelMotion} transition={{ ...panelMotion.transition, delay: index * 0.06 }}>
            <GlassPanel className="group h-full p-5 transition duration-300 hover:-translate-y-2 hover:border-cyan/45 hover:shadow-cyan">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{creator.name}</h2>
                  <p className="text-sm text-cyan">{creator.handle}</p>
                </div>
                <div className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1 text-sm text-mint">{creator.score}</div>
              </div>
              <p className="min-h-12 text-sm leading-6 text-muted">{creator.niche}</p>
              <div className="mt-5 space-y-3">
                {[
                  ["Growth Potential", creator.growth],
                  ["Authenticity", creator.authenticity],
                  ["Virality", creator.virality]
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex justify-between text-xs text-ghost">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-nexus via-cyan to-mint" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[8px] border border-white/10 bg-white/[0.04] p-3 text-xs text-muted">{creator.audience}</div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export function DnaProfilePage() {
  return (
    <>
      <PageHeader
        icon={RadarIcon}
        title="Creator digital twin: Mira Vale"
        copy="Influence DNA models the creator as a living market signal across trust, audience, creative velocity, and brand memory fit."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <GlassPanel className="min-h-[560px] p-6">
          <ResponsiveContainer width="100%" height={430}>
            <RadarChart data={dnaMetrics}>
              <PolarGrid gridType="polygon" stroke="rgba(255,255,255,.14)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#CBD5E1", fontSize: 12 }} />
              <Radar dataKey="value" stroke="#00E5FF" fill="#6D5DFC" fillOpacity={0.42} />
              <Tooltip contentStyle={{ background: "rgba(5,8,22,.92)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="grid gap-3 sm:grid-cols-3">
            {dnaMetrics.map((metric) => (
              <div key={metric.subject} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs text-ghost">{metric.subject}</p>
                <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
        <div className="space-y-4">
          <IntelligenceTile label="Audience Quality" value="Premium wellness buyers" icon={BadgeCheck} tone="mint" />
          <IntelligenceTile label="Trust Metrics" value="0.92 trust density" icon={ShieldCheck} />
          <GlassPanel className="p-5">
            <h2 className="mb-4 font-semibold">Growth Curve</h2>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={growthCurve}>
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Area type="monotone" dataKey="nexus" stroke="#14F195" fill="#14F195" fillOpacity={0.18} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassPanel>
          <GlassPanel className="p-5">
            <div className="mb-3 flex items-center gap-3 text-cyan">
              <BrainCircuit className="h-5 w-5" />
              <h2 className="font-semibold">AI Insight</h2>
            </div>
            <p className="text-sm leading-6 text-muted">
              Mira is underpriced for premium wellness launches. Her community saves tutorials 2.3x more than category median and converts strongly after creator-led routines.
            </p>
          </GlassPanel>
        </div>
      </div>
    </>
  );
}

export function CampaignLabPage() {
  const { budget, goal, setBudget, setGoal } = useNexusStore();
  const success = Math.min(96, Math.round(68 + budget / 4200 + (goal === "Conversion" ? 6 : 2)));
  const roi = (2.1 + budget / 100000).toFixed(1);

  return (
    <>
      <PageHeader icon={Orbit} title="Mission-control campaign simulation." copy="Adjust inputs and watch predictive outcomes recompose in real time." />
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <GlassPanel className="p-6">
          <label className="mb-6 block">
            <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-ghost">Budget</span>
            <input
              type="range"
              min={20000}
              max={180000}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="w-full accent-cyan"
            />
            <p className="mt-2 text-2xl font-semibold">${budget.toLocaleString()}</p>
          </label>
          <div className="mb-6">
            <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-ghost">Goal</span>
            <div className="grid grid-cols-3 gap-2">
              {(["Awareness", "Conversion", "Retention"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setGoal(item)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    goal === item ? "border-cyan/50 bg-cyan/15 text-white" : "border-white/10 bg-white/[0.04] text-ghost"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-sm text-muted">
            Brand: Astra Skin
            <br />
            Creator: Mira Vale
          </div>
        </GlassPanel>
        <div className="grid gap-4 sm:grid-cols-2">
          <IntelligenceTile label="Success Probability" value={`${success}%`} icon={Target} tone="mint" />
          <IntelligenceTile label="ROI Forecast" value={`${roi}x`} icon={TrendingUp} />
          <IntelligenceTile label="Risk Assessment" value="Low / 12" icon={ShieldCheck} />
          <IntelligenceTile label="Expected Reach" value="18.6M" icon={RadioTower} tone="pink" />
          <GlassPanel className="p-5 sm:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={[{ name: "Reach", value: 82 }, { name: "Engagement", value: 78 }, { name: "Conversion", value: success }, { name: "Safety", value: 92 }]}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ background: "rgba(5,8,22,.92)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }} />
                <Bar dataKey="value" fill="#00E5FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassPanel>
        </div>
      </div>
    </>
  );
}

export function ContentLabPage() {
  return (
    <>
      <PageHeader icon={Flame} title="AI content creation studio." copy="Turn trend intelligence into scripts, thumbnails, captions, and virality forecasts through coordinated agent stages." />
      <div className="grid gap-5 lg:grid-cols-5">
        {labStages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div key={stage.title} {...panelMotion} transition={{ ...panelMotion.transition, delay: index * 0.08 }}>
              <GlassPanel className="h-full p-5">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[8px] border border-cyan/25 bg-cyan/10 text-cyan">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold">{stage.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{stage.status}</p>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>
      <GlassPanel className="mt-6 grid gap-6 p-6 lg:grid-cols-2">
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan">Generated script</p>
          <p className="mt-4 text-2xl font-semibold">&ldquo;I replaced my morning scroll with this 38-second reset.&rdquo;</p>
          <p className="mt-4 text-muted">Hook, tactile demonstration, creator proof, before-after payoff, save cue.</p>
        </div>
        <div className="rounded-[8px] border border-mint/25 bg-mint/10 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-mint">Virality prediction</p>
          <p className="mt-4 text-5xl font-semibold">91%</p>
          <p className="mt-4 text-muted">Strong retention through second two, high comment prompt quality, exceptional save intent.</p>
        </div>
      </GlassPanel>
    </>
  );
}

export function AnalyticsPage() {
  return (
    <>
      <PageHeader icon={LineChart} title="Predictive analytics, without dashboard fatigue." copy="A focused intelligence readout of creator growth, campaign lift, risk, and market movement." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <IntelligenceTile label="Market Movement" value="+18.7%" icon={Activity} />
        <IntelligenceTile label="Hidden Gems Found" value="1,284" icon={Gem} tone="mint" />
        <IntelligenceTile label="Risk Avoided" value="$3.8M" icon={ShieldCheck} tone="pink" />
        <IntelligenceTile label="AI Match Rate" value="94%" icon={Zap} />
      </div>
      <GlassPanel className="mt-6 p-6">
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={growthCurve}>
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip contentStyle={{ background: "rgba(5,8,22,.92)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }} />
            <Area type="monotone" dataKey="legacy" stroke="#FF4D8D" fill="#FF4D8D" fillOpacity={0.08} strokeWidth={2} />
            <Area type="monotone" dataKey="nexus" stroke="#14F195" fill="#14F195" fillOpacity={0.18} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassPanel>
    </>
  );
}

export function AIAgentPage() {
  return (
    <>
      <PageHeader icon={Bot} title="Autonomous creator growth assistant." copy="Active AI workflows monitor trends, generate content, analyze audiences, and recommend campaigns in real time." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <GlassPanel className="p-6">
          <div className="space-y-4">
            {agentSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan">{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{step}</p>
                  <p className="text-sm text-ghost">{["Trend monitoring", "Content creation", "Audience analysis", "Campaign recommendations", "Risk checks", "Publish timing"][index]}</p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-mint shadow-[0_0_16px_rgba(20,241,149,.8)]" />
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6" shimmer>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan">Agent activity</p>
          <div className="mt-6 space-y-5">
            {["Parsing creator comments", "Testing hook variants", "Forecasting Friday launch", "Matching brands by memory fit"].map((item, index) => (
              <div key={item}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted">{item}</span>
                  <span className="text-white">{72 + index * 7}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-nexus via-cyan to-mint" style={{ width: `${72 + index * 7}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </>
  );
}
