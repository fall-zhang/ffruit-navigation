<template>
  <div class="w-full justify-center flex flex-col items-center -scroll-mr-60">
    <div class="h-[35vh] flex items-center justify-end flex-col">
      <HourTime @click="onClickTime"/>
      <CenterSearch class="mt-3" />
    </div>
    <div :class="twMerge('relative max-w-[1536px] h-100vh w-10/12 px-6 transition-all',baseStore.navEnable ? 'h-full opacity-100 translate-1.5':'h-40 pointer-events-none opacity-0 overflow-hidden')">
      <!-- <RankList /> -->
      <HotListGroup :groupList="hotGroupList" />
      <!-- <NavGroup  :groupList="groupList" /> -->
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
import { useWindowScroll } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'
import HotListGroup from '@/components/hot-page/hot-group.vue'
import { getApiTitle } from 'nav-types'
import type { HotApiResType, HotAPIType } from 'nav-types'

const baseStore = useBaseStore()
// $fetch('/api/noe').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
const hotGroupList = ref<Array<{
  title: string;
  icon: string
  hotList:HotApiResType
}>>([])

const reqList:HotAPIType[] = ['bilibili', 'douyin', '36kr', 'ithome']
reqList.forEach(item => {
  $fetch('/api-hot/' + item).then(async res => {
    const rankedRes = res as HotApiResType
    rankedRes.data.sort((left, right) => {
      if (left.hot && right.hot) {
        return (right.hot - left.hot)
      }
      return 0
    })
    hotGroupList.value.push({
      title: getApiTitle(item),
      icon: (await import(`@/assets/official-icon/${item}.png`)).default,
      hotList: rankedRes
    })
  }).catch(err => {
    console.warn(err)
  })
})

// $fetch('/api-hot/zhihu')
const { y } = useWindowScroll()
watch(() => y, (newVal) => {
  if (newVal.value > 0) {
    baseStore.navEnable = true
  }
})
function onClickTime() {
  baseStore.navEnable = !baseStore.navEnable
}

onMounted(() => {
  window.addEventListener('wheel', (ev) => {
    // 向下滚动
    if (ev.deltaY > 0) {
      if (baseStore.navEnable === false) {
        baseStore.navEnable = true
        nextTick(() => {
          window.scroll({
            top: 120,
            behavior: 'smooth'
          })
        })
      }
    // 向上滚动
    } else {
      if (y.value === 0) {
        // baseStore.navEnable = false
      }
    }
  })
})
// state
const loading = ref(false)

const groupList = ref<LinkGroup[]>([
  {
    id: 'string',
    name: '搜索导航',
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

const recentVisitNavList = ref([])


onMounted(() => {
  // handleResize()
  // const throttleFun = throttle(handleResize, 300)
  // window.addEventListener('reset', throttleFun)

  recentVisitNavList.value = getLocal('category')
  baseStore.saveCategory(recentVisitNavList.value || [])
})
onUnmounted(() => {
  // window.removeEventListener('resize', throttleFun)
})

async function onSubMenuClick (parentId: string) {
  loading.value = true
  const { data } = await axios.get(`/api/nav/find?categoryId=${parentId}`)
  data.value = data
  loading.value = false
}

// function handleResize (event?: UIEvent) {
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
// }
defineOptions({
  name: 'home-page'
})
</script>

<style lang="scss">

</style>
