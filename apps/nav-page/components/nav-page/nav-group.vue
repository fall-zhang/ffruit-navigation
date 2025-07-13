<template>
  <div class="flex flex-col">
    <div class="website-item hover:shadow-sm cursor-pointer w-100 " v-for="navData in linkList" :key="navData.id" >
      <div class="link" target="_blank" @click="handleNavClick(navData)">
        <el-tooltip content="链接直达" property="top">
          <LinkIcon />
        </el-tooltip>
      </div>
      <nuxt-link :to="`/nav/${navData.id}`" class="info" >
        <div class="info-header">
          <el-image class="web-logo" :src="navData.logo" fit="cover" lazy />
          <div class="info-header-right">
            <strong class="title">{{ navData.name }}</strong>
            <div class="mt-1">
              {{ navData.desc || "这个网站什么描述也没有..." }}
            </div>
          </div>
        </div>
      </nuxt-link>
      <div class="border-t-neutral-100 dark:border-t-neutral-900 bg-white dark:bg-black">
        <div class="text-sm  flex items-center" v-if="navData.creatorUrl">
          <a :href="navData.creatorUrl" target="_blank">
            <!-- author 图标 -->
            <span>{{ navData.creator }}</span>
          </a>
        </div>
        <div class="grow">
          <span class="website-item__icon" :class="isView && 'active'">
            <!-- <span class="iconfont icon-attentionfill"></span> -->
            {{ navData.view }}
          </span>
          <span
            class="website-item__icon"
            :class="isStar && 'active'"
            @click="handleNavStar(navData)"
          >
            <!-- <span class="iconfont icon-appreciatefill"></span> -->
            {{ navData.star }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LinkIcon } from 'lucide-vue-next'
import type { LinkItem } from '@/types/global'
const isStar = ref(false)
const isView = ref(false)
const props = defineProps<{
  linkList: Array<LinkItem>
}>()

async function addNavView(navData:LinkItem) {
  const { view, id } = navData

  await useFetch('/api/nav', {
    method: 'PUT',
    body: { id, view: view + 1 }
  })

  const views = getLocal('VIEWS')
  views[id] = view + 1
  localStorage.set('VIEWS', views)
}
function handleNavClick(navData:LinkItem) {
  const { href } = navData
  addNavView(navData)
  window.open(href, '_blank')
}
async function handleNavStar(navData :LinkItem) {
  const { star, id } = navData

  const stars = localStorage.get('STARS') || {}
  if (stars[id]) return

  const newStar = star + 1
  await $fetch('/api/nav', {
    method: 'PUT',
    body: { id, star }
  })
  stars[id] = newStar
  localStorage.set('STARS', stars)
}
defineOptions({
  name: 'AppNavList'
})

</script>

<style lang="scss" scoped>

</style>
