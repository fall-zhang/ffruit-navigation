<template>
  <div class="nav-group ">
    <div class="flex h-8">
      <div class="flex bg-neutral-800 rounded-full">
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '搜索资源' && 'bg-[#4700f1]'">搜索资源</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '网盘搜索' && 'bg-[#4700f1]'">网盘搜索</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '影视搜索' && 'bg-[#4700f1]'">影视搜索</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '音乐搜索' && 'bg-[#4700f1]'">音乐搜索</div>
        <div class="px-4 flex items-center rounded-full cursor-pointer" :class="activeIndex === '电子书搜索' && 'bg-[#4700f1]'">电子书搜索</div>
      </div>
    </div>
    <NavGroupList class="mt-4" :link-list="currentGroup" />
  </div>
</template>

<script lang="ts" setup>
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
  if (props.groupList.length > 0) {
    return props.groupList[0].navList
  }
  return []
})

defineOptions({
  name: 'AppNavList'
})

</script>

<style lang="scss" scoped>

</style>
