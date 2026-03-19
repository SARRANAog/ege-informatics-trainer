interface TopbarProps {
    title: string;
    subtitle: string;
    progress: number;
    onContinue: () => void;
}

export function Topbar({
    title,
    subtitle,
    progress,
    onContinue,
}: TopbarProps) {
    return (
        <header className="border-b border-slate-900 bg-[#020817]/90 px-8 py-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                        Текущий раздел
                    </div>
                    <h1 className="mt-2 text-3xl font-semibold text-slate-100">
                        {title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
                        {subtitle}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                        Прогресс курса: {progress}%
                    </div>

                    <button
                        type="button"
                        onClick={onContinue}
                        className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                    >
                        К текущему блоку
                    </button>
                </div>
            </div>
        </header>
    );
}