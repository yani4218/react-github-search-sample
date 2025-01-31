import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IThemeState {
    theme: string;
}

// if user don't set theme in app, use default browser theme.
const getDefulatTheme = (): string => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDarkScheme ? 'dark' : 'light';
};

const themeSlice = createSlice({
    name: 'github',
    initialState: {
        theme: localStorage.getItem('theme') || getDefulatTheme()
    } as IThemeState,
    reducers: {
        setTheme(state, action: PayloadAction<boolean>) {
            const theme = action.payload ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            state.theme = theme;
        }
    }
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
