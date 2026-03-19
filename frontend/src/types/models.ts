export type TabKey =
    | 'roadmap'
    | 'theory'
    | 'practice'
    | 'mock'
    | 'progress'
    | 'profile';

export type RoadmapStatus =
    | 'locked'
    | 'available'
    | 'in_progress'
    | 'completed';

export interface RoadmapTask {
    task_number: number;
    title: string;
    description: string;
    status: RoadmapStatus;
}

export interface WeeklyReviewItem {
    id: string;
    title: string;
}

export interface RoadmapResponse {
    title: string;
    tasks: RoadmapTask[];
    weekly_reviews: WeeklyReviewItem[];
}

export interface TheoryExample {
    question: string;
    answer: string;
}

// Это текущий стабильный MVP-контракт теории, который реально рендерится сейчас.
// При переходе на обязательные short/full блоки меняйте согласованно:
// content/theory/* -> backend/content/loader.py -> backend/api/routes/theory.py
// -> frontend/src/types/models.ts -> TheoryPage.
export interface TheoryPayload {
    task_number: number;
    title: string;
    summary: string;
    formulae: string[];
    traps: string[];
    examples: TheoryExample[];
}

export interface ExerciseTest {
    name: string;
    stdin: string;
    expected_stdout: string;
}

export interface Exercise {
    id: string;
    title: string;
    type: 'choice' | 'code';
    prompt: string;
    expected_answer?: string;
    starter_code?: string;
    tests?: ExerciseTest[];
    required_nodes?: string[];
    hint_after_first_error?: string;
    full_explanation?: string;
}

export interface PracticePayload {
    task_number: number;
    title: string;
    exercises: Exercise[];
}

export interface TaskProgress {
    task_number: number;
    mastery_percent: number;
    solved_exercises: number;
    last_error_count: number;
    last_updated_at?: string | null;
}

export interface ProgressSummary {
    overall_progress_percent: number;
    estimated_ege_score: number;
    tasks: TaskProgress[];
}

export interface ProfilePayload {
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface ChoiceSubmitResult {
    is_correct: boolean;
    hint_level: 'none' | 'hint' | 'full_explanation';
}

export interface CodePolicyViolationResult {
    ok: false;
    message: string;
    violations: string[];
}

export interface CodeCheckSuccessResult {
    ok: true;
    feedback: {
        tests: {
            results: Array<{
                name: string;
                passed: boolean;
                expected: string;
                actual: string;
                stderr: string;
            }>;
            all_passed: boolean;
        };
        ast: {
            ok?: boolean;
            errors?: string[];
            missing_nodes?: string[];
            node_names?: string[];
            matches_requirements?: boolean;
        };
    };
}

export type CodeCheckResult = CodePolicyViolationResult | CodeCheckSuccessResult;