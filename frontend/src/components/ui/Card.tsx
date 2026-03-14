import type { PropsWithChildren, ReactNode } from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    className?: string;
    bodyClassName?: string;
}

export function Card({
    title,
    subtitle,
    action,
    className = '',
    bodyClassName = '',
    children,
}: PropsWithChildren<CardProps>) {
    const rootClassName = ['ui-card', className].filter(Boolean).join(' ');
    const contentClassName = ['ui-card__body', bodyClassName].filter(Boolean).join(' ');

    return (
        <section className={rootClassName}>
            {(title || subtitle || action) && (
                <header className="ui-card__header">
                    <div className="ui-card__heading">
                        {title && <h3>{title}</h3>}
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                    {action && <div className="ui-card__action">{action}</div>}
                </header>
            )}
            <div className={contentClassName}>{children}</div>
        </section>
    );
}