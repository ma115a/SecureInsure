import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs'
import path from 'path'

export default defineConfig({ plugins: [tailwindcss(), sveltekit()], server: {
    https: {
        key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem'))
    },
    port: 5173,
    strictPort: true,
    proxy : {
        '/api': {
            target: 'https://localhost:8443',
            changeOrigin: true,
            secure: false //Self signed cert
        }
    }
} });
