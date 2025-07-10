<template>
  <div class="nav-ranking-list grid md:grid-cols-3 gap-4 w-full">
    <el-card header-class="box-header" class="box-card" shadow="never">
      <template #header>
        <div class="clearfix">
          <span>知乎</span>
        </div>
      </template>
      <div v-for="(item, index) in data.news" :key="index" class="text item">
        <nav-ranking :data="item" />
      </div>
    </el-card>

    <el-card header-class="box-header" class="box-card" shadow="never">
      <template #header>
        <div class="clearfix">
          <span>微博</span>
        </div>
      </template>
      <div v-for="(item, index) in data.view" :key="index" class="text item">
        <nav-ranking :data="item" count-type="view" />
      </div>
    </el-card>

    <el-card header-class="box-header" class="box-card" shadow="never">
      <template #header>
        <div class="clearfix">
          <span>酷安</span>
        </div>
      </template>
      <div v-for="(item, index) in data.star" :key="index" class="text item">
        <nav-ranking :data="item" count-type="star" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import NavRanking from '../NavRanking.vue'
export default {
  name: 'NavRankingList',
  components: { NavRanking },
  props: {
    data: {
      type: Object,
      default: () => ({
        view: [],
        star: [],
        news: []
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.nav-ranking-list {
  .el-card__header {
    span {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .box-header {
    padding: 6px 12px;
  }
}
</style>
