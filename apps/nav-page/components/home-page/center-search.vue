<template>
  <div class="flex flex-col justify-center relative">
    <div class="search-input border border-neutral-300 dark:border-0 rounded-full flex items-center w-100 h-10 text-black">
      <!-- 搜索引擎选择 -->
      <div class="engin-select w-12 px-1 cursor-pointer  h-full flex items-center justify-end hover:bg-neutral-500/30" @click="onChangeEngin">
        <img class="size-6" src="@/assets/official-icon/github.svg" />
        <ChevronRightIcon class="ml-1 rotate-90" :size="10" stroke-width="4" color="#000" />
      </div>
      <input class="no-style-input outline-0 h-full grow" :id="inputId" v-model="inputSearchText" placeholder="" @focus="onFocusInput" autocomplete="off">
      <div class="w-16 flex items-center justify-center bg-[#4700f1] h-full cursor-pointer">
        <SearchIcon class="" color="#fff" />
      </div>
    </div>
    <ul class="absolute top-4 -left-10 -right-10  h-22 mt-8 flex items-center gap-4 opacity-0  bg-neutral-800/60 backdrop-blur-xl rounded-box z-1  py-2 px-5 shadow-sm transition justify-between" :class="showSelectEngin ? 'opacity-100':''">
      <li class="flex cursor-pointer justify-between flex-col items-center h-15 w-10 " v-for="item in searchEnginList" :key="item.name">
        <component class="size-8" :is="item.icon" />
        <span class="text-xs ">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import { GoogleIcon } from '../icon/search-engin/google'
import { ChevronRightIcon, SearchIcon } from 'lucide-vue-next'
import { BingIcon } from '../icon/search-engin/bing'
import { BaiduIcon } from '../icon/search-engin/baidu'
import { XiaohongshuIcon } from '../icon/search-engin/xiaohongshu'
import { TikTokIcon } from '../icon/search-engin/tiktok'
type GatherItem = {
  name: string
  placeholder: string
  root?: string
}
const searchEnginList = [
  {
    icon: BingIcon,
    name: 'Bing'
  },
  {
    icon: GoogleIcon,
    name: 'Google'
  },
  {
    icon: BaiduIcon,
    name: '百度'
  },
  {
    icon: XiaohongshuIcon,
    name: '小红书'
  },
  {
    icon: TikTokIcon,
    name: '抖音'
  }
]
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
const showSelectEngin = ref(false)
function onChangeEngin() {
  showSelectEngin.value = !showSelectEngin.value
}
const inputId = useId()
const inputSearchText = ref('')

function onFocusInput() {
  showSelectEngin.value = false
}

</script>

<style lang="scss" scoped>
.search-input {
  // border: 2px solid transparent;
  user-select: none;
  outline: none;
  overflow: hidden;
  background-color: #eeeeee;
  transition: all 0.5s;
}

.search-input:hover,
.search-input:focus {
  box-shadow: 0px 0px 0px 6px rgba(74, 150, 236, 0.2), 0px 0px 8px 14px rgba(74, 150, 236, 0.2);
  background-color: #e6e6e6;
}

</style>
