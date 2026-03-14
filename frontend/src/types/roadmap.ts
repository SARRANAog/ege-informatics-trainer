export type RoadmapTask = {
  task_number: number;
  title: string;
  description: string;
  status: "locked" | "available" | "in_progress" | "completed";
};

export type RoadmapResponse = {
  title: string;
  tasks: RoadmapTask[];
  weekly_reviews: Array<{ id: string; title: string }>;
};
