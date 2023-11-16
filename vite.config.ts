import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   sourcemap: true
  // },
  base: '/bim_CAD/',
  // base: '/',
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    host: true,
    port: 5174,
},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
