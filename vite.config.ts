import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/client/app.tsx'),
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        dir: 'public',
      },
    },
    outDir: 'public',
  },
});