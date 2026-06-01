import {
  Home,
  Radar,
  Compass,
  Dna,
  Target,
  Flame,
  LineChart,
  Bot,
  Settings,
  Sparkles,
  BrainCircuit,
  WandSparkles,
  Orbit
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Fatigue Radar", href: "/dashboard/fatigue-radar", icon: Radar },
  { label: "Creator Discovery", href: "/dashboard/discovery", icon: Compass },
  { label: "Influence DNA", href: "/dashboard/dna", icon: Dna },
  { label: "Campaign Lab", href: "/dashboard/campaign-lab", icon: Target },
  { label: "Content Studio", href: "/dashboard/content-lab", icon: Flame },
  { label: "Predictive Analytics", href: "/dashboard/analytics", icon: LineChart },
  { label: "Autonomous Agent", href: "/dashboard/ai-agent", icon: Bot },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }
];

export const dnaMetrics = [
  { subject: "Authenticity", value: 94 },
  { subject: "Trust", value: 88 },
  { subject: "Growth", value: 97 },
  { subject: "Virality", value: 91 },
  { subject: "Brand Fit", value: 86 },
  { subject: "Community", value: 93 }
];

export const creators = [
  {
    name: "Mira Vale",
    handle: "@miravalelabs",
    niche: "Clean beauty + biohacking",
    score: 96,
    growth: 92,
    authenticity: 95,
    virality: 89,
    audience: "Gen Z wellness buyers"
  },
  {
    name: "Ari North",
    handle: "@northframes",
    niche: "AI filmmaking",
    score: 94,
    growth: 98,
    authenticity: 88,
    virality: 96,
    audience: "Creator-tech adopters"
  },
  {
    name: "Nia Sol",
    handle: "@niasolfit",
    niche: "Low-equipment fitness",
    score: 91,
    growth: 87,
    authenticity: 97,
    virality: 84,
    audience: "Busy professionals"
  },
  {
    name: "Kai Atlas",
    handle: "@kaiatlas.eats",
    niche: "Future food",
    score: 93,
    growth: 94,
    authenticity: 90,
    virality: 91,
    audience: "Urban food explorers"
  }
];

export const campaignForecast = [
  { name: "Reach", value: 82 },
  { name: "Engagement", value: 76 },
  { name: "Success", value: 89 },
  { name: "ROI", value: 71 },
  { name: "Safety", value: 92 }
];

export const agentSteps = [
  "Trend Discovery",
  "Script Generation",
  "Video Creation",
  "Caption Generation",
  "Virality Prediction",
  "Publishing Optimization"
];

export const labStages = [
  { title: "Trend Discovery", icon: Sparkles, status: "Scanning 18.4M signals" },
  { title: "Script", icon: BrainCircuit, status: "3 narrative hooks generated" },
  { title: "Thumbnail", icon: WandSparkles, status: "Contrast heatmap optimized" },
  { title: "Caption", icon: Bot, status: "CTA tuned for saves" },
  { title: "Virality Prediction", icon: Orbit, status: "Score rising to 91" }
];

export const growthCurve = [
  { month: "Jan", legacy: 18, nexus: 22 },
  { month: "Feb", legacy: 20, nexus: 31 },
  { month: "Mar", legacy: 23, nexus: 47 },
  { month: "Apr", legacy: 24, nexus: 66 },
  { month: "May", legacy: 26, nexus: 91 },
  { month: "Jun", legacy: 29, nexus: 128 }
];
