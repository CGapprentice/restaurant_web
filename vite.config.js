import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    strictPort: true,
    port: 5173,
    allowedHosts: [
      'restaurant-frontend-7jm9.onrender.com',
      '.onrender.com' // To allow all Render subdomains
    ]
  }
})