import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // ✅ enables HTTPS
  ],
  server: {
    port: 5173,
    strictPort: true,
    https: {}, // ✅ IMPORTANT
    proxy: {
      '/api': {
        target: 'http://192.168.29.8:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
