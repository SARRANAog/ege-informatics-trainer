import type { PropsWithChildren } from 'react';
import type { TabKey } from '../../types/models';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface AppShellProps {
    activeTab: TabKey;
    onChangeTab: (tab: TabKey) => void;
    topbarTitle: string;
    topbarSubtitle: string;
    progress: number;
    currentTaskNumber: number | null;
    onContinue: () => void;
}

export function AppShell({
    activeTab,
    onChangeTab,
    topbarTitle,
    topbarSubtitle,
    progress,
    currentTaskNumber,
    onContinue,
    children,
}: PropsWithChildren<AppShellProps>) {
    return (
        <div className="app-shell">
            <Sidebar
                activeTab={activeTab}
                onChange={onChangeTab}
                progress={progress}
                currentTaskNumber={currentTaskNumber}
            />

            <div className="app-shell__main">
                <Topbar
                    title={topbarTitle}
                    subtitle={topbarSubtitle}
                    progress={progress}
                    onContinue={onContinue}
                />
                <main className="app-shell__content">{children}</main>
            </div>
        </div>
    );
}