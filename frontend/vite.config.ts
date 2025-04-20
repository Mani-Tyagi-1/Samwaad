import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to your backend server
      "/api": {
        target: "http://localhost:5000", // <-- YOUR BACKEND SERVER ADDRESS AND PORT
        changeOrigin: true, // Recommended
        // secure: false, // Optional: If backend uses https with self-signed cert
        // rewrite: (path) => path.replace(/^\/api/, '') // Optional: Only if backend routes DON'T include /api
      },
    },
  },
});
