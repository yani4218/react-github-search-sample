import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './githubSlice';
import themeReducer from './themeSlice';
import languageReducer from './languageSlice';

export const store = configureStore({
    devTools: true,
    reducer: {
        github: githubReducer,
        theme: themeReducer,
        lang: languageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
