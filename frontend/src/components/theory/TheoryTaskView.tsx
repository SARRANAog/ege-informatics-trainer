import type { TheoryMode, TheoryTaskContent } from '../../types/ege';

interface TheoryTaskViewProps {
    task: TheoryTaskContent;
    mode: TheoryMode;
    onModeChange: (mode: TheoryMode) => void;
}

export function TheoryTaskView({
    task,
    mode,
    onModeChange,
}: TheoryTaskViewProps) {
    const practiceBadgeClass =
        task.practiceFormat === 'code'
            ? 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300'
            : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                                {task.shortLabel}
                            </div>
                            <div
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${practiceBadgeClass}`}
                            >
                                {task.practiceFormatLabel}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-semibold text-slate-100">
                                {task.title}
                            </h1>
                            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-300">
                                {task.examFocus}
                            </p>
                        </div>
                    </div>

                    <div className="inline-flex rounded-2xl border border-slate-800 bg-slate-950 p-1">
                        <button
                            type="button"
                            onClick={() => onModeChange('summary')}
                            className={`rounded-xl px-4 py-2 text-sm transition ${mode === 'summary'
                                    ? 'bg-cyan-500 text-slate-950'
                                    : 'text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            Краткая теория
                        </button>
                        <button
                            type="button"
                            onClick={() => onModeChange('full')}
                            className={`rounded-xl px-4 py-2 text-sm transition ${mode === 'full'
                                    ? 'bg-cyan-500 text-slate-950'
                                    : 'text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            Подробная теория
                        </button>
                    </div>
                </div>
            </section>

            {mode === 'summary' ? (
                <>
                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                        <h2 className="text-2xl font-semibold text-slate-100">Суть задания</h2>
                        <p className="mt-4 text-sm leading-8 text-slate-300">
                            {task.summary.overview}
                        </p>
                    </section>

                    <div className="grid gap-6 xl:grid-cols-3">
                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                            <h3 className="text-lg font-semibold text-slate-100">
                                Что обязательно помнить
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                                {task.summary.mustRemember.map((item) => (
                                    <li key={item} className="rounded-2xl bg-slate-950/70 p-4">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                            <h3 className="text-lg font-semibold text-slate-100">
                                Как решать
                            </h3>
                            <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                                {task.summary.solvingPlan.map((item, index) => (
                                    <li key={item} className="rounded-2xl bg-slate-950/70 p-4">
                                        <span className="mr-2 text-cyan-300">{index + 1}.</span>
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                            <h3 className="text-lg font-semibold text-slate-100">
                                Быстрые примеры
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                                {task.summary.miniExamples.map((item) => (
                                    <li key={item} className="rounded-2xl bg-slate-950/70 p-4">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </>
            ) : (
                <>
                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                        <h2 className="text-2xl font-semibold text-slate-100">
                            Подробный разбор задания
                        </h2>
                        <p className="mt-4 text-sm leading-8 text-slate-300">
                            {task.full.intro}
                        </p>
                    </section>

                    {task.full.microtopics.map((topic) => (
                        <section
                            key={topic.id}
                            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
                        >
                            <h3 className="text-xl font-semibold text-slate-100">
                                {topic.title}
                            </h3>

                            <div className="mt-4 space-y-4 text-sm leading-8 text-slate-300">
                                {topic.explanation.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                                <div>
                                    <h4 className="text-sm font-semibold text-cyan-300">
                                        Главное по микротеме
                                    </h4>
                                    <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                                        {topic.keyPoints.map((item) => (
                                            <li key={item} className="rounded-2xl bg-slate-950/70 p-4">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-amber-300">
                                        Частые ошибки
                                    </h4>
                                    <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                                        {topic.commonMistakes.map((item) => (
                                            <li key={item} className="rounded-2xl bg-slate-950/70 p-4">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {topic.studentQuestions && topic.studentQuestions.length > 0 ? (
                                <div className="mt-6">
                                    <h4 className="text-sm font-semibold text-fuchsia-300">
                                        Частые вопросы ученика
                                    </h4>
                                    <div className="mt-3 space-y-3">
                                        {topic.studentQuestions.map((item) => (
                                            <div
                                                key={item.question}
                                                className="rounded-2xl bg-slate-950/70 p-4"
                                            >
                                                <div className="text-sm font-medium text-slate-100">
                                                    {item.question}
                                                </div>
                                                <p className="mt-2 text-sm leading-7 text-slate-300">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {topic.example ? (
                                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                                    <h4 className="text-sm font-semibold text-slate-100">
                                        {topic.example.title}
                                    </h4>
                                    <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                                        {topic.example.steps.map((step, index) => (
                                            <li key={step}>
                                                <span className="mr-2 text-cyan-300">{index + 1}.</span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="mt-4 rounded-xl bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                                        Ответ: {topic.example.answer}
                                    </div>
                                </div>
                            ) : null}
                        </section>
                    ))}

                    <div className="grid gap-6 xl:grid-cols-2">
                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                            <h3 className="text-xl font-semibold text-slate-100">
                                Общие вопросы по заданию
                            </h3>
                            <div className="mt-4 space-y-4">
                                {task.full.faqs.map((item) => (
                                    <div
                                        key={item.question}
                                        className="rounded-2xl bg-slate-950/70 p-4"
                                    >
                                        <div className="text-sm font-medium text-slate-100">
                                            {item.question}
                                        </div>
                                        <p className="mt-2 text-sm leading-7 text-slate-300">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                            <h3 className="text-xl font-semibold text-slate-100">
                                Чек-лист перед практикой
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                                {task.full.finalChecklist.map((item) => (
                                    <li key={item} className="rounded-2xl bg-slate-950/70 p-4">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
}
