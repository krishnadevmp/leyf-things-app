import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface MileStoneDTO {
  title?: string;
  isComplete: boolean;
  dueDate?: string;
}

export interface GoalDTO {
  title?: string;
  description?: string;
  category?: string;
  targetDate?: string;
  priority?: string;
  status?: string;
  mileStones?: MileStoneDTO[];
}

const API_BASE = "/api/Goals";

export const useGetGoals = () => {
  return useQuery<GoalDTO[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await axios.get(API_BASE);
      return res.data;
    },
  });
};

export const useGetGoalById = (id: string) => {
  return useQuery<GoalDTO>({
    queryKey: ["goals", id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data;
    },
    enabled: !!id, // Only fetch if id exists
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: GoalDTO) => {
      const res = await axios.post(API_BASE, goal);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

export const useUpdateGoal = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: GoalDTO) => {
      const res = await axios.put(`${API_BASE}/${id}`, goal);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", id] });
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
