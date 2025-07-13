<template>
  <div class="nav-ranking-list grid grid-cols-2 px-6 lg:grid-cols-3 2xl:grid-cols-4 max-w-[1536px] gap-4 w-full align-middle">
    <RankListCard  title="知乎" :navList="newsList" />
    <RankListCard  title="知乎" :navList="newsList" />
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

const viewList = ref([])
const starList = ref([])
const newsList = ref<LinkItem[]>([
  {
    id: '',
    logo: 'ddd',
    name: 'asdas',
    view: 10,
    star: 20,
    createTime: '',
    href: '',
    desc: '',
    creatorUrl: '',
    creator: '',
    tags: []
  }
])

</script>

<style lang="scss" scoped>
.nav-ranking-list {
  .el-card__header {
    span {
      font-size: 18px;
      font-weight: 500;
    }
  }

}
</style>
