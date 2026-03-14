export type Theory = {
  task_number: number;
  title: string;
  summary: string;
  formulae: string[];
  traps: string[];
  examples: Array<{ question: string; answer: string }>;
};
