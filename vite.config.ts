import { defineConfig } from 'vite'

import Components from 'unplugin-vue-components/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'
import { BASE_URL } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), Components(), vue()],
  server: {
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
