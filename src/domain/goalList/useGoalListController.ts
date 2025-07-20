import { type MouseEvent } from "react";
import type { GoalFilters } from "../../types/goal";
import { useGoalStore } from "../../store/useGoalStore";
import {
  useDeleteGoal,
  useGetGoals,
  useUpdateGoalStatus,
  type GoalDTO,
} from "../../services/goalService";

const useGoalListController = () => {
  const { data: goals } = useGetGoals();
  const filters = useGoalStore((state) => state.filters);
  const setFilters = useGoalStore((state) => state.setFilters);
  const toggleGoal = useUpdateGoalStatus();
  const deleteGoal = useDeleteGoal();

  const handleToggleComplete = (goalId: string, status: string) => {
    toggleGoal.mutateAsync({ id: goalId, status: status });
  };

  const handleDelete = (goalId: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal.mutateAsync(goalId);
    }
  };

  const handleFilterChange = (
    event:
      | React.ChangeEvent<{ value: unknown }>
      | { target: { value: unknown } }
  ) => {
    setFilters({ status: event.target.value as GoalFilters["status"] });
  };

  const handleSortChange = (
    _: MouseEvent<HTMLElement>,
    value: GoalFilters["sortBy"] | null
  ) => {
    if (value) {
      setFilters({
        sortBy: value,
        sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
      });
    }
  };

  const filteredGoals =
    goals?.filter((goal: GoalDTO) => {
      if (filters.status === "completed") return goal.status === "completed";
      if (filters.status === "incomplete") return goal.status !== "completed";
      return true;
    }) ?? [];

  const sortedGoals = [...filteredGoals].sort((a: GoalDTO, b: GoalDTO) => {
    const dateA = a[filters.sortBy]
      ? new Date(a[filters.sortBy]!)
      : new Date(0);
    const dateB = b[filters.sortBy]
      ? new Date(b[filters.sortBy]!)
      : new Date(0);
    return filters.sortOrder === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const completedCount =
    goals?.filter((g: GoalDTO) => g.status === "completed")?.length ?? 0;
  const progress = (completedCount / (goals?.length ?? 0)) * 100 || 0;

  return {
    filters,
    setFilters,
    handleToggleComplete,
    handleDelete,
    handleFilterChange,
    handleSortChange,
    sortedGoals,
    completedCount,
    progress,
    goals,
  };
};

export default useGoalListController;
