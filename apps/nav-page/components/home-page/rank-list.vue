<template>
  <div class="nav-ranking-list grid md:grid-cols-3 gap-4 w-full ">
    <RankListCard title="知乎" />

    <el-card header-class="box-header" class="box-card" shadow="never">
      <template #header>
        <div class="clearfix">
          <span>微博</span>
        </div>
      </template>
      <div v-for="(item, index) in viewList" :key="index" class="text item">
        <nav-ranking :data="item" count-type="view" />
      </div>
    </el-card>

    <el-card header-class="box-header" class="box-card" shadow="never">
      <template #header>
        <div class="clearfix">
          <span>酷安</span>
        </div>
      </template>
      <div v-for="(item, index) in starList" :key="index" class="text item">
        <nav-ranking :data="item" count-type="star" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import NavRanking from '../NavRanking.vue'
import RankListCard from './rank-list-card.vue'
defineOptions({
  name: 'NavRankList'
})
type CardInfo = {
  title:string
  subList: string[]
}

const viewList = ref([])
const starList = ref([])
const newsList = ref([])

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
