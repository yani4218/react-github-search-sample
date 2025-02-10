import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { App } from './App';
import { IGitHubRepsListProps } from './features/github-repos-list/GitHubRepsList';
import { ISearchQueryProps } from './features/search-query/SearchQuery';

import { fetchRepos, loadNextPage, setSearchQuery } from './data-access/store/githubSlice';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key, { count, totalCount }) => `${count} of ${totalCount}`)
    })
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

jest.mock('./data-access/store/githubSlice', () => ({
    fetchRepos: jest.fn(),
    loadNextPage: jest.fn(),
    setSearchQuery: jest.fn()
}));

jest.mock('./features/github-repos-list/GitHubRepsList', () => ({
    GitHubRepsList: ({ repos, loadNextPage }: IGitHubRepsListProps) => (
        <div data-testid="github-repos-list">
            <div>Repos: {repos.length}</div>
            <button onClick={loadNextPage}>Load More</button>
        </div>
    )
}));

jest.mock('./features/header/Header', () => ({
    Header: () => <div data-testid="header">Header</div>
}));

jest.mock('./features/search-query/SearchQuery', () => ({
    SearchQuery: ({ query, onQueryChange }: ISearchQueryProps) => {
        return (
            <input
                data-testid="search-query-input"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
            />
        );
    }
}));

describe('App component', () => {
    const mockDispatch = jest.fn();
    const mockState = {
        github: {
            repos: [],
            query: '',
            totalCount: 0,
            hasMoreItems: false,
            pagination: { page: 1, perPage: 5 }
        }
    };

    beforeEach(() => {
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as unknown as jest.Mock).mockImplementation((callback) => callback(mockState));
        jest.clearAllMocks();
    });

    it('should render Header, SearchQuery, and GitHubRepsList components', () => {
        render(<App />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('search-query-input')).toBeInTheDocument();
        expect(screen.getByTestId('github-repos-list')).toBeInTheDocument();
    });

    it('should dispatch fetchRepos on mount', () => {
        render(<App />);

        expect(mockDispatch).toHaveBeenCalledWith(
            fetchRepos({ query: '', pagination: { page: 1, perPage: 5 } })
        );
    });

    it('should update search query and dispatch setSearchQuery when typing', () => {
        render(<App />);

        const searchInput = screen.getByTestId('search-query-input');
        fireEvent.change(searchInput, { target: { value: 'react' } });

        expect(mockDispatch).toHaveBeenCalledWith(setSearchQuery('react'));
    });

    it('should display the number of repos and totalCount when repos are available', () => {
        const stateWithRepos = {
            ...mockState,
            github: {
                ...mockState.github,
                repos: [
                    { id: 1, name: 'Repo1' },
                    { id: 2, name: 'Repo2' }
                ],
                totalCount: 50
            }
        };

        (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
            callback(stateWithRepos)
        );

        render(<App />);

        expect(screen.getByText('2 of 50')).toBeInTheDocument();
    });

    it('should dispatch loadNextPage when "Load More" is clicked', () => {
        const stateWithMoreRepos = {
            ...mockState,
            github: {
                ...mockState.github,
                repos: [{ id: 1, name: 'Repo1' }],
                hasMoreItems: true
            }
        };

        (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
            callback(stateWithMoreRepos)
        );

        render(<App />);

        const loadMoreButton = screen.getByText('Load More');
        fireEvent.click(loadMoreButton);

        expect(mockDispatch).toHaveBeenCalledWith(loadNextPage());
    });
});
