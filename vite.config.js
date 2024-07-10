import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [svgr()],
})
