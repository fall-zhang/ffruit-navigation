import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { resolve as pathResolve } from 'path'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  // host:true, // 表示可以通过 ip 进行访问
  resolve: {
    alias: {
      '@': pathResolve(__dirname, 'src'),
      '@@': pathResolve(__dirname, 'src/.umi'),
      '@C': pathResolve(__dirname, 'src/components'),
      '@A': pathResolve(__dirname, 'src/assets'),
      '@P': pathResolve(__dirname, 'src/pages')
    }
  },
  build: {
    // manifest
    manifest: true
  },
  server: {
    port: 7788,
    proxy: {
      '^/api/.*': {
        target: 'https://yourserver.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    react(),
   
  ]
})
