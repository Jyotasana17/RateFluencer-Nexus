"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  LogOut, 
  Check, 
  Save, 
  Shield, 
  Volume2, 
  Bot, 
  RefreshCw, 
  Key, 
  Globe, 
  Activity, 
  Sliders, 
  Sparkles,
  Download,
  Play
} from "lucide-react";
import { useNexusStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type ActiveTab = "profile" | "algo" | "apis" | "ai";

export default function SettingsPage() {
  const { 
    setIsAuthenticated,
    fatigueThreshold,
    setFatigueThreshold,
    audioAlerts,
    setAudioAlerts,
    scanInterval,
    setScanInterval,
    aiModel,
    setAiModel
  } = useNexusStore();

  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@trendfatigue.ai");
  const [isSaved, setIsSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  
  // Custom states for new features
  const [adminPassphrase, setAdminPassphrase] = useState("batman2026");
  const [aiTemperature, setAiTemperature] = useState(0.7);
  const [aiCreativity, setAiCreativity] = useState(85);
  const [godMode, setGodMode] = useState(false);

  // Social API connection states
  const [apis, setApis] = useState({
    tiktok: { connected: true, loading: false, logs: ["API channel initialized", "Webhook active on /api/v1/tiktok"] },
    instagram: { connected: false, loading: false, logs: [] as string[] },
    youtube: { connected: true, loading: false, logs: ["API channel initialized", "Quota limit status: 8,400 remaining"] }
  });

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    triggerToast("TACTICAL PARAMETERS SUCCESSFULLY COMMITTED TO VAULT");
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Web Audio API Synthesizer Alert
  const playSonarAlert = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = "sine";
      // Start frequency: 880Hz (A5), sweep down to 220Hz (A3)
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.6);
      
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.6);
      triggerToast("🔊 SONAR HEARTBEAT TRIGGERED AT 880HZ");
    } catch (e) {
      console.error("Web Audio API not supported or blocked", e);
      triggerToast("⚠️ AUDIO GENERATION BLOCKED BY BROWSER");
    }
  };

  // Social API Connection Simulation
  const toggleApi = (platform: "tiktok" | "instagram" | "youtube") => {
    if (apis[platform].loading) return;

    if (apis[platform].connected) {
      // Disconnect
      setApis(prev => ({
        ...prev,
        [platform]: {
          ...prev[platform],
          connected: false,
          logs: []
        }
      }));
      triggerToast(`DISCONNECTED FROM ${platform.toUpperCase()} API VAULT`);
    } else {
      // Connect simulation
      setApis(prev => ({
        ...prev,
        [platform]: {
          ...prev[platform],
          loading: true,
          logs: [`Connecting to ${platform} sandbox...`]
        }
      }));

      setTimeout(() => {
        setApis(prev => ({
          ...prev,
          [platform]: {
            connected: true,
            loading: false,
            logs: [
              `OAuth Handshake Complete`,
              `Ingesting live audience feeds...`,
              `Webhook listening on ports: 8443 (Secure SSL)`
            ]
          }
        }));
        triggerToast(`ESTABLISHED DIRECT HANDSHAKE WITH ${platform.toUpperCase()}`);
      }, 1200);
    }
  };

  // Export JSON file simulation
  const exportConfiguration = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        creator: name,
        email: email,
        fatigueThreshold: fatigueThreshold,
        scanInterval: scanInterval,
        aiModel: aiModel,
        aiTemperature: aiTemperature,
        aiCreativity: aiCreativity,
        audioAlerts: audioAlerts,
        godMode: godMode,
        calibrationDate: new Date().toISOString()
      }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexus-calibration-${name.toLowerCase().replace(/\s+/g, "-")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("📂 CALIBRATION CONFIG EXPORTED SUCCESSFULLY");
  };

  return (
    <div className={cn(
      "max-w-4xl mx-auto space-y-8 animate-fade-in-up text-[#B3B3B3] font-mono transition-colors duration-500",
      godMode ? "dark:bg-red-950/5 selection:bg-red-500/20" : "selection:bg-[#AEF597]/20"
    )}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className={cn(
          "fixed bottom-12 right-6 z-50 flex items-center gap-3 bg-[#0A0A0A] border rounded-xl px-4 py-3 shadow-2xl animate-fade-in-up",
          godMode ? "border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-[#AEF597]/30 shadow-[0_0_15px_rgba(174,245,151,0.15)]"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            godMode ? "bg-red-500" : "bg-[#AEF597]"
          )} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 select-none">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span>⚙️</span> System Settings
          </h2>
          <p className="text-xs text-[#6B7280] font-semibold mt-1">
            Configure creators profile, live comments crawling triggers, and advanced AI parameters.
          </p>
        </div>

        {/* God Mode Toggle Badge */}
        <button
          onClick={() => {
            setGodMode(!godMode);
            triggerToast(godMode ? "GOD MODE DEACTIVATED // RESTORING DEFAULT AURA" : "⚡ GOD MODE ONLINE // WARNING: EXTREME COEFFICIENTS ACTIVE");
          }}
          className={cn(
            "px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 shrink-0 flex items-center gap-1.5",
            godMode 
              ? "bg-red-500/20 text-red-500 border-red-500/40 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]" 
              : "bg-white/5 text-[#B3B3B3] border-white/10 hover:border-white/20"
          )}
        >
          <Sparkles className="h-3 w-3" />
          <span>{godMode ? "GOD MODE ACTIVE" : "ENABLE GOD MODE"}</span>
        </button>
      </div>

      {/* Tab Selectors Layout */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-1">
        {[
          { id: "profile", label: "Profile & Access", icon: User },
          { id: "algo", label: "Algorithmic Gates", icon: Sliders },
          { id: "apis", label: "Social API Vault", icon: Globe },
          { id: "ai", label: "AI Engine Calibration", icon: Bot }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-3 rounded-t-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 border-t border-x",
                isActive
                  ? godMode
                    ? "bg-[#0A0A0A] text-red-500 border-white/10 border-t-red-500/80"
                    : "bg-[#0A0A0A] text-[#AEF597] border-white/10 border-t-[#AEF597]"
                  : "bg-transparent text-slate-500 border-transparent hover:text-slate-350 hover:bg-white/[0.01]"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Dashboard Panel */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-b-[24px] rounded-tr-[24px] p-8 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-between">
        
        {/* Decorative Grid Mesh */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

        <form onSubmit={handleSave} className="space-y-8 flex-grow flex flex-col justify-between">
          
          {/* ======================= TAB 1: PROFILE & ACCESS ======================= */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="border-b border-white/5 pb-3 flex justify-between items-center">
                <span className="text-[10px] font-black text-[#AEF597] uppercase tracking-widest block">ADMIN ACCESS CARD</span>
                <span className="text-[8px] font-extrabold text-[#6B7280] font-mono">ENCRYPTED PROTOCOL // SHA-256</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block">
                    Workspace Operator Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-black/60 border border-white/5 focus:border-[#AEF597]/40 focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] rounded-xl text-xs font-semibold text-white focus:outline-none transition-all uppercase"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block">
                    Telemetry Dispatch Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-black/60 border border-white/5 focus:border-[#AEF597]/40 focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] rounded-xl text-xs font-semibold text-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Portal Access Passphrase */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block">
                    System Decryption Access Key
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <input
                      type="password"
                      value={adminPassphrase}
                      onChange={(e) => setAdminPassphrase(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-black/60 border border-white/5 focus:border-[#AEF597]/40 focus:shadow-[0_0_12px_rgba(174,245,151,0.06)] rounded-xl text-xs font-mono font-bold text-white focus:outline-none transition-all uppercase tracking-widest"
                      required
                    />
                  </div>
                  <span className="text-[8px] text-[#6B7280] uppercase block">This key unlocks the Admin console portal (e.g. batman2026).</span>
                </div>

                {/* Security Clearance level */}
                <div className="space-y-2 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[9px] font-bold text-[#6B7280]">
                    <span>CLEARANCE CODE:</span>
                    <span className="text-white font-black">ROOT ACCESS</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="h-5 w-5 text-[#AEF597]" />
                    <span className="text-[9px] text-white font-extrabold uppercase tracking-wide">SECURE COHORT MATRIX // LEVEL 4</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 2: ALGORITHMIC GATES ======================= */}
          {activeTab === "algo" && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="border-b border-white/5 pb-3 flex justify-between items-center">
                <span className="text-[10px] font-black text-[#AEF597] uppercase tracking-widest block">CRITICAL THRESHOLD MATRIX</span>
                <span className="text-[8px] font-extrabold text-[#6B7280] font-mono">DAMPENING BOUNDS // CALIBRATED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Fatigue Threshold */}
                <div className="space-y-3 bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-baseline text-[9px] font-bold text-[#6B7280] tracking-wider">
                    <span>CRINGE / FATIGUE RATIO TARGET</span>
                    <span className="text-[#AEF597] font-black text-xs font-mono">{fatigueThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={98}
                    value={fatigueThreshold}
                    onChange={(e) => setFatigueThreshold(Number(e.target.value))}
                    className="w-full accent-[#AEF597] h-1.5 bg-white/5 rounded-lg cursor-pointer"
                  />
                  <span className="text-[8px] text-[#6B7280] uppercase block">Sets the benchmark for when a trend is labeled cooked/stale.</span>
                </div>

                {/* Telemetry Crawl Scan Speed */}
                <div className="space-y-3 bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-baseline text-[9px] font-bold text-[#6B7280] tracking-wider">
                    <span>LIVE CRAWLER REFRESH INTERVAL</span>
                    <span className="text-[#AEF597] font-black text-xs font-mono">{scanInterval} MINUTES</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={scanInterval}
                    onChange={(e) => setScanInterval(Number(e.target.value))}
                    className="w-full accent-[#AEF597] h-1.5 bg-white/5 rounded-lg cursor-pointer"
                  />
                  <span className="text-[8px] text-[#6B7280] uppercase block">Sets rate of crawler scans over digital social feeds.</span>
                </div>

                {/* Audio Alerts Synthesizer Direct */}
                <div className="flex flex-col justify-between bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#6B7280]">
                        <Volume2 className="h-4 w-4 text-[#AEF597]" />
                        <span>SONAR HEARTBEAT ALERT CHANNEL</span>
                      </div>
                      <span className="text-[8px] text-[#6B7280] uppercase block">Trigger pure synth tone when cringe hits critical horizon.</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAudioAlerts(!audioAlerts)}
                      className={cn(
                        "w-12 h-6 rounded-full p-1 transition-all duration-200 focus:outline-none border shrink-0",
                        audioAlerts ? "bg-[#AEF597]/20 border-[#AEF597]/30 flex justify-end" : "bg-black/60 border-white/5 flex justify-start"
                      )}
                    >
                      <span className={cn("w-4 h-4 rounded-full transition-all shadow-sm", audioAlerts ? "bg-[#AEF597]" : "bg-[#6B7280]")} />
                    </button>
                  </div>

                  {/* REAL Web Audio API Alert tester */}
                  {audioAlerts && (
                    <button
                      type="button"
                      onClick={playSonarAlert}
                      className="mt-4 w-full h-8 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95"
                    >
                      <Play className="h-3 w-3 text-[#AEF597]" />
                      <span>Test Sonar Alert Tone (Web Audio Synth)</span>
                    </button>
                  )}
                </div>

                {/* Mock Threat Gate Sensitivity */}
                <div className="space-y-3 bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors flex flex-col justify-between">
                  <div className="flex justify-between items-baseline text-[9px] font-bold text-[#6B7280] tracking-wider">
                    <span>COHORT VELOCITY BARRIER</span>
                    <span className="text-[#AEF597] font-black text-xs font-mono">{godMode ? "100% MAXIMUM" : "DYNAMIC GATED"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4.5 w-4.5 text-[#AEF597] shrink-0 animate-radar" />
                    <span className="text-[8px] text-[#6B7280] uppercase">
                      {godMode 
                        ? "ALL CALIBRATION CONTROLS AND SAFETY CODES HAVE BEEN TEMPORARILY OVERRIDDEN BY OPERATOR."
                        : "Filters high-frequency comment spam using predictive attention decay coefficients."
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 3: SOCIAL API VAULT ======================= */}
          {activeTab === "apis" && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="border-b border-white/5 pb-3 flex justify-between items-center">
                <span className="text-[10px] font-black text-[#AEF597] uppercase tracking-widest block">SOCIAL CONNECTIONS OVERLAY</span>
                <span className="text-[8px] font-extrabold text-[#6B7280] font-mono">SANDBOX TUNNELS // AES-256</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(["tiktok", "instagram", "youtube"] as const).map((platform) => {
                  const details = apis[platform];
                  const title = platform === "youtube" ? "YouTube v3 API" : platform === "tiktok" ? "TikTok API SDK" : "Instagram Graph";
                  return (
                    <div key={platform} className="bg-black/40 border border-white/5 hover:border-white/10 rounded-xl p-5 flex flex-col justify-between min-h-[190px] transition-colors relative overflow-hidden group">
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-black text-white uppercase tracking-wide">{title}</span>
                          <span className={cn(
                            "text-[7px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest",
                            details.connected 
                              ? "text-[#AEF597] bg-[#AEF597]/10 border-[#AEF597]/20" 
                              : "text-slate-500 bg-black/40 border-white/5"
                          )}>
                            {details.connected ? "CONNECTED" : "OFFLINE"}
                          </span>
                        </div>

                        {/* Live mock log streams inside container */}
                        <div className="bg-black/60 border border-white/5 rounded-lg p-2.5 text-[7px] font-mono min-h-[55px] text-[#6B7280]">
                          {details.connected ? (
                            <div className="space-y-1">
                              {details.logs.map((log, i) => (
                                <div key={i} className="truncate">&gt; {log}</div>
                              ))}
                            </div>
                          ) : details.loading ? (
                            <div className="flex items-center gap-1.5 text-[#AEF597] h-full justify-center py-4 animate-pulse">
                              <RefreshCw className="h-3 w-3 animate-spin" />
                              <span>HANDSHAKING VAULT...</span>
                            </div>
                          ) : (
                            <div className="text-center py-4 font-extrabold uppercase tracking-wide select-none">
                              Offline matrix. Connect to crawl active feeds.
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleApi(platform)}
                        className={cn(
                          "w-full h-8 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 mt-3 flex items-center justify-center gap-1.5",
                          details.connected 
                            ? "bg-red-950/20 text-red-500 border border-red-500/20 hover:bg-red-955/20" 
                            : "bg-[#AEF597] hover:bg-[#A8F690] text-slate-950 shadow-[0_0_10px_rgba(174,245,151,0.1)]"
                        )}
                      >
                        <RefreshCw className={cn("h-3 w-3", details.loading ? "animate-spin" : "")} />
                        <span>{details.connected ? "DISCONNECT VAULT" : "CONNECT PROTOCOL"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================= TAB 4: AI ENGINE CALIBRATION ======================= */}
          {activeTab === "ai" && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="border-b border-white/5 pb-3 flex justify-between items-center">
                <span className="text-[10px] font-black text-[#AEF597] uppercase tracking-widest block">LLM ENGINE SELECTION</span>
                <span className="text-[8px] font-extrabold text-[#6B7280] font-mono">COGNITIVE DECAY SWEEP // REALTIME</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* AI Language Model Selector */}
                <div className="flex flex-col justify-between bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="space-y-1 text-[9px] font-bold text-[#6B7280] mb-3">
                    <div className="flex items-center gap-1.5">
                      <Bot className="h-4 w-4 text-[#AEF597]" />
                      <span>COGNITIVE LLM CORE INTEL</span>
                    </div>
                    <span className="text-[8px] uppercase block">Choose neural architecture for counter-narrative formulation.</span>
                  </div>
                  
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full bg-black/60 border border-white/5 text-white rounded-lg px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-[#AEF597]/40 focus:ring-1 focus:ring-[#AEF597]/20 transition-all uppercase"
                  >
                    <option value="nexus-v4-turbo">nexus-v4-turbo (91% speed optimization)</option>
                    <option value="gemini-1.5-pro">gemini-1.5-pro (highly logical summaries)</option>
                    <option value="palantir-v2-intel">palantir-v2-intel (aggressive military analytics)</option>
                  </select>
                </div>

                {/* AI Temperature slider */}
                <div className="space-y-3 bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-baseline text-[9px] font-bold text-[#6B7280] tracking-wider">
                    <span>AI SAMPLING TEMPERATURE</span>
                    <span className="text-[#AEF597] font-black text-xs font-mono">{aiTemperature}</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1.2}
                    step={0.1}
                    value={aiTemperature}
                    onChange={(e) => setAiTemperature(Number(e.target.value))}
                    className="w-full accent-[#AEF597] h-1.5 bg-white/5 rounded-lg cursor-pointer"
                  />
                  <span className="text-[8px] text-[#6B7280] uppercase block">Lower values = raw data compliance; Higher values = highly chaotic creative.</span>
                </div>

                {/* AI Creativity weights */}
                <div className="space-y-3 bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-baseline text-[9px] font-bold text-[#6B7280] tracking-wider">
                    <span>CREATIVITY SLOP FILTER DENSITY</span>
                    <span className="text-[#AEF597] font-black text-xs font-mono">{aiCreativity}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={aiCreativity}
                    onChange={(e) => setAiCreativity(Number(e.target.value))}
                    className="w-full accent-[#AEF597] h-1.5 bg-white/5 rounded-lg cursor-pointer"
                  />
                  <span className="text-[8px] text-[#6B7280] uppercase block">Sets density score limit for generated opening hook statements.</span>
                </div>

                {/* Export/Backup config card */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors flex flex-col justify-between">
                  <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                    CONFIGURATION BACKUP VAULT
                  </div>
                  <span className="text-[8px] text-[#6B7280] uppercase block mb-3">
                    Backup active workspace state and parameters into a local JSON decryption key.
                  </span>
                  
                  <button
                    type="button"
                    onClick={exportConfiguration}
                    className="w-full h-9 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5 text-[#AEF597]" />
                    <span>Download Calibration Brief (.json)</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ======================= SYSTEM UTILITIES BAR ======================= */}
          <div className="space-y-3 pt-6 border-t border-white/5 mt-8 select-none">
            <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider block">TACTICAL RECOVERY MATRIX</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => triggerToast("FLUSHING SYSTEM COHORT CACHE & SECURE FILES...")}
                className="h-10 border border-white/5 hover:border-white/10 bg-black/40 hover:bg-white/[0.01] rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-3.5 w-3.5 text-[#6B7280]" />
                <span>Flush System Cache</span>
              </button>

              <button
                type="button"
                onClick={() => triggerToast("AES-256 TELEMETRY VAULT MATRICES ROTATED SUCCESSFULLY.")}
                className="h-10 border border-white/5 hover:border-white/10 bg-black/40 hover:bg-white/[0.01] rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Key className="h-3.5 w-3.5 text-[#6B7280]" />
                <span>Rekey Vault</span>
              </button>
            </div>
          </div>

          {/* ======================= ACTION ROW ======================= */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5 mt-6 select-none">
            {/* Submit Save button */}
            <button
              type="submit"
              className={cn(
                "flex-grow h-11 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center gap-2",
                godMode 
                  ? "bg-red-500 hover:bg-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)] text-white" 
                  : "bg-[#AEF597] hover:bg-[#A8F690] shadow-[0_0_12px_rgba(174,245,151,0.2)] text-slate-950"
              )}
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4 shrink-0" />
                  <span>tactical brief saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 shrink-0" />
                  <span>Commit Calibrations</span>
                </>
              )}
            </button>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="h-11 px-6 bg-red-950/20 hover:bg-red-950/30 text-red-500 border border-red-500/20 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Disconnect PORTAL</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
