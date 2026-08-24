export interface Goal {
  id: string;
  date: string;
  title: string;
  notes?: string;
  isCompleted: boolean;
}

export interface GoalTemplate {
  id: string;
  title: string;
}

export interface Completion {
  goalId: string;
  date: string; // ISO date
  isCompleted: boolean;
}
