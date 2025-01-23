import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.base.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      outDir: 'dist/preload',
      lib: {
        entry: './src/main/preload.ts',
        formats: ['cjs'],
      },
      rollupOptions: {
        external: ['electron', 'fs', 'path'],
      },
    },
  })
);
