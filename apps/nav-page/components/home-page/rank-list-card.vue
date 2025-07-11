<template>
  <div class="box-header bg-neutral-800 " shadow="never">
    <div class="py-2 px-4 border-b border-b-neutral-600">
      <span>{{title}}</span>
    </div>
    <div v-for="(item, index) in navList" :key="index" class="text-sm item">
      <nuxt-link :to="`/nav/${item._id}`" class="text-neutral-300 flex mb-5 items-center cursor-pointer">
        <el-image class="site-logo" :src="item.logo" />
        <span class="site-name">{{ item.name }}</span>
        <span class=""> {{ formatAttr(item[type]) }}</span>
        <EyeIcon v-if="type == 'view'" />
        <StarIcon  v-if="type == 'star'" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { EyeIcon, StarIcon } from 'lucide-vue-next'

type LinkItem = {
  _id:string
  logo:string
  name:string
  view:number
  star:number
  createTime:string
}

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
    return dayjs(value).format('YYYY-MM-DD')
  }
  return value
}
</script>

<style lang="scss" scoped>
.nav-ranking {
  .site-logo {
    min-width: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }

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
