import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'
import type{PluginOption} from 'vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: ['@element-plus/nuxt'],
  elementPlus:{

  },
  css: ['~/assets/css/main.css'],
  vite: {   
    plugins: [      
      tailwindcss() as PluginOption
    ] ,
  },
  devtools: { enabled: true }
})
