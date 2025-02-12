import { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './SearchQuery.scss';

export interface ISearchQueryProps {
    query: string;
    onQueryChange: (q: string) => void;
}

export const SearchQuery: FC<ISearchQueryProps> = memo(({ query, onQueryChange }) => {
    const { t } = useTranslation();
    const [queryInputValue, setInputValue] = useState(query);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            onQueryChange(queryInputValue);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [queryInputValue]);

    const onQeuryValueChange = (value: string) => {
        if (query !== value) {
            setInputValue(value.trim());
        }
    };

    return (
        <>
            <div className="search-query__container">
                <input
                    data-testid="search-query-input"
                    className="search-query__input"
                    name="searchQueryInput"
                    type="text"
                    value={queryInputValue}
                    onChange={(e) => onQeuryValueChange(e.target.value)}
                    autoComplete="off"
                    placeholder={t('SearchReposPlaceholder')}
                />
            </div>
        </>
    );
});
