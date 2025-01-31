import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRepos } from '../api';
import { IGitHubRepo, IList, IPagination } from '../../entities';

interface IGitHubState {
    repos: IGitHubRepo[];
    query: string;
    totalCount: number;
    pagination: IPagination;
    hasMoreItems: boolean;
    loading: boolean;
}

const DEFAULT_PAGINATION: IPagination = { page: 1, perPage: 10 };

// Асинхронный экшен для загрузки репозиториев
export const fetchRepos = createAsyncThunk(
    'github/fetchRepos',
    async ({ query, pagination }: { query: string; pagination: IPagination }, { getState }) => {
        const response = await getRepos(query, pagination);
        const state = getState() as { github: IGitHubState };

        return {
            ...response,
            items:
                pagination.page === 1 ? response.items : [...state.github.repos, ...response.items]
        };
    }
);

const githubSlice = createSlice({
    name: 'github',
    initialState: {
        repos: [],
        query: '',
        totalCount: 0,
        pagination: DEFAULT_PAGINATION,
        hasMoreItems: true,
        loading: false
    } as IGitHubState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
            state.pagination = DEFAULT_PAGINATION;
        },
        loadNextPage(state) {
            state.pagination.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<IList<IGitHubRepo>>) => {
                state.repos = action.payload.items;
                state.totalCount = action.payload.total_count;
                state.hasMoreItems = state.repos.length < action.payload.total_count;
                state.loading = false;
            })
            .addCase(fetchRepos.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { setSearchQuery, loadNextPage } = githubSlice.actions;

export default githubSlice.reducer;
