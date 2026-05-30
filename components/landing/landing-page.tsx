"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ArrowDown,
  BadgeCheck,
  BrainCircuit,
  Cpu,
  Gauge,
  Gem,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { NexusButton } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Section } from "@/components/ui/section";
import { agentSteps, campaignForecast, dnaMetrics, growthCurve } from "@/lib/data";
import { InfluenceHeroScene, InfluenceUniverseScene } from "./influence-scene";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

function MetricPill({ label, value, tone = "cyan" }: { label: string; value: string; tone?: "cyan" | "mint" | "pink" }) {
  const toneClass = tone === "mint" ? "text-mint" : tone === "pink" ? "text-bloom" : "text-cyan";
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-ghost">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}

function ProblemSection() {
  const legacy = ["Followers", "Likes", "Views"];
  const nexus = ["Authenticity", "Growth Potential", "Audience Quality", "Virality Forecast"];

  return (
    <Section
      eyebrow="Signal over vanity"
      title="Influencer marketing is still selecting creators with yesterday's math."
      copy="Ratefluencer Nexus replaces surface metrics with predictive intelligence, semantic audience quality, and simulated commercial outcomes."
      className="mesh-bg"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <GlassPanel className="h-full p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-3 text-ghost">
              <Gauge className="h-5 w-5" />
              Traditional influencer marketing
            </div>
            <div className="space-y-4">
              {legacy.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ width: "35%" }}
                  whileInView={{ width: `${58 + index * 11}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.85 }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-muted"
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="mt-10 rounded-[8px] border border-bloom/25 bg-bloom/10 p-5 text-bloom">
              Poor creator selection. Failed campaign.
            </div>
          </GlassPanel>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <GlassPanel className="h-full p-6 sm:p-8" shimmer>
            <div className="mb-8 flex items-center gap-3 text-cyan">
              <BrainCircuit className="h-5 w-5" />
              AI-powered intelligence
            </div>
            <div className="space-y-4">
              {nexus.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ width: "42%" }}
                  whileInView={{ width: `${76 + index * 5}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.85, type: "spring" }}
                  className="rounded-full border border-cyan/20 bg-cyan/10 px-4 py-3 text-sm text-white shadow-cyan"
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="mt-10 rounded-[8px] border border-mint/25 bg-mint/10 p-5 text-mint">
              High ROI creator selection.
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </Section>
  );
}

function DnaSection() {
  return (
    <Section
      id="influence-dna"
      eyebrow="Influence DNA(TM)"
      title="A living signature for every creator."
      copy="The platform models creator trust, momentum, semantic fit, and audience response as a dynamic intelligence fingerprint."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <GlassPanel className="relative min-h-[520px] overflow-hidden p-4 sm:p-8">
          <div className="absolute inset-0 panel-grid opacity-40" />
          <div className="relative h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dnaMetrics}>
                <PolarGrid gridType="polygon" stroke="rgba(255,255,255,.14)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#CBD5E1", fontSize: 12 }} />
                <Radar name="Creator DNA" dataKey="value" stroke="#00E5FF" fill="#6D5DFC" fillOpacity={0.38} />
                <Tooltip
                  contentStyle={{ background: "rgba(5,8,22,.9)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="relative grid gap-3 sm:grid-cols-3">
            {dnaMetrics.map((item) => (
              <div key={item.subject} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
                <p className="text-xs text-ghost">{item.subject}</p>
                <p className="mt-1 text-xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
        <div className="space-y-4">
          {[
            ["Authenticity", "Detects sponsored-content fatigue, comment entropy, and trust decay before audiences disengage."],
            ["Brand Fit", "Compares brand memory structures against creator language, community values, and purchase triggers."],
            ["Virality", "Forecasts hook velocity, remix potential, and cross-network propagation windows."]
          ].map(([title, copy], index) => (
            <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }}>
              <GlassPanel className="p-5 transition hover:-translate-y-1 hover:border-cyan/40">
                <div className="mb-3 flex items-center gap-3 text-cyan">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <p className="leading-7 text-muted">{copy}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HiddenGemSection() {
  return (
    <Section eyebrow="Hidden gem discovery" title="Find Tomorrow's Influencers Today" className="mesh-bg">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <GlassPanel className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricPill label="10M Follower Creator" value="31%" tone="pink" />
            <MetricPill label="15K Follower Creator" value="92%" tone="mint" />
          </div>
          <div className="mt-6 rounded-[8px] border border-mint/25 bg-mint/10 p-5">
            <div className="flex items-center gap-3 text-mint">
              <Gem className="h-5 w-5" />
              <span className="font-semibold">Future Viral Probability: 92%</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Nexus detected early community compounding, high-save tutorials, and underpriced brand affinity before the follower graph caught up.
            </p>
          </div>
        </GlassPanel>
        <GlassPanel className="min-h-[360px] p-6">
          <ResponsiveContainer width="100%" height={330}>
            <AreaChart data={growthCurve}>
              <defs>
                <linearGradient id="nexusGrowth" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#14F195" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#14F195" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{ background: "rgba(5,8,22,.92)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }}
              />
              <Area type="monotone" dataKey="legacy" stroke="#FF4D8D" fill="transparent" strokeWidth={2} />
              <Area type="monotone" dataKey="nexus" stroke="#14F195" fill="url(#nexusGrowth)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassPanel>
      </div>
    </Section>
  );
}

function CampaignSimulatorSection() {
  return (
    <Section
      eyebrow="Campaign simulator"
      title="Bloomberg-grade forecasting for culture."
      copy="Model creator, brand, budget, and goal combinations before a single dollar is deployed."
    >
      <GlassPanel className="overflow-hidden">
        <div className="grid lg:grid-cols-[360px_1fr]">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
            {["Brand", "Creator", "Budget", "Goal"].map((item, index) => (
              <label key={item} className="mb-5 block">
                <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-ghost">{item}</span>
                <div className="rounded-[8px] border border-white/10 bg-white/[0.05] px-4 py-3 text-white">
                  {["Astra Skin", "Mira Vale", "$84,000", "Conversion lift"][index]}
                </div>
              </label>
            ))}
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaignForecast.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-ghost">{metric.name}</p>
                <p className="mt-3 text-4xl font-semibold text-white">{metric.value}%</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-nexus via-cyan to-mint" style={{ width: `${metric.value}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Section>
  );
}

function ViralLabSection() {
  const metrics = ["Hook Strength", "Trend Match", "Shareability", "Retention Score", "Virality Score"];
  return (
    <Section eyebrow="AI viral lab" title="Generate, score, and sharpen content before it hits the feed." className="mesh-bg">
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="min-h-[460px] p-6">
          <div className="mb-5 flex items-center gap-3 text-cyan">
            <PlayCircle className="h-5 w-5" />
            Generated reel concept
          </div>
          <div className="flex h-[340px] items-center justify-center rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(0,229,255,.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02))]">
            <div className="max-w-xs text-center">
              <WandSparkles className="mx-auto mb-5 h-12 w-12 text-mint" />
              <p className="text-2xl font-semibold">The 7-second creator routine brands are missing</p>
              <p className="mt-3 text-sm text-muted">Cold open, social proof snap, visual payoff, save-trigger close.</p>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6" shimmer>
          <div className="mb-5 flex items-center gap-3 text-mint">
            <Cpu className="h-5 w-5" />
            AI analysis engine
          </div>
          <div className="space-y-5">
            {metrics.map((metric, index) => {
              const value = 76 + index * 4;
              return (
                <div key={metric}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted">{metric}</span>
                    <span className="text-white">{value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.07 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan via-nexus to-bloom"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </Section>
  );
}

function AgentSection() {
  return (
    <Section eyebrow="Autonomous AI agent" title="A creator growth system that keeps working." copy="Trend, creative, campaign, and publishing agents coordinate as a single adaptive workflow.">
      <div className="mx-auto max-w-5xl">
        {agentSteps.map((step, index) => (
          <motion.div key={step} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }} className="relative">
            <GlassPanel className="mb-5 flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan/35 bg-cyan/10 text-cyan">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{step}</p>
                <p className="text-sm text-ghost">Agent confidence {88 + index}%</p>
              </div>
              <Activity className="h-5 w-5 text-mint" />
            </GlassPanel>
            {index < agentSteps.length - 1 && <ArrowDown className="mx-auto mb-5 h-5 w-5 text-cyan" />}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function UniverseSection() {
  return (
    <Section
      eyebrow="Influence Universe(TM)"
      title="Every creator becomes a star system."
      copy="Zoom, pan, and explore category clusters where size, color, brightness, distance, and orbit reveal influence structure."
      className="mesh-bg"
    >
      <GlassPanel className="relative h-[72vh] min-h-[560px] overflow-hidden p-0">
        <InfluenceUniverseScene />
        <div className="pointer-events-none absolute left-4 top-4 grid gap-2 text-xs text-muted sm:left-6 sm:top-6">
          {["Size = Influence", "Color = Category", "Brightness = Growth", "Distance = Similarity", "Orbit = Community"].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
              {item}
            </span>
          ))}
        </div>
      </GlassPanel>
    </Section>
  );
}

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <main className="min-h-screen bg-void text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <InfluenceHeroScene />
        </div>
        <motion.div style={{ y }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,.2)_35%,#050816_88%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div {...fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            RATEFLUENCER NEXUS
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="text-balance text-6xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl"
          >
            Predict Influence <span className="text-gradient">Before It Happens</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.16 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl"
          >
            Discover future creators. Simulate campaign success. Generate viral content. Powered by AI.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.24 }} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NexusButton href="/dashboard">Launch Intelligence Engine</NexusButton>
            <NexusButton href="#influence-dna" variant="secondary" icon="play">
              Watch Demo
            </NexusButton>
          </motion.div>
        </div>
      </section>

      <ProblemSection />
      <DnaSection />
      <HiddenGemSection />
      <CampaignSimulatorSection />
      <ViralLabSection />
      <AgentSection />
      <UniverseSection />

      <Section className="flex min-h-[82vh] items-center">
        <div className="mx-auto max-w-4xl text-center">
          <BadgeCheck className="mx-auto mb-6 h-14 w-14 text-mint" />
          <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-7xl">
            The Future of Influence <span className="text-gradient">Is Predictable.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NexusButton href="/dashboard">Start Exploring</NexusButton>
            <NexusButton href="/dashboard/campaign-lab" variant="secondary">
              Book Demo
            </NexusButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
