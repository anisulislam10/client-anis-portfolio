import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['antd', '@ant-design/icons'],
  },
  server: {
    port: 5174, // your dev port
    // allow ngrok subdomains
    allowedHosts: [
      '.ngrok-free.app' // matches any ngrok URL
      // or add a specific one:
      // '01800ac339df.ngrok-free.app'
    ],
  },
})
