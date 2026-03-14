import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md';
    className?: string;
}

export function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: PropsWithChildren<ButtonProps>) {
    const composedClassName = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={composedClassName} {...props}>
            {children}
        </button>
    );
}