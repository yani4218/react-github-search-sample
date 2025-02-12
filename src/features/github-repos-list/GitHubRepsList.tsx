import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';

import { GitHubRepsItem } from './github-repos-item/GitHubRepsItem';
import { GitHubRepsItemSkeleton } from './github-repos-item/GitHubRepsItemSkeleton';
import { EmptyState } from '../../shared/components';

import { IGitHubRepo } from '../../shared/entities';

import './GitHubRepsList.scss';

export interface IGitHubRepsListProps {
    repos: IGitHubRepo[];
    hasMoreItems: boolean;
    loadNextPage: () => void;
}

export const GitHubRepsList: FC<IGitHubRepsListProps> = ({ repos, hasMoreItems, loadNextPage }) => {
    const { t } = useTranslation();
    return (
        <>
            <InfiniteScroll
                dataLength={repos.length}
                next={loadNextPage}
                hasMore={hasMoreItems}
                loader={<GitHubRepsItemSkeleton />}
                endMessage={
                    !repos.length && (
                        <EmptyState>
                            <p>{t('DataNotFound')}</p>
                        </EmptyState>
                    )
                }
            >
                {repos.map((repo) => (
                    <GitHubRepsItem repo={repo} key={repo.id} />
                ))}
            </InfiniteScroll>
        </>
    );
};
