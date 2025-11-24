import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1' ? '/Reve-exploration/' : '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    // Proxy désactivé car on utilise désormais Supabase directement.
    // Réactiver si un backend Express tourne en local.
    proxy: process.env.USE_LOCAL_API === '1' ? {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    } : undefined
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome80',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})
