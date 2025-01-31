import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from 'luxon';

interface ILangState {
    lang: string;
    langs: string[];
}

const setInitialLang = (): string => {
    const lang = localStorage.getItem('lang') || 'ru';
    Settings.defaultLocale = lang;
    return lang;
};

const languageSlice = createSlice({
    name: 'lang',
    initialState: {
        lang: setInitialLang(),
        langs: ['en', 'ru']
    } as ILangState,
    reducers: {
        setLang(state, action: PayloadAction<string>) {
            localStorage.setItem('lang', action.payload);
            Settings.defaultLocale = action.payload;
            state.lang = action.payload;
        }
    }
});

export const { setLang } = languageSlice.actions;

export default languageSlice.reducer;
