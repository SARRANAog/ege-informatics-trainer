import React from 'react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface TopbarProps {
    title: string;
    subtitle: string;
    progress: number;
    onContinue: () => void;
}

export function Topbar({ title, subtitle, progress, onContinue }: TopbarProps) {
    return (
        <header className="topbar">
            <div className="topbar__heading">
                <div className="topbar__eyebrow">Текущий раздел</div>
                <h2>{title}</h2>
                <p className="topbar__subtitle">{subtitle}</p>
            </div>

            <div className="topbar__right">
                <div className="topbar__progress-card">
                    <div className="topbar__progress-copy">
                        <span>Прогресс курса</span>
                        <strong>{progress}%</strong>
                    </div>

                    <ProgressBar value={progress} />
                </div>

                <Button variant="secondary" onClick={onContinue}>
                    К текущему блоку
                </Button>
            </div>
        </header>
    );
}