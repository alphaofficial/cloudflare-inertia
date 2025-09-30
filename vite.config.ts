import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [react()],
		build: {
			emptyOutDir: false,
			sourcemap: true,
			rollupOptions: {
				input: resolve(__dirname, 'src/views/main.tsx'),
				output: {
					entryFileNames: 'app.js',
					chunkFileNames: '[name].js',
					assetFileNames: '[name].[ext]',
					dir: 'public',
				},
			},
			outDir: 'public',
		},
		mode: mode,
	};
});
