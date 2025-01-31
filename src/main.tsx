import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './data-access/store/store.ts';
import { Provider } from 'react-redux';

import './i18n/i18n.ts';

import { App } from './App.tsx';

import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
