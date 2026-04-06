import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.VITE_BASE_PATH || './'

export default defineConfig({
  base,
  plugins: [vue(), VueDevTools(), tailwindcss()],
})
