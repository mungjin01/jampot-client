import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'node14',
    rollupOptions: {
      external: ['path', 'url', 'fs', 'electron'],
    },
  },
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
});
