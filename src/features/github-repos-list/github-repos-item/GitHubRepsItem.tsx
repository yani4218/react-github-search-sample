import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StarIcon } from '../../../shared/components';

import { dateFormatted } from '../../../shared/utils';

import { IGitHubRepo } from '../../../entities';

import './GitHubRepsItem.scss';

export interface IGitHubRepsItemProps {
    repo: IGitHubRepo;
}

export const GitHubRepsItem = ({ repo }: IGitHubRepsItemProps) => {
    const { t, i18n } = useTranslation();

    const updatedAt = useMemo(() => {
        return dateFormatted(repo.updated_at);
    }, [repo.updated_at, i18n.language]);

    return (
        <>
            <div className="github-repo-item">
                <div className="github-repo-item__header">
                    <img
                        className="avatar"
                        data-testid="github-repo-item-avatar-url"
                        src={repo.owner.avatar_url}
                    />
                    <div>
                        <a
                            target="_blank"
                            data-testid="github-repo-item-full-name"
                            href={repo.html_url}
                        >
                            {repo.full_name}
                        </a>
                    </div>
                </div>

                <div className="github-repo-item__body">
                    {repo.description && (
                        <div
                            className="body__description"
                            data-testid="github-repo-item-description"
                        >
                            {repo.description}
                        </div>
                    )}
                </div>

                <div className="github-repo-item__footer">
                    {repo.language && (
                        <div data-testid="github-repo-item-language"> {repo.language} </div>
                    )}
                    {repo.language && <span className="divider">·</span>}
                    <div className="stars">
                        <StarIcon />
                        <span data-testid="github-repo-item-stargazers-count">
                            {repo.stargazers_count}
                        </span>
                    </div>
                    <span className="divider">·</span>
                    <div data-testid="github-repo-item-stargazers-count">
                        {t('UpdateOn', { date: updatedAt })}
                    </div>
                </div>
            </div>
        </>
    );
};
