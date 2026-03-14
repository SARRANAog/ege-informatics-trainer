export type TheoryMode = 'summary' | 'full';
export type PracticeFormat = 'choice' | 'code';

export interface TheoryMiniExample {
    title: string;
    steps: string[];
    answer: string;
}

export interface TheoryFaqItem {
    question: string;
    answer: string;
}

export interface TheoryMicrotopic {
    id: string;
    title: string;
    explanation: string[];
    keyPoints: string[];
    commonMistakes: string[];
    studentQuestions?: TheoryFaqItem[];
    example?: TheoryMiniExample;
}

export interface TheorySummaryBlock {
    overview: string;
    mustRemember: string[];
    solvingPlan: string[];
    miniExamples: string[];
}

export interface TheoryFullBlock {
    intro: string;
    microtopics: TheoryMicrotopic[];
    faqs: TheoryFaqItem[];
    finalChecklist: string[];
}

export interface TheoryTaskContent {
    taskId: number;
    title: string;
    shortLabel: string;
    examFocus: string;
    practiceFormat: PracticeFormat;
    practiceFormatLabel: string;
    summary: TheorySummaryBlock;
    full: TheoryFullBlock;
}

export type PracticeDifficulty = 'easy' | 'medium' | 'hard';

interface PracticeBaseQuestion {
    id: string;
    taskId: number;
    title: string;
    difficulty: PracticeDifficulty;
    prompt: string;
    hint: string;
    explanation: string;
}

export interface PracticeChoiceQuestion extends PracticeBaseQuestion {
    kind: 'choice';
    options: string[];
    correctOptionIndex: number;
}

export interface PracticeCodeQuestion extends PracticeBaseQuestion {
    kind: 'code';
    starterCode: string;
    solutionRequirements: string[];
}

export type PracticeQuestion = PracticeChoiceQuestion | PracticeCodeQuestion;
