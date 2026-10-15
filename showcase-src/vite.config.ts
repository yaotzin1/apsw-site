import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://apsw.pl/showcase/ ; the build lands in ../showcase (committed).
export default defineConfig({
    base: '/showcase/',
    plugins: [react()],
    build: {
        outDir: '../showcase',
        emptyOutDir: true,
    },
    server: {
        // Local dev: the PHP dev server (php -S 127.0.0.1:8088) answers /api/people.php.
        proxy: {
            '/api': 'http://127.0.0.1:8088',
            '/assets': 'http://127.0.0.1:8088',
        },
    },
});
