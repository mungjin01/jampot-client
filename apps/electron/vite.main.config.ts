// vite.main.config.ts
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
  optimizeDeps: {
    include: [],
  },
  build: {
    rollupOptions: {
      external: [
        'debug',
        'ua-parser-js',
        'awaitqueue',
        'sdp-transform',
        'h264-profile-level-id',
        'npm-events-package',
        'queue-microtask',
      ],
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
});
