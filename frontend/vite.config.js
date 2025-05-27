import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows external access
    port: 3000
  },
  build: {
    sourcemap: false, // ✅ disables problematic source maps
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'chart-vendor': ['chart.js', 'react-chartjs-2', '@coreui/react-chartjs'],
          'ui-vendor': ['framer-motion', 'react-hot-toast', 'react-toastify', 'react-slick', 'slick-carousel'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      'chart.js',
      'react-chartjs-2',
    ],
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
