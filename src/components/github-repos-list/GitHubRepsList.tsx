import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';

import { GitHubRepsItem } from './github-repos-item/GitHubRepsItem';
import { GitHubRepsItemSkeleton } from './github-repos-item/GitHubRepsItemSkeleton';
import { EmptyState } from '../../shared/components';

import { IGitHubRepo } from '../../entities';

import './GitHubRepsList.scss';

export interface IGitHubRepsListProps {
    repos: IGitHubRepo[];
    hasMoreItems: boolean;
    loadNextPage: () => void;
}

export function GitHubRepsList({ repos, hasMoreItems, loadNextPage }: IGitHubRepsListProps) {
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
}
