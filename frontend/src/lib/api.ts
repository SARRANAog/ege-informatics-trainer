import type {
    ChoiceSubmitResult,
    CodeCheckResult,
    PracticePayload,
    ProfilePayload,
    ProgressSummary,
    RoadmapResponse,
    TheoryPayload,
} from '../types/models';

const API_BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
        ...init,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const rawText = await response.text();

    if (!response.ok) {
        throw new Error(`API ${response.status}: ${rawText.slice(0, 300)}`);
    }

    if (!contentType.includes('application/json')) {
        throw new Error(
            `Ожидали JSON, но сервер вернул ${contentType || 'неизвестный тип'}: ${rawText.slice(0, 300)}`
        );
    }

    try {
        return JSON.parse(rawText) as T;
    } catch {
        throw new Error(
            `Не удалось распарсить JSON. Ответ сервера: ${rawText.slice(0, 300)}`
        );
    }
}

export const api = {
    health: () => request<{ ok: boolean }>('/health'),

    getProfile: () =>
        request<{ profile: ProfilePayload | null }>('/profile'),

    createProfile: (name: string) =>
        request<{ profile: ProfilePayload }>('/profile', {
            method: 'POST',
            body: JSON.stringify({ name }),
        }),

    updateProfile: (name: string) =>
        request<{ profile: ProfilePayload }>('/profile', {
            method: 'PATCH',
            body: JSON.stringify({ name }),
        }),

    getRoadmap: () =>
        request<RoadmapResponse>('/roadmap'),

    getTheory: (taskNumber: number) =>
        request<TheoryPayload>(`/theory/${taskNumber}`),

    getPractice: (taskNumber: number) =>
        request<PracticePayload>(`/practice/${taskNumber}`),

    submitChoice: (payload: {
        task_number: number;
        expected_answer: string;
        user_answer: string;
        error_count: number;
    }) =>
        request<ChoiceSubmitResult>('/practice/submit-choice', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    submitCode: (payload: {
        code: string;
        tests: Array<{ name: string; stdin: string; expected_stdout: string }>;
        required_nodes: string[];
    }) =>
        request<CodeCheckResult>('/code-check', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    getProgress: () =>
        request<ProgressSummary>('/progress'),
};