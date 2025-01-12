import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-ghozali-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
