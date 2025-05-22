import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: "https://www.fit-nest.in/",
        changeOrigin: true, // recommended
        secure: false       // optional, only if HTTPS issues
      }
    }
  },
  build: {
    sourcemap: false, // ✅ disables problematic source maps
  }
})
