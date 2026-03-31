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
        target: 'https://localhost:7146',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
