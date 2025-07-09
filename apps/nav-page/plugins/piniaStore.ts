import { LRUCache } from 'lru-cache'
// import { defineNuxtConfig } from 'nuxt/config'
import { defineNuxtPlugin } from 'nuxt/app'
import { createPinia } from 'pinia'
export const cachePage = new LRUCache({
  max: 100 // 缓存队列长度 最大缓存数量
  // maxAge: 1000 * 10, // 缓存时间 单位：毫秒
})
export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
