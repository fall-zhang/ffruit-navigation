<template>
  <div class="min-h-80 bg-white/40 dark:bg-neutral-800/70 rounded-md border border-neutral-400 dark:border-neutral-700 my-3 shadow hover:shadow-lg transition backdrop-blur-xl duration-400" shadow="never">
    <div class="py-2 px-4 border-b bg-white/20 dark:bg-neutral-800/50 rounded-t-md border-neutral-400 dark:border-b-neutral-600">
      <span>{{title}}</span>
    </div>
    <div class="text-sm item py-2 px-4">
      <nuxt-link  v-for="(item, index) in hotList.data" :key="index" :to="`/nav/${item.id}`" class="flex text-neutral-900 dark:text-neutral-300  mb-5 items-center cursor-pointer">
        <div class="bg-red-200"></div>
        <div class="bg-orange-200"></div>
        <div class="bg-yellow-200"></div>
        <div class="bg-neutral-500"></div>
        <span class="grow font-medium text-sm">{{ item.title }}</span>
        <div class="grow"></div>
        <span class=""> {{ item.hot }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HotApiResType } from 'nav-types'

const props = withDefaults(defineProps<{
  title:string
  hotList:HotApiResType
}>(), {
})

defineOptions({
  name: 'HotRanking'
})
</script>

<style lang="scss" scoped>
.nav-ranking {


  &:hover {
    .site-name {
      color: #4700f1;
    }
  }
}
</style>
