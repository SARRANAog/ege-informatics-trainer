import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { api } from './lib/api';
import { MockExamPage } from './pages/MockExamPage';
import { PracticePage } from './pages/PracticePage';
import { ProfilePage } from './pages/ProfilePage';
import { ProgressPage } from './pages/ProgressPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TheoryPage } from './pages/TheoryPage';
import type {
    PracticePayload,
    ProfilePayload,
    ProgressSummary,
    RoadmapTask,
    TabKey,
    TheoryPayload,
    WeeklyReviewItem,
} from './types/models';

function App() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabKey>('roadmap');

    const [roadmapTitle, setRoadmapTitle] = useState('Дорожка подготовки');
    const [roadmapTasks, setRoadmapTasks] = useState<RoadmapTask[]>([]);
    const [weeklyReviews, setWeeklyReviews] = useState<WeeklyReviewItem[]>([]);

    const [profile, setProfile] = useState<ProfilePayload | null>(null);
    const [summary, setSummary] = useState<ProgressSummary | null>(null);

    const [selectedTaskNumber, setSelectedTaskNumber] = useState<number | null>(null);
    const [theory, setTheory] = useState<TheoryPayload | null>(null);
    const [practice, setPractice] = useState<PracticePayload | null>(null);

    const [error, setError] = useState('');

    const loadTask = useCallback(async (taskNumber: number, targetTab?: TabKey) => {
        const [theoryResp, practiceResp] = await Promise.all([
            api.getTheory(taskNumber),
            api.getPractice(taskNumber),
        ]);

        setSelectedTaskNumber(taskNumber);
        setTheory(theoryResp);
        setPractice(practiceResp);

        if (targetTab) {
            setActiveTab(targetTab);
        }
    }, []);

    const refreshProgress = useCallback(async () => {
        const progressResp = await api.getProgress();
        setSummary(progressResp);
    }, []);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                setError('');

                const [profileResp, roadmapResp, progressResp] = await Promise.all([
                    api.getProfile(),
                    api.getRoadmap(),
                    api.getProgress(),
                ]);

                setProfile(profileResp.profile);
                setRoadmapTitle(roadmapResp.title);
                setRoadmapTasks(roadmapResp.tasks);
                setWeeklyReviews(roadmapResp.weekly_reviews ?? []);
                setSummary(progressResp);

                const firstAvailableTask =
                    roadmapResp.tasks.find((node) => node.status !== 'locked')?.task_number ??
                    roadmapResp.tasks[0]?.task_number ??
                    1;

                await loadTask(firstAvailableTask);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Не удалось загрузить приложение');
            } finally {
                setLoading(false);
            }
        };

        void bootstrap();
    }, [loadTask]);

    const topbarTitle = useMemo(() => {
        const map: Record<TabKey, string> = {
            roadmap: 'Дорожка обучения',
            theory: 'Теория',
            practice: 'Практика',
            mock: 'Пробник',
            progress: 'Прогресс',
            profile: 'Профиль',
        };

        return map[activeTab];
    }, [activeTab]);

    const topbarSubtitle = useMemo(() => {
        if (activeTab === 'roadmap') {
            return 'Основной маршрут по всем линиям ЕГЭ: теория, практика и контрольные узлы.';
        }

        if (activeTab === 'theory') {
            return selectedTaskNumber
                ? `Сейчас открыт материал по заданию ${selectedTaskNumber}.`
                : 'Открой нужную линию на дорожке.';
        }

        if (activeTab === 'practice') {
            return selectedTaskNumber
                ? `Отработка упражнений по заданию ${selectedTaskNumber}.`
                : 'Открой тему и начни решать.';
        }

        if (activeTab === 'mock') {
            return 'Отдельный экзаменационный режим, который будем наращивать дальше.';
        }

        if (activeTab === 'progress') {
            return 'Краткая локальная аналитика без лишней перегрузки.';
        }

        return 'Один локальный профиль ученика на этом устройстве.';
    }, [activeTab, selectedTaskNumber]);

    const handleContinue = () => {
        if (selectedTaskNumber) {
            void loadTask(selectedTaskNumber, 'theory');
            return;
        }

        setActiveTab('roadmap');
    };

    if (loading) {
        return (
            <div className="app-loading">
                <div className="app-loading__panel">
                    <div className="app-loading__eyebrow">EGE Informatics Trainer</div>
                    <h1>Загружаем локальный профиль и структуру курса</h1>
                    <p>Сейчас подтянем дорожку, теорию и стартовую практику.</p>
                </div>
            </div>
        );
    }

    return (
        <AppShell
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            topbarTitle={topbarTitle}
            topbarSubtitle={topbarSubtitle}
            progress={summary?.overall_progress_percent ?? 0}
            currentTaskNumber={selectedTaskNumber}
            onContinue={handleContinue}
        >
            {error ? <div className="error-banner">{error}</div> : null}

            {activeTab === 'roadmap' && (
                <RoadmapPage
                    roadmapTitle={roadmapTitle}
                    tasks={roadmapTasks}
                    weeklyReviews={weeklyReviews}
                    summary={summary}
                    currentTaskNumber={selectedTaskNumber}
                    onOpenTask={(taskNumber) => void loadTask(taskNumber, 'theory')}
                />
            )}

            {activeTab === 'theory' && (
                <TheoryPage
                    theory={theory}
                    onOpenPractice={(taskNumber) => void loadTask(taskNumber, 'practice')}
                />
            )}

            {activeTab === 'practice' && (
                <PracticePage
                    practice={practice}
                    onProgressChanged={() => void refreshProgress()}
                />
            )}

            {activeTab === 'mock' && <MockExamPage />}

            {activeTab === 'progress' && <ProgressPage summary={summary} />}

            {activeTab === 'profile' && (
                <ProfilePage
                    profile={profile}
                    onCreate={async (name) => {
                        const response = await api.createProfile(name);
                        setProfile(response.profile);
                    }}
                    onUpdate={async (name) => {
                        const response = await api.updateProfile(name);
                        setProfile(response.profile);
                    }}
                />
            )}
        </AppShell>
    );
}

export default App;