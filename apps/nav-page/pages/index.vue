<template>
  <el-container class="user-layout">
    <!-- <AppNavMenus @handleSubMenuClick="handleSubMenuClick" :categorys="categorys" :show-menu-type="showMenuType"
      @showMenus="toggleMenu2" /> -->
    <el-container class="body" >
      <!--       <div class="main" v-loading="loading">
        <nav-ranking-list :data="navRanking" />

        <div class="website-wrapper" v-for="item in data" :key="item.name">
          <p class="website-title" :id="item._id">{{ item.name }}</p>
          <app-nav-list :list="item.list" />
        </div>
      </div> -->
    </el-container>
    <!-- <AddNavPopup v-model:show="showPopup" /> -->
    <CustomerServiceBtn @showLog="showLog = true" />
    <AppLog :show="showLog" @closeLog="showLog = false" />
  </el-container>
</template>

<script lang="ts" setup>
import AppNavList from '@/components/AppNavList.vue'
import CustomerServiceBtn from '../components/CustomerServiceBtn.vue'
import AppLog from '../components/AppLog.vue'
// import AppHeader from '../components/AppHeader'
import AppNavMenus from '../components/AppNavMenus.vue'
// // import axios from 'axios'
// import NavRankingList from '../components/NavRankingList'
import Affiche from '../components/Affiche.vue'
import useBaseStore from '@/store/index'
import axios from 'axios'
// state
const loading = ref(false)
const data = ref([])
const categorys = ref([])
const navRanking = ref({
  view: [],
  star: [],
  news: []
})
const selfIndex = ref(0)
const isLeftbar = ref(true)
const isCollapse = ref(true)
const showPopup = ref(false)
const showLog = ref(false)
const showMenuType = ref('half')
const baseStore = useBaseStore()

const contentMarginLeft = computed(() => {
  if (showMenuType.value == 'half') {
    return '70px'
  } else if (showMenuType.value == 'all') {
    if (isMobileSize()) {
      return 0
    } else {
      return '220px'
    }
  } else {
    return 0
  }
})

onMounted(() => {
  handleResize()
  const throttleFun = throttle(handleResize, 300)
  window.addEventListener('reset', throttleFun)

  categorys.value = getLocal('category')
  baseStore.saveCategory(categorys.value || [])
  return () => {
    window.removeEventListener('resize', throttleFun)
  }
})
onUnmounted(() => {
})

async function handleSubMenuClick(parentId: string) {
  loading.value = true
  const { data } = await axios.get(`/api/nav/find?categoryId=${id}`)
  data.value = data
  loading.value = false
}
function toggleMenu() {
  // showMenuType.value = showMenuType.value === 'none' ? 'all' : 'none'
}
function toggleMenu2() {
  // showMenuType.value = showMenuType.value === 'all' ? 'half' : 'all'
}
function handleResize(event?: UIEvent) {
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

async function asyncData({ store }) {
  // const [{ data: categorys }, { data: navRanking }] = await Promise.all([
  //   axios.get('/api/category/list'),
  //   axios.get('/api/nav/ranking')
  // ])

  // const id = store.state.selectedMenuParentId || categorys[0]._id
  // const { data } = await axios.get(`/api/nav/find?categoryId=${id}`)
  // return {
  //   categorys,
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
