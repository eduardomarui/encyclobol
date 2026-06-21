import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` vem do ambiente: GitHub Pages usa /encyclobol/, dev e nginx usam /.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})
