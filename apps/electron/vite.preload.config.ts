import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
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
      external: ['npm-events-package'],
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
});
