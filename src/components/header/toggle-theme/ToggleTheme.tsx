import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToggleSwitch, DarkColorThemeIcon, LightColorThemeIcon } from '../../../shared/components';

import { AppDispatch, RootState } from '../../../data-access/store/store';
import { setTheme } from '../../../data-access/store/themeSlice';

import './ToggleTheme.scss';

export const ToggleTheme = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useSelector((state: RootState) => state.theme);

    useEffect(() => {
        setDocumentTheme();
    }, [theme]);

    const setDocumentTheme = (): void => {
        document.body.dataset.theme = theme;
    };

    const onChangeTheme = (isDarkTheme: boolean) => {
        dispatch(setTheme(isDarkTheme));
    };

    return (
        <>
            <div className="toggle-theme__container">
                <div className="toggle-theme__light-icon">
                    <LightColorThemeIcon />
                </div>

                <div className="toggle-theme__switch">
                    <ToggleSwitch checked={theme === 'dark'} onChange={onChangeTheme} />
                </div>

                <div className="toggle-theme__dark-icon">
                    <DarkColorThemeIcon />
                </div>
            </div>
        </>
    );
};
