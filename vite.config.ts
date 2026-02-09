import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Split large Three.js bundle from app code
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'framer': ['framer-motion'],
        },
      },
    },
  },
});
