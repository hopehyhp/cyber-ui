import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync, mkdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))

function copyThemeStyles() {
  return {
    name: 'copy-theme-styles',
    closeBundle() {
      const out = resolve(root, 'dist/lib/styles')
      mkdirSync(out, { recursive: true })
      cpSync(resolve(root, 'src/styles'), out, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [vue(), copyThemeStyles()],
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    lib: {
      entry: resolve(root, 'src/lib/index.js'),
      name: 'CyberUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src/lib',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    cssCodeSplit: true,
  },
})
