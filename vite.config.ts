import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          ui: ['@heroui/react', 'framer-motion'],
          d3: ['d3-selection', 'd3-zoom'],
          // HEIF converter will be loaded dynamically, so it won't be in main bundle
        },
      },
    },
    // Increase chunk size warning limit since we're using code splitting
    chunkSizeWarningLimit: 1000,
  },
})
