<template>
  <div class="">
    <div class="flex h-8 m-3 ">
      <div class="flex bg-neutral-800 rounded-full">
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '搜索资源' && 'bg-fuchsia-600'">搜索资源</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '网盘搜索' && 'bg-fuchsia-600'">网盘搜索</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '影视搜索' && 'bg-fuchsia-600'">影视搜索</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '音乐搜索' && 'bg-fuchsia-600'">音乐搜索</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '电子书搜索' && 'bg-fuchsia-600'">电子书搜索</div>
      </div>
    </div>
    <NavGroupList :link-list="currentGroup" />
  </div>
</template>

<script lang="ts" setup>
import { LinkIcon } from 'lucide-vue-next'
import NavGroupList from './nav-group-list.vue'
import type { LinkItem } from '@/types/global'

const activeIndex = ref('搜索资源')
type GroupList = {
  id:string
  name:string
  navList:LinkItem[]
}

const props = defineProps<{
  groupList: Array<GroupList>
}>()
const currentGroup = computed(() => {
  return props.groupList[0].navList
})
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
