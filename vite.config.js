import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { copyFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/Meteo-Project/',
  plugins: [
    react(),
    {
      name: 'copy-404',
      apply: 'build', // выполняется только при сборке
      closeBundle() {
        const indexPath = resolve(__dirname, 'dist/index.html')
        const errorPath = resolve(__dirname, 'dist/404.html')
        copyFileSync(indexPath, errorPath)
      }
    }
  ]
})