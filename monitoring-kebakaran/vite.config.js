import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    'process.env': {
      VITE_API_URL: 'https://backend-ghozali-production.up.railway.app/api'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
