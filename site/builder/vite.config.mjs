import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

/*
 * The landing page's house builder, as one self-contained script and stylesheet:
 *   npx vite build --config website/builder/vite.config.mjs
 * Output goes to website/assets/builder/, which the site copies like its screenshots.
 */
const here = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: fileURLToPath(new URL('../assets/builder', import.meta.url)),
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: here + 'main.tsx', formats: ['iife'], name: 'RavoHouseBuilder', fileName: () => 'house-builder.js', cssFileName: 'house-builder' },
  },
})
