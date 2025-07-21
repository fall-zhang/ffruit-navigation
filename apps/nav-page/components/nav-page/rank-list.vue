<!-- 网站排名卡片 -->

<template>
  <div class="nav-ranking-list  grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4 w-full align-middle">
    <RankListCard  title="知乎" :navList="newsList" />
    <RankListCard class="hidden sm:block" title="知乎" :navList="newsList" />
    <RankListCard class="hidden lg:block" title="知乎" :navList="newsList" />
    <RankListCard class="hidden 2xl:block" title="知乎" :navList="newsList" />
  </div>
</template>

<script lang="ts" setup>
import RankListCard from './rank-list-card.vue'
import type { LinkItem } from '@/types/global'
defineOptions({
  name: 'NavRankList'
})
type CardInfo = {
  title:string
  subList: string[]
}

const newsList = ref<LinkItem[]>([
  {
    id: '',
    logo: 'https://www.zhihu.com/favicon.ico',
    name: 'asdas',
    view: 10,
    star: 20,
    createTime: '',
    href: '',
    desc: '',
    creatorUrl: '',
    creator: '',
    tags: [],
    linkGroup: '',
    linkSubGroup: ''
  }
])

</script>

<style lang="scss" scoped>
</style>
