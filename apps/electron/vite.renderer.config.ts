import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';
import * as fs from 'fs';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgr(),
  ],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },

  resolve: {
    alias: {
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
