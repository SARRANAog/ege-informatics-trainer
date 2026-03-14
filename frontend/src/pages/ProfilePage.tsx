import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import type { ProfilePayload } from '../types/models';

interface ProfilePageProps {
    profile: ProfilePayload | null;
    onCreate: (name: string) => Promise<void>;
    onUpdate: (name: string) => Promise<void>;
}

export function ProfilePage({ profile, onCreate, onUpdate }: ProfilePageProps) {
    const [name, setName] = useState(profile?.name ?? '');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setName(profile?.name ?? '');
    }, [profile?.name]);

    const handleSave = async () => {
        if (!name.trim()) return;

        setSaving(true);
        try {
            if (profile) {
                await onUpdate(name.trim());
            } else {
                await onCreate(name.trim());
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page-stack">
            <section className="page-hero">
                <div className="page-hero__badge">Профиль</div>
                <div className="page-hero__title-row">
                    <div>
                        <h1>Локальный профиль ученика</h1>
                        <p>
                            Здесь всё хранится на этом устройстве. Один профиль, одно приложение, одно автосохранение без регистрации и онлайна.
                        </p>
                    </div>
                </div>
            </section>

            <div className="profile-layout">
                <Card title="Основные данные" subtitle="Имя можно поменять в любой момент">
                    <div className="form-stack">
                        <label className="field">
                            <span>Имя ученика</span>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Например, Максим"
                            />
                        </label>

                        <Button onClick={handleSave} disabled={!name.trim() || saving}>
                            {saving ? 'Сохраняем...' : profile ? 'Обновить имя' : 'Создать профиль'}
                        </Button>
                    </div>
                </Card>

                <Card title="Текущий профиль">
                    <div className="meta-grid">
                        <div className="meta-item">
                            <span>Имя</span>
                            <strong>{profile?.name ?? 'ещё не задано'}</strong>
                        </div>
                        <div className="meta-item">
                            <span>Режим</span>
                            <strong>Офлайн</strong>
                        </div>
                        <div className="meta-item">
                            <span>Профилей</span>
                            <strong>1</strong>
                        </div>
                        <div className="meta-item">
                            <span>Сохранение</span>
                            <strong>Автоматическое</strong>
                        </div>
                    </div>
                </Card>

                <Card title="Локальные данные">
                    <ul className="info-list">
                        <li>Прогресс сохраняется локально на этом устройстве.</li>
                        <li>Теория, практика и статистика работают без интернета.</li>
                        <li>Регистрация и аккаунт не нужны.</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}