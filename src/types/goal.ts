export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate?: Date;
  createdAt: Date;
  isCompleted: boolean;
}

export interface GoalFilters {
  status: 'all' | 'completed' | 'incomplete';
  sortBy: 'targetDate' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface CreateGoalInput {
  title: string;
  description: string;
  targetDate?: Date;
} 