import { Card } from '../components/ui/Card';

export function MockExamPage() {
    return (
        <div className="page-stack">
            <section className="page-hero">
                <div className="page-hero__badge">Пробник</div>
                <div className="page-hero__title-row">
                    <div>
                        <h1>Экзаменационный режим</h1>
                        <p>
                            Здесь будет отдельный сценарий прохождения, максимально похожий на реальный ЕГЭ:
                            порядок заданий, таймер и итоговый разбор по линиям.
                        </p>
                    </div>
                </div>
            </section>

            <div className="stats-row stats-row--three">
                <Card title="Полный пробник">
                    <p>Все задания подряд, общий результат и разбор после завершения.</p>
                </Card>

                <Card title="Сокращённый режим">
                    <p>Быстрый прогон по ключевым линиям, когда нужно проверить текущую форму.</p>
                </Card>

                <Card title="Разбор ошибок">
                    <p>После пробника здесь появятся темы, которые сильнее всего тянут результат вниз.</p>
                </Card>
            </div>
        </div>
    );
}