// vite.main.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgr(),
  ],
  optimizeDeps: {
    include: [],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
