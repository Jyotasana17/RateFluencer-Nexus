import { create } from "zustand";

type NexusState = {
  budget: number;
  goal: "Awareness" | "Conversion" | "Retention";
  setBudget: (budget: number) => void;
  setGoal: (goal: NexusState["goal"]) => void;
  
  // Unified authentication and tactical settings
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  fatigueThreshold: number;
  setFatigueThreshold: (val: number) => void;
  audioAlerts: boolean;
  setAudioAlerts: (val: boolean) => void;
  scanInterval: number;
  setScanInterval: (val: number) => void;
  aiModel: string;
  setAiModel: (val: string) => void;
};

export const useNexusStore = create<NexusState>((set) => ({
  budget: 84000,
  goal: "Conversion",
  setBudget: (budget) => set({ budget }),
  setGoal: (goal) => set({ goal }),

  // Settings initial states
  isAuthenticated: true,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  fatigueThreshold: 80,
  setFatigueThreshold: (val) => set({ fatigueThreshold: val }),
  audioAlerts: true,
  setAudioAlerts: (val) => set({ audioAlerts: val }),
  scanInterval: 3,
  setScanInterval: (val) => set({ scanInterval: val }),
  aiModel: "nexus-v4-turbo",
  setAiModel: (val) => set({ aiModel: val })
}));

