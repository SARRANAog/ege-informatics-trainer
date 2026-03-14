import { useMemo, useState } from 'react';
import type {
    PracticeChoiceQuestion,
    PracticeCodeQuestion,
    PracticeQuestion,
} from '../../types/ege';

interface PracticeTaskViewProps {
    taskId: number;
    questions: PracticeQuestion[];
}

type FeedbackState = 'idle' | 'correct' | 'wrong';

const difficultyLabel: Record<string, string> = {
    easy: 'Лёгкий',
    medium: 'Средний',
    hard: 'Сложный',
};

export function PracticeTaskView({
    taskId,
    questions,
}: PracticeTaskViewProps) {
    const taskQuestions = useMemo(
        () => questions.filter((question) => question.taskId === taskId),
        [questions, taskId],
    );

    const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>(
        {},
    );
    const [attempts, setAttempts] = useState<Record<string, number>>({});
    const [feedback, setFeedback] = useState<Record<string, FeedbackState>>({});
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});
    const [codeAnswers, setCodeAnswers] = useState<Record<string, string>>({});

    const solvedCount = taskQuestions.filter(
        (question) => feedback[question.id] === 'correct',
    ).length;

    const hasChoice = taskQuestions.some((question) => question.kind === 'choice');
    const hasCode = taskQuestions.some((question) => question.kind === 'code');

    const headerText = hasCode && !hasChoice
        ? 'Это кодовое задание. Практика здесь идёт через ручной ввод решения на Python.'
        : hasChoice && !hasCode
            ? 'Это некодовое задание. Теоретические вопросы здесь даются только в формате выбора ответа.'
            : 'В этом блоке есть и вопросы с выбором ответа, и кодовые упражнения. Ручной ввод используется только для кода.';

    const handleCheckChoice = (question: PracticeChoiceQuestion) => {
        const selected = selectedOptions[question.id];

        if (selected === undefined) {
            return;
        }

        if (selected === question.correctOptionIndex) {
            setFeedback((prev) => ({ ...prev, [question.id]: 'correct' }));
            setRevealed((prev) => ({ ...prev, [question.id]: true }));
            return;
        }

        const nextAttempts = (attempts[question.id] ?? 0) + 1;
        setAttempts((prev) => ({ ...prev, [question.id]: nextAttempts }));
        setFeedback((prev) => ({ ...prev, [question.id]: 'wrong' }));

        if (nextAttempts >= 3) {
            setRevealed((prev) => ({ ...prev, [question.id]: true }));
        }
    };

    const renderChoiceQuestion = (question: PracticeChoiceQuestion) => {
        const selected = selectedOptions[question.id];
        const questionAttempts = attempts[question.id] ?? 0;
        const isRevealed = revealed[question.id] ?? false;
        const state = feedback[question.id] ?? 'idle';

        return (
            <article
                key={question.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                        {difficultyLabel[question.difficulty]}
                    </div>
                    <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                        Теория • выбор ответа
                    </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-100">
                    {question.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                    {question.prompt}
                </p>

                <div className="mt-5 space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = selected === index;
                        const showCorrect = isRevealed && index === question.correctOptionIndex;
                        const showWrongSelected =
                            isRevealed &&
                            isSelected &&
                            index !== question.correctOptionIndex;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() =>
                                    setSelectedOptions((prev) => ({
                                        ...prev,
                                        [question.id]: index,
                                    }))
                                }
                                className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${showCorrect
                                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                                        : showWrongSelected
                                            ? 'border-rose-500/50 bg-rose-500/10 text-rose-200'
                                            : isSelected
                                                ? 'border-cyan-500/60 bg-cyan-500/10 text-slate-100'
                                                : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
                                    }`}
                            >
                                <span className="mr-3 text-cyan-300">{index + 1}.</span>
                                {option}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => handleCheckChoice(question)}
                        disabled={selected === undefined || state === 'correct'}
                        className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Проверить
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setRevealed((prev) => ({ ...prev, [question.id]: true }))
                        }
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                    >
                        Показать разбор
                    </button>
                </div>

                {state === 'correct' ? (
                    <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                        Верно. Задача засчитана.
                    </div>
                ) : null}

                {state === 'wrong' && questionAttempts >= 1 && !isRevealed ? (
                    <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                        Намёк: {question.hint}
                    </div>
                ) : null}

                {isRevealed ? (
                    <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                        <div className="text-sm font-medium text-slate-100">Разбор</div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            {question.explanation}
                        </p>
                        <div className="mt-3 text-xs text-slate-400">
                            Попыток: {questionAttempts}
                        </div>
                    </div>
                ) : null}
            </article>
        );
    };

    const renderCodeQuestion = (question: PracticeCodeQuestion) => {
        const isRevealed = revealed[question.id] ?? false;

        return (
            <article
                key={question.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                        {difficultyLabel[question.difficulty]}
                    </div>
                    <div className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-300">
                        Код • Python
                    </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-100">
                    {question.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                    {question.prompt}
                </p>

                <textarea
                    value={codeAnswers[question.id] ?? question.starterCode}
                    onChange={(event) =>
                        setCodeAnswers((prev) => ({
                            ...prev,
                            [question.id]: event.target.value,
                        }))
                    }
                    spellCheck={false}
                    className="mt-5 min-h-[260px] w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-sm text-slate-200 outline-none transition focus:border-cyan-500/50"
                />

                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            setRevealed((prev) => ({ ...prev, [question.id]: true }))
                        }
                        className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                    >
                        Показать требования
                    </button>
                </div>

                <div className="mt-4 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-3 text-sm text-fuchsia-200">
                    Для этого задания ручной ввод нужен именно для написания решения на Python.
                </div>

                {isRevealed ? (
                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                            <div className="text-sm font-medium text-slate-100">
                                Что должно быть в решении
                            </div>
                            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                                {question.solutionRequirements.map((item) => (
                                    <li key={item} className="rounded-xl bg-slate-900 p-3">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                            <div className="text-sm font-medium text-slate-100">Разбор</div>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                {question.explanation}
                            </p>
                            <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                                Намёк: {question.hint}
                            </div>
                        </div>
                    </div>
                ) : null}
            </article>
        );
    };

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                            Практика
                        </div>
                        <h2 className="mt-3 text-2xl font-semibold text-slate-100">
                            Задание {taskId}
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                            {headerText}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300">
                        Решено: <span className="font-semibold text-slate-100">{solvedCount}</span> из{' '}
                        <span className="font-semibold text-slate-100">{taskQuestions.length}</span>
                    </div>
                </div>
            </section>

            {taskQuestions.length === 0 ? (
                <section className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-400">
                    Для этого задания практика ещё не добавлена.
                </section>
            ) : (
                taskQuestions.map((question) =>
                    question.kind === 'choice'
                        ? renderChoiceQuestion(question)
                        : renderCodeQuestion(question),
                )
            )}
        </div>
    );
}
