import { create } from "zustand";
import type { Goal, GoalFilters } from "../types/goal";
interface GoalState {
  goals: Goal[];
  filters: GoalFilters;
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: number) => void;
  toggleGoal: (id: number) => void;
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

  addGoal: (goalInput: Goal) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          ...goalInput,
          id:
            state.goals.length > 0
              ? Math.max(...state.goals.map<number>((goal) => goal.id!)) + 1
              : 0,
          createdAt: new Date(),
          isCompleted: false,
        },
      ],
    })),

  updateGoal: (updatedGoal: Goal) =>
    set((state) => ({
      goals: state.goals.map((goal: Goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ),
    })),

  deleteGoal: (id: number) =>
    set((state) => ({
      goals: state.goals.filter((goal: Goal) => goal.id !== id),
    })),

  toggleGoal: (id: number) =>
    set((state) => ({
      goals: state.goals.map((goal: Goal) =>
        goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
      ),
    })),

  setFilters: (newFilters: Partial<GoalFilters>) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
