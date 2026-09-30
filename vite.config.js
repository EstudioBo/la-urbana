import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import guardarCamino from './scripts/vite-guardar-camino.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), guardarCamino()],
  server: {
    port: 5174,
    allowedHosts: ['.ngrok-free.dev'],
  },
})
