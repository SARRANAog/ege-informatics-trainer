import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { ProgressSummary } from '../types/models';

interface ProgressPageProps {
    summary: ProgressSummary | null;
}

export function ProgressPage({ summary }: ProgressPageProps) {
    if (!summary) {
        return (
            <div className="empty-state">
                <div className="empty-state__title">Прогресс загружается</div>
                <p>Сейчас подтянем локальные данные по прохождению и оценке текущего уровня.</p>
            </div>
        );
    }

    const solvedExercises = summary.tasks.reduce(
        (acc, task) => acc + (task.solved_exercises ?? 0),
        0
    );

    return (
        <div className="page-stack">
            <section className="page-hero">
                <div className="page-hero__badge">Прогресс</div>
                <div className="page-hero__title-row">
                    <div>
                        <h1>Текущий срез подготовки</h1>
                        <p>
                            Здесь собрана простая аналитика без перегруза: сколько уже закрыто и к какому уровню по ЕГЭ это примерно ведёт.
                        </p>
                    </div>
                </div>
            </section>

            <div className="stats-row">
                <Card className="metric-card" title="Общий прогресс">
                    <div className="metric-card__value">{summary.overall_progress_percent}%</div>
                    <ProgressBar value={summary.overall_progress_percent} />
                    <div className="metric-card__hint">По всей дорожке курса</div>
                </Card>

                <Card className="metric-card" title="Решено упражнений">
                    <div className="metric-card__value">{solvedExercises}</div>
                    <div className="metric-card__hint">Суммарно по доступным линиям</div>
                </Card>

                <Card className="metric-card" title="Ориентир по ЕГЭ">
                    <div className="metric-card__value">≈ {summary.estimated_ege_score}</div>
                    <div className="metric-card__hint">Это предварительная оценка</div>
                </Card>

                <Card className="metric-card" title="Линий в статистике">
                    <div className="metric-card__value">{summary.tasks.length}</div>
                    <div className="metric-card__hint">По сохранённым данным</div>
                </Card>
            </div>

            <Card title="По заданиям">
                <div className="stats-row stats-row--two">
                    {summary.tasks.map((task) => (
                        <div key={task.task_number} className="meta-item">
                            <span>Задание {task.task_number}</span>
                            <strong>{task.mastery_percent}%</strong>
                            <div className="metric-card__hint">
                                Решено: {task.solved_exercises}, ошибок в последней попытке: {task.last_error_count}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}