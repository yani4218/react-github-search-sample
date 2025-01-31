import axios from 'axios';

import { IGitHubRepo, IList, IPagination } from '../../entities';

export const getRepos = async (
    query: string,
    pagination: IPagination
): Promise<IList<IGitHubRepo>> => {
    const response = await axios.get<IList<IGitHubRepo>>(
        'https://api.github.com/search/repositories',
        {
            params: {
                q: query ? `${query}+in` : 'all',
                page: pagination.page,
                per_page: pagination.perPage,
                sort: 'stars',
                order: 'desc'
            }
        }
    );

    return response.data;
};
