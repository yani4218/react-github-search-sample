import { FC, ReactNode } from 'react';

import './EptyState.scss';

interface IEmptyStateProps {
    children: ReactNode;
}

/**
 * @description Компонент для отображения состояния, когда нет данных
 * @param children - Props принимает контент, который отображается когда нет данных
 */
export const EmptyState: FC<IEmptyStateProps> = ({ children }) => {
    return (
        <>
            <div className="empty-state__container">{children}</div>
        </>
    );
};
