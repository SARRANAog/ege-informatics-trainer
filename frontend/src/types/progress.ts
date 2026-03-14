export type TaskProgress = {
  task_number: number;
  mastery_percent: number;
  solved_exercises: number;
  last_error_count: number;
  last_updated_at?: string | null;
};

export type ProgressResponse = {
  overall_progress_percent: number;
  estimated_ege_score: number;
  tasks: TaskProgress[];
};
