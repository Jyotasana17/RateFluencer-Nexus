"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNexusStore } from "@/lib/store";
import { 
  Users, 
  Activity, 
  Cpu, 
  Database, 
  ShieldAlert, 
  RefreshCw, 
  Sparkles,
  Terminal,
  Server
} from "lucide-react";

// Interactive User Session Database
const initialUsers = [
  { id: "u1", name: "Mira Vale", handle: "@miravalelabs", plan: "Free Plan", status: "Active", sector: "Clean Beauty", joinDate: "2026-05-12" },
  { id: "u2", name: "Ari North", handle: "@northframes", plan: "Free Plan", status: "Active", sector: "AI Filmmaking", joinDate: "2026-05-18" },
  { id: "u3", name: "Nia Sol", handle: "@niasolfit", plan: "Free Plan", status: "Active", sector: "Fitness", joinDate: "2026-05-24" },
  { id: "u4", name: "Kai Atlas", handle: "@kaiatlas.eats", plan: "Free Plan", status: "Inactive", sector: "Future Food", joinDate: "2026-05-29" },
  { id: "u5", name: "Operator Alpha", handle: "@ratefluencer_admin", plan: "Admin Portal", status: "Active", sector: "System Admin", joinDate: "2026-01-01" }
];

export default function SystemAdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useNexusStore();
  
  // Interactive User States
  const [usersList, setUsersList] = useState(initialUsers);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Live Performance Metric States
  const [responseTime, setResponseTime] = useState(42);
  const [cpuLoad, setCpuLoad] = useState(18);
  const [memoryUsage, setMemoryUsage] = useState(34);
  const [errorRate, setErrorRate] = useState(0.02);
  
  // Live log compiler states
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "[SYSTEM] Node AP-South: Active (8ms)",
    "[SYSTEM] Cache hit ratio at 98.4%",
    "[SYSTEM] Session key sync complete",
    "[MONITOR] Websocket connection pool operational"
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Toggle user status (Active vs Suspended)
  const toggleUserStatus = (userId: string) => {
    const targetUser = usersList.find(u => u.id === userId);
    if (!targetUser) return;
    
    if (targetUser.sector === "System Admin") {
      triggerToast("SECURITY BLOCK: CANNOT SUSPEND SYSTEM ADMINISTRATORS.");
      return;
    }

    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        triggerToast(`User session for ${u.handle} set to ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Simulate Telemetry Metric Refresher
  const refreshSystemTelemetry = () => {
    setIsRefreshing(true);
    setSystemLogs(prev => [...prev, "> Initiating fresh system telemetry sweep..."]);
    
    setTimeout(() => {
      // Generate highly realistic live fluctuations
      setResponseTime(Math.floor(Math.random() * 10) + 36);
      setCpuLoad(Math.floor(Math.random() * 8) + 14);
      setMemoryUsage(Math.floor(Math.random() * 4) + 31);
      setErrorRate(Number((Math.random() * 0.04).toFixed(3)));

      setSystemLogs([
        `[SYSTEM] Sweep completed. Node Response: ${Math.floor(Math.random() * 10) + 36}ms`,
        `[MONITOR] Memory footprint parsed successfully.`,
        `[SYSTEM] Node EU-West: Active (${Math.floor(Math.random() * 15) + 20}ms)`,
        `[SECURITY] Cloudflare firewall index is 100% clean.`
      ]);
      setIsRefreshing(false);
      triggerToast("System diagnostics telemetry updated.");
    }, 800);
  };

  // Enforce Admin Verification on Mount
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-[#0A0A0A] border border-red-500/20 rounded-[20px] shadow-[0_0_30px_rgba(220,38,38,0.1)] text-center font-mono">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-955/20 border border-red-500/25 text-red-500 animate-pulse">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="text-sm font-black text-red-500 uppercase tracking-widest">[ ACCESS VIOLATION ]</h2>
        <p className="mt-3 text-xs leading-relaxed text-[#6B7280]">
          DECRYPTION FAILURE: THIS ROUTE CONTAINS SYSTEM OPERATIONAL DATA AND IS RESTRICTED STRICTLY TO AUTHORIZED ADMINISTRATORS.
        </p>
        <button 
          onClick={() => router.push("/")}
          className="mt-6 w-full h-11 bg-red-950/40 hover:bg-red-950/60 text-red-550 border border-red-500/20 hover:border-red-500/40 font-bold rounded-lg text-xs uppercase tracking-widest transition-all"
        >
          Return to Decryptor Portal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 text-[#B3B3B3] font-mono select-none animate-fade-in-up">
      
      {/* Floating System Toast */}
      {showToast && (
        <div className="fixed bottom-14 right-6 z-50 flex items-center gap-3 bg-[#0A0A0A] border border-[#AEF597]/30 text-white rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(174,245,151,0.15)] animate-fade-in-up">
          <Sparkles className="h-4 w-4 text-[#AEF597] animate-pulse" />
          <span className="text-[11px] font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Panel */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/[0.01] rounded-full blur-xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <h1 className="text-base font-black text-white uppercase tracking-wider">System Operations Console</h1>
            </div>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">Secure administrative portal for website performance monitoring and user directories.</p>
          </div>
          
          <button 
            onClick={refreshSystemTelemetry}
            disabled={isRefreshing}
            className="px-4 py-2.5 bg-red-950/40 hover:bg-red-950/60 text-red-550 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
          >
            {isRefreshing ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Server className="h-3.5 w-3.5" />
            )}
            <span>Refresh Diagnostics</span>
          </button>
        </div>
      </div>

      {/* TOP ROW: 4 DIAGNOSTIC BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Block 1: User Count */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Total Registered Users</span>
            <Users className="h-4 w-4 text-red-550" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono leading-none">8,421</span>
            <span className="text-[9px] text-[#AEF597] font-bold uppercase tracking-wider bg-[#AEF597]/10 px-1 py-0.5 rounded border border-[#AEF597]/10">+12% this month</span>
          </div>
          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2.5 border-t border-white/5 mt-4 flex justify-between">
            <span>Creators: 8,417</span>
            <span>Admins: 4</span>
          </div>
        </div>

        {/* Block 2: Node Response Time */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Average Node Response</span>
            <Activity className="h-4 w-4 text-red-550" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono leading-none">{responseTime}ms</span>
            <span className="text-[8px] font-extrabold text-red-500 bg-red-950/20 border border-red-500/20 px-1 py-0.5 rounded uppercase tracking-wider">OPTIMAL</span>
          </div>
          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2.5 border-t border-white/5 mt-4 flex justify-between">
            <span>Cache Hit Rate: 98.4%</span>
            <span>Server Nodes: 4 Active</span>
          </div>
        </div>

        {/* Block 3: CPU Load */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">Global CPU Core Load</span>
            <Cpu className="h-4 w-4 text-red-550" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono leading-none">{cpuLoad}%</span>
            <div className="w-16 h-2 rounded bg-black/40 border border-white/10 relative overflow-hidden self-center">
              <div className="h-full bg-red-550 rounded-sm" style={{ width: `${cpuLoad}%` }} />
            </div>
          </div>
          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2.5 border-t border-white/5 mt-4 flex justify-between">
            <span>Memory Load: {memoryUsage}%</span>
            <span>DB Connections: 82</span>
          </div>
        </div>

        {/* Block 4: System Stability */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-5 shadow-2xl relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider">System Failure Rate</span>
            <Database className="h-4 w-4 text-red-550" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono leading-none">{errorRate}%</span>
            <span className="text-[8px] font-extrabold text-[#AEF597] bg-[#AEF597]/10 border border-[#AEF597]/20 px-1 py-0.5 rounded uppercase tracking-wider">EXCELLENT</span>
          </div>
          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-2.5 border-t border-white/5 mt-4 flex justify-between">
            <span>API SSL Sync: Approved</span>
            <span>Cloudflare: Active</span>
          </div>
        </div>

      </div>

      {/* CORE ADMIN CONTENT PANELS: USER DIRECTORY & Performance DIAGNOSTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Hand: User Session Directory (Col span 7) */}
        <div className="xl:col-span-7 bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Users className="h-4 w-4 text-red-550" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Active Creator Sessions Directory</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[#6B7280] font-extrabold uppercase">
                    <th className="py-2.5">Operator</th>
                    <th className="py-2.5">Niche Sector</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersList.map((user) => (
                    <tr key={user.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5">
                        <div className="font-bold text-white leading-none">{user.name}</div>
                        <div className="text-[10px] text-[#6B7280] font-mono mt-1">{user.handle}</div>
                      </td>
                      <td className="py-3.5 text-[#B3B3B3]">{user.sector}</td>
                      <td className="py-3.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${
                          user.status === "Active"
                            ? "text-[#AEF597] bg-[#AEF597]/10 border-[#AEF597]/20"
                            : "text-red-500 bg-red-950/20 border-red-500/20"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button 
                          onClick={() => toggleUserStatus(user.id)}
                          className={`px-2 py-1 rounded text-[9px] font-bold uppercase border transition-all ${
                            user.status === "Active"
                              ? "border-red-500/25 text-red-550 hover:bg-red-950/20"
                              : "border-[#AEF597]/25 text-[#AEF597] hover:bg-[#AEF597]/10"
                          }`}
                        >
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-4 border-t border-white/5 mt-6 text-center">
            CREATOR DIARY SYNCHRONIZED ACROSS 5 CENTRAL CHANNELS
          </div>
        </div>

        {/* Right Hand: System Nodes & Telemetry Console Logs (Col span 5) */}
        <div className="xl:col-span-5 bg-[#0A0A0A] border border-white/5 rounded-[20px] p-6 shadow-2xl flex flex-col justify-between">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Server className="h-4 w-4 text-red-550" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Website Node Diagnostics</h2>
            </div>

            {/* Nodes Health Grid */}
            <div className="space-y-3">
              <div className="text-[10px] font-extrabold text-white uppercase tracking-wider">Server Node Matrices</div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Node 1 */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#6B7280]">
                    <span>US-EAST (VA)</span>
                    <span className="h-2 w-2 rounded-full bg-[#AEF597] animate-pulse" />
                  </div>
                  <div className="text-xs font-black text-white font-mono">OPERATIONAL (12ms)</div>
                </div>

                {/* Node 2 */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#6B7280]">
                    <span>EU-WEST (DE)</span>
                    <span className="h-2 w-2 rounded-full bg-[#AEF597] animate-pulse" />
                  </div>
                  <div className="text-xs font-black text-white font-mono">OPERATIONAL (28ms)</div>
                </div>

                {/* Node 3 */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#6B7280]">
                    <span>AP-SOUTH (IN)</span>
                    <span className="h-2 w-2 rounded-full bg-[#AEF597] animate-pulse" />
                  </div>
                  <div className="text-xs font-black text-white font-mono">OPERATIONAL (8ms)</div>
                </div>

                {/* Node 4 */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#6B7280]">
                    <span>US-WEST (OR)</span>
                    <span className="h-2 w-2 rounded-full bg-[#AEF597] animate-pulse" />
                  </div>
                  <div className="text-xs font-black text-white font-mono">OPERATIONAL (19ms)</div>
                </div>
              </div>
            </div>

            {/* Live Terminal Console Logs */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-extrabold text-white uppercase tracking-wider">Log Output</div>
              
              <div className="bg-black/60 border border-white/5 rounded-xl p-4 min-h-[140px] max-h-[160px] overflow-y-auto text-left font-mono relative">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-[#dc2626]/10 border border-[#dc2626]/20 px-2 py-0.5 rounded text-[8px] font-bold text-red-500">
                  <Terminal className="w-3 h-3 animate-pulse" />
                  <span>SECURE CHANNEL</span>
                </div>
                
                <div className="space-y-1 text-[9px] font-bold text-red-500 uppercase tracking-wider leading-relaxed">
                  {systemLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span>&gt;</span>
                      <span className="text-[#B3B3B3] font-normal leading-normal">{log}</span>
                    </div>
                  ))}
                  {isRefreshing && (
                    <div className="flex items-center gap-1 text-[#AEF597] pt-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full border-t border-[#AEF597] animate-spin" />
                      <span>COMPILING...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          <div className="text-[8px] font-extrabold text-[#6B7280] uppercase tracking-wider pt-4 border-t border-white/5 mt-6 text-center">
            DIAGNOSTICS PROCESSED THROUGH CLOUDFLARE telemetry
          </div>

        </div>

      </div>

    </div>
  );
}
