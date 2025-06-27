import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Goal, CreateGoalInput, GoalFilters } from '../types/goal';

interface GoalState {
  goals: Goal[];
  filters: GoalFilters;
  addGoal: (goal: CreateGoalInput) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  toggleGoal: (id: string) => void;
  setFilters: (filters: Partial<GoalFilters>) => void;
}

const initialFilters: GoalFilters = {
  status: 'all',
  sortBy: 'targetDate',
  sortOrder: 'asc',
};

export const useGoalStore = create<GoalState>()((set, get) => ({
  goals: [],
  filters: initialFilters,

  addGoal: (goalInput: CreateGoalInput) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          id: uuidv4(),
          ...goalInput,
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

  deleteGoal: (id: string) =>
    set((state) => ({
      goals: state.goals.filter((goal: Goal) => goal.id !== id),
    })),

  toggleGoal: (id: string) =>
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