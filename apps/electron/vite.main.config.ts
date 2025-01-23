import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['path', 'url', 'fs', 'electron'],
    },
  },
});
