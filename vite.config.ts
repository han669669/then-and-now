import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core - base chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
          // HeroUI components (direct imports)
          if (id.includes('node_modules/@heroui/')) {
            return 'ui';
          }
          // Framer Motion
          if (id.includes('node_modules/framer-motion/')) {
            return 'ui';
          }
          // D3 libraries
          if (id.includes('node_modules/d3-')) {
            return 'd3';
          }
          // heic2any is dynamically imported, let Vite handle it
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
