import Skeleton from 'react-loading-skeleton';

import './GitHubRepsItem.scss';
import { memo } from 'react';

export const GitHubRepsItemSkeleton = memo(() => {
    return (
        <>
            <div className="github-repo-item">
                <div className="github-repo-item__header">
                    <div className="avatar">
                        <Skeleton style={{ display: 'flex' }} circle width={24} height={24} />
                    </div>

                    <Skeleton width={240} />
                </div>

                <div className="github-repo-item__body">
                    <Skeleton count={2} />
                </div>
            </div>
        </>
    );
});
