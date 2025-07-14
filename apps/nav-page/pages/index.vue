<template>
  <AppLog :show="showLog" @closeLog="showLog = false" />
  <div class="w-full flex justify-center flex-col items-center">
    <RankList />
  </div>
  <NavGroup :groupList="groupList" />
  <QuestionBtn @showLog="showLog = true" />
  <NuxtPage page-key="static">
  </NuxtPage>
</template>

<script lang="ts" setup>
import QuestionBtn from '../components/QuestionBtn.vue'
import AppLog from '../components/AppLog.vue'
// import AppHeader from '../components/AppHeader'
import RankList from '../components/home-page/rank-list.vue'
// // import axios from 'axios'
// import NavRankingList from '../components/NavRankingList'
import useBaseStore from '@/store/index'
import axios from 'axios'
import type { LinkItem } from '@/types/global'
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
const groupList = ref([
  {
    id: 'string',
    name: 'string',
    navList: []
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
