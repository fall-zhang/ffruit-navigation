<template>
  <div class="app-search flex  h-8 overflow-hidden rounded-lg">
    <!-- From Uiverse.io by emmanuelh-dev -->
    <div class="flex w-2 items-center justify-center  dark:bg-neutral-600 dark:text-white bg-white text-neutral-900">
      <!-- <SearchIcon :size="16" /> -->
    </div>
    <input type="text" class="w-full h-full max-w-[160px] bg-white dark:bg-neutral-600 dark:text-white pl-2 text-neutral-900 text-base  outline-0" placeholder="站内搜索" >
    <!-- <input type="button" value="Search" class="bg-blue-500 px-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"> -->
    <div class="flex w-10 items-center justify-center  bg-white dark:bg-neutral-600 dark:text-white text-neutral-900" @click="onSearchNav" @keydown=" onSearchNav">
      <SearchIcon :size="16" />
    </div >
    <!-- From Uiverse.io by Praashoo7 -->
    <!-- <input type="text" autocomplete="off" name="text" class="inner-input" placeholder="Username"> -->
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { SearchIcon } from 'lucide-vue-next'
defineOptions({
  name: 'AppSearch'
})
type GatherItem = {
  name: string
  placeholder: string
  root?: string
}
function onSearchNav() {

}
const searchGather: Record<string, GatherItem> = {
  station: {
    name: '站内',
    placeholder: '站内搜索'
  },
  baidu: {
    name: '百度',
    placeholder: '百度搜索',
    root: 'https://www.baidu.com/s?wd='
  },
  google: {
    name: '谷歌',
    placeholder: '百度搜索',
    root: 'https://www.google.com.hk/search?q='
  },
  '360': {
    name: '360',
    placeholder: '360搜索',
    root: 'https://www.so.com/s?q='
  },
  bing: {
    name: '必应',
    placeholder: '必应搜索',
    root: 'https://cn.bing.com/search?q='
  },
  sogou: {
    name: '搜狗',
    placeholder: '搜狗搜索',
    root: 'https://www.sogou.com/web?query='
  }
}
const searchText = ref()
const searchType = ref('station')
function queryData (query: string, cb: any) {
  if (searchType.value === 'station') {
    queryStation(query, cb)
  } else {
    queryBaidu(query, cb)
  }
}

async function queryStation (query: string, cb: any) {
  if (query !== '') {
    const { data } = await axios.get('/api/nav' + `?keyword=${query}`)
    if (Array.isArray(data.data)) {
      const finalData = data.data.map((item: any) => ({
        ...item,
        value: item.name
      }))
      cb(finalData)
    }
  } else {
    cb([])
  }
}
async function queryBaidu (query: string, cb: any) {
  const res = await axios.get(`/5a1Fazu8AA54nxGko9WTAnF6hhy/su?&wd=${query}&cb=getJSONPData`)

  try {
    const data = res.data
    const finalData = data.s.reduce((t: any, v: any) => [...t, { value: v }], [])
    cb(finalData)
  } catch (e) {
    cb([])
  }
}
function handleSelect (item: Record<string, any>) {
  const router = useRouter()
  let url = ''
  if (searchType.value === 'station') {
    router.push(`/nav/${item._id}`)
  } else {
    url = searchGather[searchType.value].root + item.value
    window.open(url)
  }
}
</script>

<style lang="scss" scoped>
</style>
