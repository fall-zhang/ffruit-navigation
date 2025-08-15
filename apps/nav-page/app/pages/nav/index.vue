<template>
  <div class="">
    <NavGroup :groupList="groupList" />
    <NuxtPage page-key="nav-list-page">
    </NuxtPage>
  </div>
</template>

<script lang="ts" setup>
import NavGroup from '@/components/nav-page/nav-group.vue'
import type { NavDataType, NavCategoryType } from 'nav-types'
import type { LinkGroup } from '~/types/global'
defineOptions({
  name: 'nav-home'
})

const groupList = ref<LinkGroup[]>([
  {
    id: 'string',
    name: '搜索导航',
    parent: '',
    navList: []
  }
])

Promise.all([$fetch('/api/nav', {
  method: 'get'
}), $fetch('/api/category', {
  method: 'get'
})]).then(([navRes, categoryRes]) => {
  console.log('🚀 ~ categoryRes:', categoryRes)
  console.log('🚀 ~ navRes res:', navRes)
  if (!groupList.value[0]?.navList) {
    return
  }
  groupList.value[0].navList = (navRes as any).data as NavDataType[]

  console.log('🚀 ~ groupList:', groupList.value)
  const categoryList:NavCategoryType[] = (categoryRes as any).data as NavCategoryType[]
  categoryList.forEach(item => {
    groupList.value.push({
      id: item.id,
      name: item.name,
      parent: item.parent,
      navList: []
    })
  })
  console.log('🚀 ~ categoryRes.data categoryRes.data:', categoryRes)
}).catch(err => {
  console.warn(err)
})
</script>

<style lang="scss" scoped>

</style>
