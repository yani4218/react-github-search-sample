import React from 'react';
import { render, screen } from '@testing-library/react';

import { EmptyState } from './EmptyState';

describe('EmptyState component', () => {
    it('render content projection', () => {
        render(
            <EmptyState>
                <div data-testid="empty-state-content"></div>
            </EmptyState>
        );

        const emptyStateContent = screen.queryByTestId('empty-state-content');
        expect(emptyStateContent).not.toBeNull();
    });
});
