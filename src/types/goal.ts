export interface Goal {
  id?: number;
  title: string;
  description: string;
  isCompleted: boolean;
  targetDate?: Date;
  createdAt?: Date;
}

export interface GoalFilters {
  status: "all" | "completed" | "incomplete";
  sortBy: "targetDate" | "createdAt";
  sortOrder: "asc" | "desc";
}
