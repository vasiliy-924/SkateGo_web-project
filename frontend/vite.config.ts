import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@features': '/src/features',
      '@shared': '/src/shared',
      '@api': '/src/api'
    }
  }
});


