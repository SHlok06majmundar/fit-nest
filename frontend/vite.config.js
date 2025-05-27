import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '16.176.121.1',
    port: 3000
  },
  build: {
    sourcemap: false, // ✅ disables problematic source maps
  }
})
