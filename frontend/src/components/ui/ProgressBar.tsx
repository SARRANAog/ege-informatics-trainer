interface ProgressBarProps {
    value: number;
    compact?: boolean;
}

export function ProgressBar({ value, compact = false }: ProgressBarProps) {
    const normalizedValue = Math.max(0, Math.min(100, value));

    return (
        <div className={`progress-bar ${compact ? 'progress-bar--compact' : ''}`}>
            <div className="progress-bar__fill" style={{ width: `${normalizedValue}%` }} />
        </div>
    );
}