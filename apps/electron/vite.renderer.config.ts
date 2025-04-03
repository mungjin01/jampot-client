import { defineConfig } from 'vite';
import stdLibBrowser from 'vite-plugin-node-stdlib-browser';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';
import * as fs from 'fs';

export default defineConfig({
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    svgr(),
    stdLibBrowser(),
  ],
  resolve: {
    alias: {
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
    },
  },
  optimizeDeps: {
    include: [
      'debug',
      'ms',
      'ua-parser-js',
      'sdp-transform',
      'awaitqueue',
      'queue-microtask',
      'h264-profile-level-id',
      'bowser',
      'events',
      'util',
    ],
  },
  build: {
    rollupOptions: {
      external: ['npm-events-package'],
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
});
