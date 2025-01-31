import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IThemeState {
    theme: string;
}

const themeSlice = createSlice({
    name: 'github',
    initialState: {
        theme: localStorage.getItem('theme') || 'dark'
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
