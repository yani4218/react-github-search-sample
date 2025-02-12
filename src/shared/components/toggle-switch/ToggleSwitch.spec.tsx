import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { ToggleSwitch } from './ToggleSwitch';

describe('ToggleSwitch component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with checked=true', () => {
        render(<ToggleSwitch checked={true} onChange={mockOnChange} />);

        const checkboxElement: HTMLInputElement = screen.getByTestId('toggle-switch-checkbox');
        expect(checkboxElement.checked).toBeTruthy();
    });

    it('renders correctly with checked=false', () => {
        render(<ToggleSwitch checked={false} onChange={mockOnChange} />);

        const checkboxElement: HTMLInputElement = screen.getByTestId('toggle-switch-checkbox');

        expect(checkboxElement.checked).toBeFalsy();
    });

    it('calls onChange with true when the checkbox is toggled on', () => {
        render(<ToggleSwitch checked={false} onChange={mockOnChange} />);

        const checkboxElement: HTMLInputElement = screen.getByTestId('toggle-switch-checkbox');
        fireEvent.click(checkboxElement);

        expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when the checkbox is toggled off', () => {
        render(<ToggleSwitch checked={true} onChange={mockOnChange} />);

        const checkboxElement: HTMLInputElement = screen.getByTestId('toggle-switch-checkbox');
        fireEvent.click(checkboxElement);

        expect(mockOnChange).toHaveBeenCalledWith(false);
    });
});
