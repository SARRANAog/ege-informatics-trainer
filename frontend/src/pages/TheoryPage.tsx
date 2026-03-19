import { useMemo, useState } from 'react';
import { TheoryTaskView } from '../components/theory/TheoryTaskView';
import { theoryTasks } from '../data/egeContent';
import type { TheoryMode } from '../types/ege';

export default function TheoryPage() {
    const [selectedTaskId, setSelectedTaskId] = useState<number>(1);
    const [mode, setMode] = useState<TheoryMode>('summary');

    const selectedTask = useMemo(
        () => theoryTasks.find((task) => task.taskId === selectedTaskId) ?? theoryTasks[0],
        [selectedTaskId],
    );

    return (
        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="px-2 pb-3">
                    <div className="text-sm font-semibold text-slate-100">
                        Теория по заданиям
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Для каждого задания есть краткая теория и подробный разбор. Формат
                        практики сразу отмечен: выбор ответа или код на Python.
                    </p>
                </div>

                <div className="space-y-2">
                    {theoryTasks.map((task) => {
                        const active = task.taskId === selectedTaskId;
                        const formatClass =
                            task.practiceFormat === 'code'
                                ? 'border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300'
                                : 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300';

                        return (
                            <button
                                key={task.taskId}
                                type="button"
                                onClick={() => setSelectedTaskId(task.taskId)}
                                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${active
                                        ? 'border-cyan-500/40 bg-cyan-500/10'
                                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="text-sm font-medium text-slate-100">
                                        {task.shortLabel}
                                    </div>
                                    <div
                                        className={`rounded-full border px-2 py-0.5 text-[10px] ${formatClass}`}
                                    >
                                        {task.practiceFormat === 'code' ? 'Python' : 'Выбор'}
                                    </div>
                                </div>

                                <div className="mt-1 text-xs leading-5 text-slate-400">
                                    {task.title}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </aside>

            <main>
                <TheoryTaskView task={selectedTask} mode={mode} onModeChange={setMode} />
            </main>
        </div>
    );
}
