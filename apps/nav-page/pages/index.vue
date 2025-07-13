<template>
  <AppLog :show="showLog" @closeLog="showLog = false" />
  <div class="user-layout w-full">
    <div class="w-full  flex justify-center flex-col items-center">
      <RankList />
    </div>
  </div>
  <AppNavList :linkList="data" />
  <QuestionBtn @showLog="showLog = true" />
  <NuxtPage page-key="static">
  </NuxtPage>
</template>

<script lang="ts" setup>
import AppNavList from '@/components/nav-page/nav-list.vue'
import QuestionBtn from '../components/QuestionBtn.vue'
import AppLog from '../components/AppLog.vue'
// import AppHeader from '../components/AppHeader'
import RankList from '../components/home-page/rank-list.vue'
// // import axios from 'axios'
// import NavRankingList from '../components/NavRankingList'
import useBaseStore from '@/store/index'
import axios from 'axios'
import { useDark } from '@vueuse/core'
import type { LinkItem } from '@/types/global'
defineOptions({
  name: 'home-page'
})

// state
const loading = ref(false)
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
const categories = ref([])
const navRanking = ref({
  view: [],
  star: [],
  news: []
})
const selfIndex = ref(0)
const isLeftbar = ref(true)
const showLog = ref(true)
const showMenuType = ref('half')
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

async function handleSubMenuClick (parentId: string) {
  loading.value = true
  const { data } = await axios.get(`/api/nav/find?categoryId=${parentId}`)
  data.value = data
  loading.value = false
}
function toggleMenu () {
  // showMenuType.value = showMenuType.value === 'none' ? 'all' : 'none'
}
function toggleMenu2 () {
  // showMenuType.value = showMenuType.value === 'all' ? 'half' : 'all'
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

async function asyncData ({ store }) {
  // const [{ data: categories }, { data: navRanking }] = await Promise.all([
  //   axios.get('/api/category/list'),
  //   axios.get('/api/nav/ranking')
  // ])

  // const id = store.state.selectedMenuParentId || categories[0]._id
  // const { data } = await axios.get(`/api/nav/find?categoryId=${id}`)
  // return {
  //   categories,
  //   navRanking,
  //   data
}
</script>

<style lang="scss">
.el-container {
  flex-direction: column;
}

.user-layout {

  .footer {
    position: fixed;
    left: 200px;
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: #999;
  }

  .el-submenu__title i {
    color: #fff;
  }

  .body {
    margin-left: 0;
  }
}


.el-menu--popup-right-start {
  height: 500px !important;
  overflow: auto;
}

body {
  .el-menu--popup-right-start {
    background-color: #fff !important;

    .el-menu-item {
      background-color: #fff !important;
      color: #333 !important;

      &:hover {
        background-color: #ecf5ff !important;
      }
    }
  }
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
