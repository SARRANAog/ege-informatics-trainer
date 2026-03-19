import type { TabKey } from '../../types/models';

const items: Array<{ key: TabKey; label: string; caption: string }> = [
    {
        key: 'roadmap',
        label: 'Дорожка',
        caption: 'Общий маршрут подготовки',
    },
    {
        key: 'theory',
        label: 'Теория',
        caption: 'Краткая и подробная теория',
    },
    {
        key: 'practice',
        label: 'Практика',
        caption: 'Тесты и код на Python',
    },
    {
        key: 'mock',
        label: 'Пробник',
        caption: 'Режим как на экзамене',
    },
    {
        key: 'progress',
        label: 'Прогресс',
        caption: 'Локальный обзор продвижения',
    },
    {
        key: 'profile',
        label: 'Профиль',
        caption: 'Настройки ученика',
    },
];

interface SidebarProps {
    activeTab: TabKey;
    onChange: (tab: TabKey) => void;
    progress: number;
    currentTaskNumber: number | null;
}

export function Sidebar({
    activeTab,
    onChange,
    progress,
    currentTaskNumber,
}: SidebarProps) {
    return (
        <aside className="w-[320px] border-r border-slate-900 bg-[#020817] px-6 py-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-lg font-semibold text-slate-100">
                    EGE Informatics Trainer
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                    Офлайн-тренажёр по ЕГЭ по информатике.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-950/70 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                        Текущий статус
                    </div>
                    <div className="mt-2 text-sm text-slate-300">
                        Общий прогресс: {progress}%
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-400">
                        {currentTaskNumber
                            ? `Сейчас открыт блок по заданию ${currentTaskNumber}.`
                            : 'Выбери раздел и начни работу.'}
                    </div>
                </div>
            </div>

            <nav className="mt-6 space-y-3">
                {items.map((item) => {
                    const active = item.key === activeTab;

                    return (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onChange(item.key)}
                            className={`block w-full rounded-3xl border px-5 py-5 text-left transition ${active
                                    ? 'border-cyan-500/30 bg-cyan-500/10'
                                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                                }`}
                        >
                            <div className="text-xl font-semibold text-slate-100">
                                {item.label}
                            </div>
                            <div className="mt-1 text-sm leading-6 text-slate-400">
                                {item.caption}
                            </div>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-sm leading-7 text-slate-400">
                Сейчас активный приоритет — чтобы теория рендерилась из нового слоя
                данных, а теоретические задания шли только через выбор ответа.
            </div>
        </aside>
    );
}