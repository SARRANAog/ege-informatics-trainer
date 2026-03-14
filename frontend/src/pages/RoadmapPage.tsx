import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import type {
    ProgressSummary,
    RoadmapStatus,
    RoadmapTask,
    WeeklyReviewItem,
} from '../types/models';

interface RoadmapPageProps {
    roadmapTitle: string;
    tasks: RoadmapTask[];
    weeklyReviews: WeeklyReviewItem[];
    summary: ProgressSummary | null;
    currentTaskNumber: number | null;
    onOpenTask: (taskNumber: number) => void;
}

function getStatusLabel(status: RoadmapStatus): string {
    switch (status) {
        case 'available':
            return 'Доступно';
        case 'in_progress':
            return 'В процессе';
        case 'completed':
            return 'Пройдено';
        case 'locked':
        default:
            return 'Закрыто';
    }
}

function getStatusClass(status: RoadmapStatus): string {
    switch (status) {
        case 'completed':
            return 'done';
        case 'available':
        case 'in_progress':
            return 'available';
        case 'locked':
        default:
            return 'locked';
    }
}

export function RoadmapPage({
    roadmapTitle,
    tasks,
    weeklyReviews,
    summary,
    currentTaskNumber,
    onOpenTask,
}: RoadmapPageProps) {
    return (
        <div className="page-stack">
            <section className="page-hero">
                <div className="page-hero__badge">Дорожка</div>
                <div className="page-hero__title-row">
                    <div>
                        <h1>{roadmapTitle}</h1>
                        <p>
                            Сначала короткая теория, потом микроупражнения, затем мини-контроль.
                            Идти можно в любом темпе — приложение просто ведёт тебя по всей структуре.
                        </p>
                    </div>
                </div>

                <div className="page-hero__stats">
                    <div className="mini-stat">
                        <span>Общий прогресс</span>
                        <strong>{summary?.overall_progress_percent ?? 0}%</strong>
                    </div>
                    <div className="mini-stat">
                        <span>Количество линий</span>
                        <strong>{tasks.length}</strong>
                    </div>
                    <div className="mini-stat">
                        <span>Ориентир по ЕГЭ</span>
                        <strong>≈ {summary?.estimated_ege_score ?? 0} баллов</strong>
                    </div>
                </div>
            </section>

            <div className="roadmap-list">
                {tasks.map((task) => {
                    const isCurrent = task.task_number === currentTaskNumber;
                    const canOpen = task.status !== 'locked';

                    return (
                        <Card
                            key={`task-${task.task_number}`}
                            className={`roadmap-card ${isCurrent ? 'is-current' : ''}`}
                            title={task.title}
                            subtitle={`Задание ${task.task_number}`}
                            action={
                                <span className={`badge badge--${getStatusClass(task.status)}`}>
                                    {getStatusLabel(task.status)}
                                </span>
                            }
                        >
                            <div className="roadmap-card__content">
                                <p>{task.description}</p>

                                <div className="roadmap-card__footer">
                                    <div className="roadmap-card__meta">
                                        {isCurrent
                                            ? 'Это текущая открытая тема.'
                                            : canOpen
                                                ? 'Можно открыть теорию и практику.'
                                                : 'Станет доступно позже.'}
                                    </div>

                                    <Button
                                        onClick={() => onOpenTask(task.task_number)}
                                        disabled={!canOpen}
                                        variant={canOpen ? 'primary' : 'secondary'}
                                    >
                                        {isCurrent ? 'Открыто сейчас' : canOpen ? 'Открыть' : 'Недоступно'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}

                {weeklyReviews.map((review) => (
                    <Card
                        key={review.id}
                        className="roadmap-card"
                        title={review.title}
                        subtitle="Контрольный узел"
                        action={<span className="badge badge--locked">Скоро</span>}
                    >
                        <div className="roadmap-card__content">
                            <p>Обязательный смешанный блок повторения уже пройденных тем.</p>

                            <div className="roadmap-card__footer">
                                <div className="roadmap-card__meta">
                                    Этот блок подключим следующим слоем логики.
                                </div>

                                <Button variant="secondary" disabled>
                                    Скоро
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}