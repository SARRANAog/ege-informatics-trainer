export type Exercise = {
  id: string;
  title: string;
  type: string;
  prompt: string;
  expected_answer?: string;
  starter_code?: string;
  tests?: Array<{ name: string; stdin: string; expected_stdout: string }>;
  required_nodes?: string[];
  hint_after_first_error?: string;
  full_explanation?: string;
};
