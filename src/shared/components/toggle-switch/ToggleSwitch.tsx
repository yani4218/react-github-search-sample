import './ToggleSwitch.scss';

interface IToggleSwitchProps {
    checked: boolean;
    onChange: (isDarkTheme: boolean) => void;
}

export function ToggleSwitch({ checked, onChange }: IToggleSwitchProps) {
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
}
