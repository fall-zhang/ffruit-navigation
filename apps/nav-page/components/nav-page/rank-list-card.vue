<template>
  <div class="min-h-80 bg-neutral-200 dark:bg-neutral-800 rounded-md border border-neutral-400 dark:border-neutral-700 my-3 shadow hover:shadow-lg transition duration-400" shadow="never">
    <div class="py-2 px-4 border-b border-neutral-400 dark:border-b-neutral-600">
      <span>{{title}}</span>
    </div>
    <div class="text-sm item py-2 px-4">
      <nuxt-link  v-for="(item, index) in navList" :key="index" :to="`/nav/${item.id}`" class="flex text-neutral-900 dark:text-neutral-300  mb-5 items-center cursor-pointer">
        <img  class="size-5 rounded-xl mx-2" alt="13" :src="item.logo" />
        <span class="site-name">{{ item.name }}</span>
        <div class="grow"></div>
        <span class=""> {{ formatAttr(item[type]) }}</span>
        <EyeIcon v-if="type == 'view'" />
        <StarIcon  v-if="type == 'star'" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LinkItem } from '@/types/global'
import dayjs from 'dayjs'
import { EyeIcon, StarIcon } from 'lucide-vue-next'


const props = withDefaults(defineProps<{
  title:string
  type?:'view' | 'star' | 'createTime'
  navList:LinkItem[]
}>(), {
  type: 'createTime'
})

defineOptions({
  name: 'NavRanking'
})
const subText = () => {

}
function formatAttr(value:string | number) {
  if (props.type === 'createTime') {
    return dayjs(1676243211248).format('YYYY-MM-DD')
  }
  return value
}
</script>

<style lang="scss" scoped>
.nav-ranking {


  .site-name {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
  }

  &:hover {
    .site-name {
      color: #4700f1;
    }
  }
}
</style>
