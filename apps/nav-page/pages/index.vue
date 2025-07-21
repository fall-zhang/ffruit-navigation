<template>
  <div class="w-full justify-center flex flex-col items-center">
    <div class="h-[35vh] flex items-center justify-end flex-col">
      <HourTime />
      <CenterSearch class="mt-3" />
    </div>
    <div class="max-w-[1536px] w-full px-6">
      <RankList />
      <NavGroup :groupList="groupList" />
    </div>
  </div>
  <NuxtPage page-key="static"></NuxtPage>
</template>

<script lang="ts" setup>
import RankList from '../components/nav-page/rank-list.vue'
import HourTime from '../components/home-page/hour-time.vue'
import CenterSearch from '../components/home-page/center-search.vue'
import useBaseStore from '@/store/index'
import axios from 'axios'
import type { LinkGroup, LinkItem } from '@/types/global'
import NavGroup from '@/components/nav-page/nav-group.vue'
defineOptions({
  name: 'home-page'
})

// state
const loading = ref(false)
const data = ref<LinkItem[]>([
  {
    name: '64654321',
    id: 'fvb',
    logo: 'http://www.baidu.com/favicon.ico',
    href: 'http://www.baidu.com',
    view: 0,
    star: 0,
    createTime: 'asdf',
    desc: 'asdfa',
    creatorUrl: 'aasdf',
    creator: '',
    tags: [],
    linkGroup: '',
    linkSubGroup: ''
  }
])
const groupList = ref<LinkGroup[]>([
  {
    id: 'string',
    name: 'string',
    subGroup: '',
    navList: [{
      name: '64654321',
      id: 'fvb',
      logo: 'http://www.baidu.com/favicon.ico',
      href: 'http://www.baidu.com',
      view: 0,
      star: 0,
      createTime: 'asdf',
      desc: 'asdfa',
      creatorUrl: 'aasdf',
      creator: '',
      tags: [],
      linkGroup: '',
      linkSubGroup: ''
    }, {
      name: '1252452',
      id: 'fv11123b',
      logo: 'http://www.baidu.com/favicon.ico',
      href: 'http://www.baidu.com',
      view: 0,
      star: 0,
      createTime: 'asdf',
      desc: 'asdfa',
      creatorUrl: 'aasdf',
      creator: '',
      tags: [],
      linkGroup: '',
      linkSubGroup: ''
    }, {
      name: '1252452',
      id: '123b',
      logo: 'http://www.baidu.com/favicon.ico',
      href: 'http://www.baidu.com',
      view: 0,
      star: 0,
      createTime: 'asdf',
      desc: 'asdfa',
      creatorUrl: 'aasdf',
      creator: '',
      tags: [],
      linkGroup: '',
      linkSubGroup: ''
    }]
  }
])

const categories = ref([])

const baseStore = useBaseStore()

onMounted(() => {
  handleResize()
  const throttleFun = throttle(handleResize, 300)
  window.addEventListener('reset', throttleFun)

  categories.value = getLocal('category')
  baseStore.saveCategory(categories.value || [])
  return () => {
    window.removeEventListener('resize', throttleFun)
  }
})
onUnmounted(() => {
})

async function onSubMenuClick (parentId: string) {
  loading.value = true
  const { data } = await axios.get(`/api/nav/find?categoryId=${parentId}`)
  data.value = data
  loading.value = false
}

function handleResize (event?: UIEvent) {
  //   if (event) {
  //     const { innerWidth } = event.target
  //     if (innerWidth < 568) {
  //       showMenuType.value = 'none'
  //     } else {
  //       showMenuType.value = 'half'
  //     }
  //   } else {
  //     if (isMobileSize()) {
  //       showMenuType.value = 'none'
  //     } else {
  //       showMenuType.value = 'half'
  //     }
  //   }
  // }
}

</script>

<style lang="scss">
.el-container {
  flex-direction: column;
}


.el-menu--popup-right-start {
  height: 500px !important;
  overflow: auto;
}

.main {
  padding: 20px;
  position: relative;
}


.website-wrapper {
  .website-title {
    font-size: 14px;
    margin: 50px 0 20px;
    background: #fff;
    display: inline-block;
    padding: 5px 10px;
    border-top-right-radius: 15px;
  }
}
</style>
