import { create } from "zustand";
import type { GoalFilters } from "../types/goal";
import type { GoalDTO } from "../services/goalService";
interface GoalState {
  goals: GoalDTO[];
  filters: GoalFilters;
  addGoal: (goal: GoalDTO) => void;
  updateGoal: (goal: GoalDTO) => void;
  deleteGoal: (id: string) => void;
  toggleGoal: (id: string) => void;
  setFilters: (filters: Partial<GoalFilters>) => void;
}

const initialFilters: GoalFilters = {
  status: "all",
  sortBy: "targetDate",
  sortOrder: "asc",
};

export const useGoalStore = create<GoalState>()((set) => ({
  goals: [],
  filters: initialFilters,

  addGoal: (goalInput: GoalDTO) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          ...goalInput,
          createdAt: new Date(),
          isCompleted: false,
        },
      ],
    })),

  updateGoal: (updatedGoal: GoalDTO) =>
    set((state) => ({
      goals: state.goals.map((goal: GoalDTO) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ),
    })),

  deleteGoal: (id: string) =>
    set((state) => ({
      goals: state.goals.filter((goal: GoalDTO) => goal.id !== id),
    })),

  toggleGoal: (id: string) =>
    set((state) => ({
      goals: state.goals.map<GoalDTO>((goal: GoalDTO) =>
        goal.id === id
          ? {
              ...goal,
              status: goal.status === "completed" ? "inComplete" : "completed",
            }
          : goal
      ),
    })),

  setFilters: (newFilters: Partial<GoalFilters>) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
