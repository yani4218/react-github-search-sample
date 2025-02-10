import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import './Title.scss';

export const Title = memo(() => {
    const { t } = useTranslation();

    return (
        <>
            <div className="title" data-testid="title">
                {t('AppTitle')}
            </div>
        </>
    );
});
