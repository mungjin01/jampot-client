import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/main',
    rollupOptions: {
      input: 'src/main/main.ts',
    },
  },
});
