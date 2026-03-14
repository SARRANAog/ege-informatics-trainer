import { ProgressBar } from '../ui/ProgressBar';
import type { TabKey } from '../../types/models';

const items: Array<{ key: TabKey; label: string; caption: string }> = [
    { key: 'roadmap', label: 'Дорожка', caption: 'Основной путь подготовки' },
    { key: 'theory', label: 'Теория', caption: 'Краткие конспекты и ловушки' },
    { key: 'practice', label: 'Практика', caption: 'Тренировочные упражнения' },
    { key: 'mock', label: 'Пробник', caption: 'Режим как на экзамене' },
    { key: 'progress', label: 'Прогресс', caption: 'Проценты и ориентир по баллам' },
    { key: 'profile', label: 'Профиль', caption: 'Локальные настройки' }
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
    currentTaskNumber
}: SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar__brand">
                <div className="sidebar__logo">
                    <div className="sidebar__logo-mark">E</div>
                    <div className="sidebar__logo-copy">
                        <span>EGE Informatics Trainer</span>
                        <strong>Офлайн-подготовка по информатике</strong>
                    </div>
                </div>

                <div className="sidebar__progress">
                    <div className="sidebar__progress-copy">
                        <span>Общий прогресс</span>
                        <strong>{progress}%</strong>
                    </div>
                    <ProgressBar value={progress} compact />
                </div>

                <div className="sidebar__current-task">
                    {currentTaskNumber
                        ? `Сейчас открыт материал по заданию ${currentTaskNumber}`
                        : 'Выбери первую линию и начни путь.'}
                </div>
            </div>

            <div className="sidebar__section">
                <span className="sidebar__section-title">Разделы</span>

                <nav className="sidebar__nav">
                    {items.map((item) => (
                        <button
                            key={item.key}
                            className={`sidebar__nav-item ${activeTab === item.key ? 'is-active' : ''}`}
                            onClick={() => onChange(item.key)}
                        >
                            <span>{item.label}</span>
                            <small>{item.caption}</small>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="sidebar__footer">
                Теория, практика и контрольные собраны в один маршрут. Можно идти в своём темпе, без лимита по дням.
            </div>
        </aside>
    );
}