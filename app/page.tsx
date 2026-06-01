"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNexusStore } from "@/lib/store";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Check,
  X,
  Lock,
  Mail,
  User,
  AlertTriangle,
  ArrowDownRight
} from "lucide-react";

export default function SaaSLandingPage() {
  const router = useRouter();
  const { setIsAuthenticated } = useNexusStore();

  // Authentication states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Mount state to prevent hydration errors
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Scroll reveal setup
  useEffect(() => {
    if (!hasMounted) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const scrollRevealElements = document.querySelectorAll(".scroll-reveal");
    scrollRevealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hasMounted]);

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthError("");
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!email || !password || (authMode === "signup" && !name)) {
      setAuthError("Please fill out all fields.");
      return;
    }

    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      router.push("/dashboard");
    }, 1000);
  };

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-9 4 18 3-13 4 4" />
            </svg>
          </div>
          <div className="h-2.5 w-32 bg-slate-100 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#1E293B] font-sans antialiased overflow-x-hidden selection:bg-indigo-50 selection:text-[#4F46E5] relative">
      
      {/* Soft Top background lights */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-50/20 via-transparent to-transparent pointer-events-none -z-10" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — NAVBAR
          ═══════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4.5">
          {/* Logo (left) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-transform group-hover:scale-105 duration-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-9 4 18 3-13 4 4" />
              </svg>
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900">Trend Fatigue Engine AI</span>
          </Link>

          {/* Links (middle) */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider">Product</a>
            <a href="#features" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider">Features</a>
            <a href="#how-it-works" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider">How It Works</a>
            <a href="#pricing" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider">Pricing</a>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenAuth("login")}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
            >
              Login
            </button>
            <button
              onClick={() => handleOpenAuth("signup")}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-sm hover:shadow transition-all duration-200 active:scale-95 uppercase tracking-wider"
            >
              Signup
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="pt-36 pb-20 px-6 text-center max-w-4xl mx-auto relative">
        <div className="space-y-6 animate-fade-in-up">
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold text-indigo-600 select-none">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Simple, clean, Apple-inspired trend analysis
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Stop Chasing Trends.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">
              Start Predicting Them.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed">
            AI that tells you what audiences are getting tired of — before everyone else.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenAuth("signup")}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            >
              Try for Free
            </button>
            <a
              href="#how-it-works"
              className="px-7 py-3.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — HERO VISUAL (Mockup Card Style)
          ═══════════════════════════════════════════════════════ */}
      <section className="pb-24 px-6 max-w-5xl mx-auto scroll-reveal text-left">
        <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)] transition-all duration-500 animate-float">
          {/* Mockup Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6 select-none">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-9 4 18 3-13 4 4" />
                </svg>
              </span>
              <div>
                <span className="block text-xs font-extrabold text-slate-900 leading-tight">WaveShift Telemetry Dashboard</span>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Fatigue Radar</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Sync Complete</span>
            </div>
          </div>

          {/* Visual Grid: Trend going down vs Replacement trend rising */}
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Left: Trend Going Down (Fatigue) */}
            <div className="bg-[#FFF1F2] border border-[#FFE4E6] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">Saturated Niche</span>
                  <h4 className="text-base font-extrabold text-slate-900 tracking-tight">AI Influencers</h4>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-100/50 rounded-full px-2.5 py-0.5 border border-rose-200">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  -34% Declining
                </div>
              </div>
              <div className="h-32 flex items-end">
                {/* Declining smooth wave line */}
                <svg className="w-full h-full text-rose-500 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d="M0 5 Q30 8 50 20 T100 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-rose-600/70 block uppercase tracking-wide">Audience fatigue score: 92/100 (Critical saturation)</span>
            </div>

            {/* Right: Replacement Trend Rising */}
            <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Rising Opportunity</span>
                  <h4 className="text-base font-extrabold text-slate-900 tracking-tight">Raw Founder Stories</h4>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100/50 rounded-full px-2.5 py-0.5 border border-emerald-200">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  +95% Excellent
                </div>
              </div>
              <div className="h-32 flex items-end">
                {/* Rising smooth wave line */}
                <svg className="w-full h-full text-emerald-500 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d="M0 25 Q30 22 50 12 T100 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-emerald-600/70 block uppercase tracking-wide">Next recommended narrative vector (High-Converting)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — PROJECT EXPLANATION SECTION
          ═══════════════════════════════════════════════════════ */}
      <section id="product" className="py-24 px-6 bg-slate-50/50 border-y border-[#E2E8F0] scroll-reveal text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block">Project Intent</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What is Trend Fatigue Engine AI?
          </h2>
          <p className="text-base text-slate-500 font-semibold leading-relaxed">
            This project predicts what people will stop liking — before it becomes obvious. Instead of following trends, you stay ahead by publishing what comes next.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS (3 STEPS)
          ═══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-28 px-6 max-w-5xl mx-auto scroll-reveal text-center">
        <div className="space-y-4 mb-20">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Minimal Operations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">How It Works</h2>
        </div>

        {/* 3 Step columns */}
        <div className="grid gap-10 md:grid-cols-3 max-w-4xl mx-auto relative before:absolute before:top-4 before:left-12 before:right-12 before:h-0.5 before:bg-[#E2E8F0] before:hidden before:md:block">
          
          {/* Step 1 */}
          <div className="space-y-4 relative bg-[#FCFCFD]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-black shadow-sm relative z-10">
              1
            </span>
            <h3 className="text-sm font-extrabold text-slate-900">Input topic</h3>
            <p className="text-xs leading-relaxed text-slate-400 font-semibold">
              Enter any current social topic or niche vector into our clean input box.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 relative bg-[#FCFCFD]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-black shadow-sm relative z-10">
              2
            </span>
            <h3 className="text-sm font-extrabold text-slate-900">AI analyzes audience fatigue</h3>
            <p className="text-xs leading-relaxed text-slate-400 font-semibold">
              Our non-technical models run cross-signals to isolate sentiment saturation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 relative bg-[#FCFCFD]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-black shadow-sm relative z-10">
              3
            </span>
            <h3 className="text-sm font-extrabold text-slate-900">Get next-trend suggestions</h3>
            <p className="text-xs leading-relaxed text-slate-400 font-semibold">
              Instantly download high-converting content reversals and script concept briefs.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — FEATURES
          ═══════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6 bg-slate-50/50 border-y border-[#E2E8F0] scroll-reveal text-center">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block">System Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Capabilities Engineered For Creators</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto text-left">
            {/* Feature 1 */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="h-9 w-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Fatigue Score</h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Clean, non-technical burnout index scores mapping exactly how tired audiences are of a topic.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="h-9 w-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Backlash Predictor</h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Anticipate high-fatigue narrative backlashes and swiping behaviors before publishing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="h-9 w-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Trend Replacement Engine</h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Isolate rising counter-narratives that audiences crave when saturated trends decline.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="h-9 w-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Content Idea Generator</h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Create publish-ready hooks, titles, descriptions, and hashtags tailored for counter-content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — PRICING
          ═══════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-28 px-6 max-w-4xl mx-auto scroll-reveal text-center">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Pricing Plans</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Get Results First. Pick a plan later.</h2>
          <p className="text-xs text-slate-400 font-semibold">Choose the right plan for your startup needs.</p>
        </div>

        {/* Apple-style Price Plan Card */}
        <div className="max-w-sm mx-auto bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-sm space-y-6">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block text-left">Starter Plan</span>
          <div className="flex items-baseline gap-1 text-left">
            <span className="text-4xl font-black text-slate-900">₹0</span>
            <span className="text-xs text-slate-400 font-bold">/ month</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold text-left">Perfect for small teams and independent creators.</p>
          
          <button
            onClick={() => handleOpenAuth("signup")}
            className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
          >
            Start Analyzing
          </button>

          <ul className="space-y-3.5 pt-6 border-t border-slate-100 text-xs text-slate-600 font-semibold text-left">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-indigo-600" />
              5 analyses / day
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-indigo-600" />
              Basic trend insights
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-indigo-600" />
              Standard formulation hooks
            </li>
          </ul>
        </div>

        <span className="block text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-8">Pro Plan coming soon</span>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-[#E2E8F0] bg-slate-50/50 text-center text-xs font-bold text-slate-400 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          <span>&copy; 2026 Trend Fatigue Engine AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════
          INTERACTIVE AUTHENTICATION MODAL (🔐 SIGN UP & LOGIN FLOW)
          ═══════════════════════════════════════════════════════ */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass background overlay */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Interactive Modal Body */}
          <div className="relative bg-white border border-slate-100 rounded-3xl p-8 w-full max-w-sm shadow-2xl z-10 overflow-hidden transform animate-fade-in-up">
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title Header */}
            <div className="text-center mb-6 space-y-1">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                {authMode === "signup" ? "Create your account" : "Welcome back"}
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                {authMode === "signup" ? "Get started with your free creator workspace today." : "Access your active listen nodes and telemetry."}
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs font-bold text-rose-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* Name Field (Sign Up Only) */}
              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-indigo-100"
              >
                {authLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Authenticating Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === "signup" ? "Sign Up" : "Log In"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social Authentication divider */}
            <div className="relative my-5 text-center">
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-100" />
              <span className="relative bg-white px-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                or continue with
              </span>
            </div>

            {/* Google Authentication button */}
            <button
              onClick={handleAuthSubmit}
              className="w-full h-11 border border-slate-200/80 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Auth Mode Toggle Footer Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setAuthMode(authMode === "signup" ? "login" : "signup");
                  setAuthError("");
                }}
                className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {authMode === "signup" ? (
                  <>Already have an account? <span className="text-indigo-600 underline">Login</span></>
                ) : (
                  <>Don&apos;t have an account? <span className="text-indigo-600 underline">Sign Up</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
