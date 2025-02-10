import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { GitHubRepsList } from './features/github-repos-list/GitHubRepsList';
import { Header } from './features/header/Header';
import { SearchQuery } from './features/search-query/SearchQuery';

import { AppDispatch, RootState } from './data-access/store/store';
import { fetchRepos, loadNextPage, setSearchQuery } from './data-access/store/githubSlice';

import './App.scss';

export const App = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { repos, query, totalCount, hasMoreItems, pagination } = useSelector(
        (state: RootState) => state.github
    );

    useEffect(() => {
        dispatch(fetchRepos({ query, pagination }));
    }, [dispatch, query, pagination]);

    const onLoadNextPage = useCallback(() => {
        dispatch(loadNextPage());
    }, [dispatch]);

    const onSearch = useCallback(
        (q: string) => {
            dispatch(setSearchQuery(q));
        },
        [dispatch]
    );

    return (
        <>
            <Header />
            <div className="filter-panel">
                <SearchQuery query={query} onQueryChange={onSearch} />

                <div>
                    {repos.length > 0 && (
                        <span>
                            {t('ReposCount', { count: repos.length, totalCount: totalCount })}
                        </span>
                    )}
                </div>
            </div>

            <GitHubRepsList
                repos={repos}
                hasMoreItems={hasMoreItems}
                loadNextPage={onLoadNextPage}
            />
        </>
    );
};
