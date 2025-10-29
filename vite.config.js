import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    https: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'tensorflow': ['@tensorflow/tfjs'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['@mediapipe/tasks-vision']
  }
});
