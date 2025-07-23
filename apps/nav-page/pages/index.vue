<template>
  <div class="w-full justify-center flex flex-col items-center">
    <div class="h-[35vh] flex items-center justify-end flex-col">
      <HourTime @click="onClickTime"/>
      <CenterSearch class="mt-3" />
    </div>
    <div  :class="twMerge('relative max-w-[1536px] h-100vh w-10/12 px-6 transition-all ',baseStore.navEnable ? 'opacity-100 translate-1.5':'pointer-events-none opacity-0')">
      <RankList />
      <NavGroup  :groupList="groupList" />
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

const baseStore = useBaseStore()
axios.get('/api').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
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
  window.addEventListener('wheel', () => {
    if (baseStore.navEnable === false) {
      baseStore.navEnable = true
      nextTick(() => {
        window.scroll({
          top: 20
        })
      })
    }
  })
})
// state
const loading = ref(false)

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
