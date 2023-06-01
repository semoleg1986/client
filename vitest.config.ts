/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      enabled: true,
      provider: 'c8',
      reporter: ['text'],
      all: true,
      include: ['src//', 'src/**/Htag.props.tsx'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.ts',
        'src/main.tsx',
        'src/components/Card/Card.props.tsx',
      ],
    },
  },
});
