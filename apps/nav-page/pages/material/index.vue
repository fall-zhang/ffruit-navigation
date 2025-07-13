<template>
  <div class=" h-40 w-40">
    <div class="mt-10">
      头部搜索
      <NavSearch />
    </div>
    <div class="mt-10">
      链接列表
      <AppNavList  :linkList="data"   />
    </div>
    <div class="mt-10">
      排名卡片
      <RankListCard  title="知乎" :navList="data" />
    </div>


  </div>
</template>

<script lang="ts" setup>
import AppNavList from '@/components/nav-page/nav-list.vue'
import RankList from '@/components/home-page/rank-list.vue'
import RankListCard from '@/components/home-page/rank-list-card.vue'
import type { LinkItem } from '@/types/global'


const data = ref<LinkItem[]>([
  {
    name: '64654321',
    id: 'fvb',
    logo: 'dasd',
    href: 'qwerqwer',
    view: 0,
    star: 0,
    createTime: 'asdf',
    desc: 'asdfa',
    creatorUrl: 'aasdf',
    creator: '',
    tags: []
  }
])
defineOptions({
  name: 'nav-material'
})
</script>

<style lang="scss" scoped></style>
