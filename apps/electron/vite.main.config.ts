import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        'scheduler',
        'react-is',
        '@emotion/sheet',
        '@emotion/hash',
        'stylis',
        '@emotion/memoize',
        '@emotion/unitless',
        'react-router-dom',
        '@tanstack/query-core',
        '@tanstack/query-devtools',
      ],
    },
  },
});
