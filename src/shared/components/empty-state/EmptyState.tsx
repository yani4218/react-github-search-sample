import { ReactNode } from 'react';

import './EptyState.scss';

interface IEmptyStateProps {
    children: ReactNode;
}

export function EmptyState({ children }: IEmptyStateProps) {
    return (
        <>
            <div className="empty-state__container">{children}</div>
        </>
    );
}
