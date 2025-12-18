import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
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
        target: 'http://localhost:4773',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
      // test: {
      //   '/api/': {
      //     target: 'https://preview.pro.ant.design',
      //     changeOrigin: true,
      //     pathRewrite: { '^': '' }
      //   }
      // },
      // pre: {
      //   '/api/': {
      //     target: 'http://localhost:3002',
      //     changeOrigin: true,
      //     pathRewrite: { '^': '' }
      //   }
      // }
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ]
})
