import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import guardarCamino from './scripts/vite-guardar-camino.js'

// `foto.webp?adaptable`: el build genera la foto a 400, 800, 1200, 1600 y 1920 px de ancho (sin agrandarla nunca)
// y devuelve { src, srcset, w, h } para el componente Imagen
const ADAPTABLE = new URLSearchParams({ w: '400;800;1200;1600;1920', format: 'webp', as: 'img' })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({ defaultDirectives: (url) => (url.searchParams.has('adaptable') ? ADAPTABLE : new URLSearchParams()) }),
    guardarCamino(),
  ],
  server: {
    port: 5174,
    allowedHosts: ['.ngrok-free.dev'],
  },
})
