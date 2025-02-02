import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    base: '/react-github-search-sample/',
    plugins: [react()],
    resolve: {
        alias: {
            '@shared/components': '/src/shared/components',
            '@shared/utils': '/src/shared/utils'
        }
    },
    build: {
        outDir: 'dist'
    }
});
