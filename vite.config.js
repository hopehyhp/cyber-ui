import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Add Vue plugin so Vite can parse .vue files
export default defineConfig({
  plugins: [vue()],
})
