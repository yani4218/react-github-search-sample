import { FC } from 'react';

import './ToggleSwitch.scss';

interface IToggleSwitchProps {
    checked: boolean;
    onChange: (isDarkTheme: boolean) => void;
}

/**
 * @description Компонент для отображения switch slider
 * @param checked - состояние выбрано или нет для switch slider
 * @param onChange - обработчик нового состояния выбора для switch slider
 */
export const ToggleSwitch: FC<IToggleSwitchProps> = ({ checked, onChange }) => {
    return (
        <>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    data-testid="toggle-switch-checkbox"
                />
                <span className="slider round"></span>
            </label>
        </>
    );
};
