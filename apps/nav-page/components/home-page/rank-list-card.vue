<template>
  <div class="box-header bg-neutral-800" shadow="never">
    <div class="p-2 border-b border-b-neutral-600">
      <span>{{title}}</span>
    </div>
    <div v-for="(item, index) in newsList" :key="index" class="text-sm item">
      <nuxt-link :to="`/nav/${data._id}`" class="text-neutral-300 flex mb-5 items-center cursor-pointer">
        <el-image class="logo" :src="data.logo" />
        <span class="name">{{ data.name }}</span>
        <span class="widget"> {{ formatAttr(data[type]) }}</span>
        <span class="iconfont icon-attentionfill" v-if="type == 'view'"></span>
        <span class="iconfont icon-appreciatefill" v-if="type == 'star'"></span>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

type LinkItem = {
  _id:string
  logo:string
  name:string
}

const props = defineProps<{
  title:string
  type?:'view' | 'star' | 'createTime'
  data:LinkItem
}>()

defineOptions({
  name: 'NavRanking'
})
const subText = () => {

}
function formatAttr(value:string) {
  if (props.type === 'createTime') {
    return dayjs(value).format('YYYY-MM-DD')
  }
  return value
}
</script>

<style lang="scss" scoped>
.nav-ranking {


  .logo {
    min-width: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .name {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
  }

  .iconfont {
    margin-left: 4px;
  }

  &:hover {
    .name {
      color: #4700f1;
    }
  }
}
</style>
