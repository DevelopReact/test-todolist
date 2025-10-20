import { defineConfig } from 'vite';
//plugin
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }]
    },
    base: '/test-todolist/'
});
