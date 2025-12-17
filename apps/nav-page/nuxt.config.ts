import tailwindcss from '@tailwindcss/vite'
import type { PluginOption } from 'vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {

  },
  routeRules: {
    '/': { cache: { maxAge: 60 } } // 缓存首页 60 秒
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss() as PluginOption
    ]
  },
  build: {
    transpile: ['form-data']
  },
  app: {
    head: {
      title: '鲜果导航 - 有趣，新鲜的导航',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  devtools: { enabled: true }
})
