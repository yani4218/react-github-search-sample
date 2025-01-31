import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { GitHubRepsItem, IGitHubRepsItemProps } from './GitHubRepsItem';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key) => key),
        i18n: {
            language: 'en'
        }
    })
}));

describe('GitHubRepsItem component', () => {
    const mockProps: IGitHubRepsItemProps = {
        repo: {
            id: 21737465,
            name: 'awesome',
            full_name: 'sindresorhus/awesome',
            html_url: 'https://github.com/sindresorhus/awesome',
            stargazers_count: 10,
            updated_at: '025-01-25T10:50:39Z',
            owner: {
                login: 'sindresorhus',
                id: 170270,
                avatar_url: 'https://avatars.githubusercontent.com/u/170270?v=4',
                url: 'https://api.github.com/users/sindresorhus'
            }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('not renders optional model props', () => {
        render(<GitHubRepsItem {...mockProps} />);

        expect(screen.queryByTestId('github-repo-item-description')).toBeNull();
        expect(screen.queryByTestId('github-repo-item-language')).toBeNull();
    });

    it('renders optional model props', () => {
        const props: IGitHubRepsItemProps = {
            repo: { ...mockProps.repo, description: 'description', language: 'language' }
        };
        render(<GitHubRepsItem {...props} />);

        expect(screen.queryByTestId('github-repo-item-description')).not.toBeNull();
        expect(screen.queryByTestId('github-repo-item-language')).not.toBeNull();
    });
});
