import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Title } from './Title';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn(() => 'mock app title')
    })
}));

describe('Title component', () => {
    it('render title', () => {
        render(<Title />);

        const titleElement: HTMLElement = screen.getByTestId('title');

        expect(titleElement.textContent).toBe('mock app title');
    });
});
