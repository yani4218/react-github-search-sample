import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILangState {
    lang: string;
    langs: string[];
}

const languageSlice = createSlice({
    name: 'lang',
    initialState: {
        lang: localStorage.getItem('lang') || 'ru',
        langs: ['en', 'ru']
    } as ILangState,
    reducers: {
        setLang(state, action: PayloadAction<string>) {
            localStorage.setItem('lang', action.payload);
            state.lang = action.payload;
        }
    }
});

export const { setLang } = languageSlice.actions;

export default languageSlice.reducer;
