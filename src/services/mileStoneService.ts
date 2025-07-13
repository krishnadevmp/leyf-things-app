import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";

const MILESTONE_API = `${config.apiBaseUrl}/api/Milestones`;
export interface MileStoneDTO {
  id?: string;
  title: string;
  status: string;
  dueDate?: string;
}

export const useCreateMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestone: Omit<MileStoneDTO, "id">) => {
      const res = await axios.post(MILESTONE_API, milestone);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

export const useUpdateMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestone: MileStoneDTO) => {
      const res = await axios.put(
        `${MILESTONE_API}/${milestone.id}`,
        milestone
      );
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

export const useDeleteMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${MILESTONE_API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

export const useUpdateMilestoneStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await axios.patch(`${MILESTONE_API}/${id}/status`, { status });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
