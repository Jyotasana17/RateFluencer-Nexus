"use client";

import React, { useState } from "react";
import { User, Mail, LogOut, Check, Save } from "lucide-react";
import { useNexusStore } from "@/lib/store";

export default function SettingsPage() {
  const { setIsAuthenticated } = useNexusStore();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@trendfatigue.ai");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center sm:text-left space-y-1 select-none">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
          System Settings
        </h2>
        <p className="text-xs text-slate-400 font-semibold">
          Manage your creator profile authentication and workspace credentials.
        </p>
      </div>

      {/* Settings Panel */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-blue-50/20 rounded-full blur-xl pointer-events-none -z-10" />

        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base select-none">⚙️</span>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Profile Configurations
            </h3>
          </div>
          <span className="text-[9px] font-bold text-blue-500 bg-blue-50/50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            Creator
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[#F8F9FD] border border-[#E5E9F0] focus:border-blue-400 focus:bg-white focus:shadow-[0_0_12px_rgba(59,130,246,0.08)] rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[#F8F9FD] border border-[#E5E9F0] focus:border-blue-400 focus:bg-white focus:shadow-[0_0_12px_rgba(59,130,246,0.08)] rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            {/* Save Changes */}
            <button
              type="submit"
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_4px_16px_rgba(59,130,246,0.15)] active:scale-98"
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4 text-white" />
                  <span>Changes Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 text-white" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="h-11 px-6 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
