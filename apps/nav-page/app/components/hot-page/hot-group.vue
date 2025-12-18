<template>
  <div class="nav-group grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
    <HotListCard v-for="cardInfo in groupList" :key="cardInfo.title" class="mt-4" v-bind="cardInfo"  />
  </div>
</template>

<script lang="ts" setup>
import HotListCard from './hot-list-card.vue'
import type { HotApiResType } from 'nav-types'


const props = defineProps<{
  groupList: Array<{
    title:string
    icon:string
    hotList:HotApiResType
  }>
}>()


defineOptions({
  name: 'AppNavList'
})

</script>

<style lang="scss" scoped>

</style>
