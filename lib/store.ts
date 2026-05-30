import { create } from "zustand";

type NexusState = {
  budget: number;
  goal: "Awareness" | "Conversion" | "Retention";
  setBudget: (budget: number) => void;
  setGoal: (goal: NexusState["goal"]) => void;
};

export const useNexusStore = create<NexusState>((set) => ({
  budget: 84000,
  goal: "Conversion",
  setBudget: (budget) => set({ budget }),
  setGoal: (goal) => set({ goal })
}));
