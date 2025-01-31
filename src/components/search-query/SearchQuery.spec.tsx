import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { SearchQuery, ISearchQueryProps } from './SearchQuery';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key) => key)
    })
}));

describe('SearchQuery component', () => {
    const mockProps: ISearchQueryProps = {
        query: 'react',
        onQueryChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with initial query value', () => {
        render(<SearchQuery {...mockProps} />);

        const inputElement: HTMLInputElement = screen.getByTestId('search-query-input');

        expect(inputElement.value).toBe('react');
    });

    it('updates query input value on typing', () => {
        render(<SearchQuery {...mockProps} />);

        const inputElement: HTMLInputElement = screen.getByTestId('search-query-input');

        fireEvent.change(inputElement, { target: { value: 'new-query' } });

        expect(inputElement.value).toBe('new-query');
    });

    it('calls onQueryChange after delay when input changes', async () => {
        render(<SearchQuery {...mockProps} />);

        const inputElement: HTMLInputElement = screen.getByTestId('search-query-input');

        fireEvent.change(inputElement, { target: { value: 'new-query' } });

        await waitFor(() => expect(mockProps.onQueryChange).toHaveBeenCalledWith('new-query'), {
            timeout: 600
        });
    });

    it('does not call onQueryChange if input value is the same', async () => {
        render(<SearchQuery {...mockProps} />);

        const inputElement: HTMLInputElement = screen.getByTestId('search-query-input');

        fireEvent.change(inputElement, { target: { value: 'react' } });

        await waitFor(() => expect(mockProps.onQueryChange).not.toHaveBeenCalled());
    });

    it('trims input value and updates correctly', async () => {
        render(<SearchQuery {...mockProps} />);

        const inputElement: HTMLInputElement = screen.getByTestId('search-query-input');

        fireEvent.change(inputElement, { target: { value: '   new-query   ' } });

        await waitFor(() => expect(mockProps.onQueryChange).toHaveBeenCalledWith('new-query'), {
            timeout: 600
        });
    });
});
