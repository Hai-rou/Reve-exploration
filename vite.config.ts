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
