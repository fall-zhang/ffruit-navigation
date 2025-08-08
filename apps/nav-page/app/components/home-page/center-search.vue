<template>
  <div class="flex flex-col justify-center relative">
    <div class="search-input border border-neutral-300 dark:border-0 rounded-full flex items-center w-100 h-10 text-black">
      <!-- 搜索引擎选择 -->
      <div class="engin-select w-12 px-1 cursor-pointer  h-full flex items-center justify-end hover:bg-neutral-500/30" @click="onChangeEngin">
        <component class="size-6 ml-1" :is="searchEnginIcon" />
        <ChevronRightIcon class="ml-1 rotate-90" :size="10" stroke-width="4" color="#000" />
      </div>
      <input class="no-style-input outline-0 h-full grow" :id="inputId" v-model="inputSearchText" placeholder="" @focus="onFocusInput" autocomplete="off">
      <div class="w-16 flex items-center justify-center bg-[#4700f1] h-full cursor-pointer">
        <SearchIcon class="" color="#fff" @click="onSearch" />
      </div>
    </div>
    <ul ref="enginSelectRef" :class="twMerge('absolute top-5 -left-16 -right-16  h-22 mt-8 hidden  items-center gap-4 opacity-0 bg-neutral-500/40 dark:bg-neutral-800/60 backdrop-blur-xl rounded-box z-1  py-2 px-5  transition justify-between shadow-2xl', showSelectEngin ? 'flex opacity-100':'')">
      <li class="flex cursor-pointer justify-between flex-col items-center h-15 w-12 group" v-for="item in searchEnginList" :key="item.name" @click="onSelectEngin(item)">
        <component class="size-8" :is="item.icon" />
        <span class="text-xs group-hover:hidden bg-neutral-400  dark:bg-neutral-700 w-full text-center rounded py-0.5" >{{item.name}}</span>
        <span class="text-xs hidden group-hover:inline bg-neutral-300 dark:bg-neutral-600 w-full text-center rounded py-0.5">{{item.shortcut}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { BilibiliIcon } from '../icon/search-engin/bilibili'
import { GoogleIcon } from '../icon/search-engin/google'
import { ChevronRightIcon, GitBranch, SearchIcon } from 'lucide-vue-next'
import { BingIcon } from '../icon/search-engin/bing'
import { BaiduIcon } from '../icon/search-engin/baidu'
import { XiaohongshuIcon } from '../icon/search-engin/xiaohongshu'
import { TikTokIcon } from '../icon/search-engin/tiktok'
import type { RenderFunction } from 'vue'
import { GithubIcon } from '../icon/search-engin/github'
import { onClickOutside, useMagicKeys } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

const enginSelectRef = useTemplateRef('enginSelectRef')
type EnginItem = {
  icon:RenderFunction
  name:string
  searchHref:string
  shortcut:string
}

// eslint-disable-next-line camelcase
const { alt_1, alt_2, alt_3, alt_4, alt_5, alt_6, alt_7 } = useMagicKeys()
const searchEnginList:EnginItem[] = [
  {
    icon: BingIcon,
    name: 'Bing',
    searchHref: 'https://cn.bing.com/search?form=QBLH&q=',
    shortcut: 'alt+1'
  },
  {
    icon: GoogleIcon,
    name: 'Google',
    searchHref: 'https://www.google.com.hk/search?q=',
    shortcut: 'alt+2'
  },
  {
    icon: BaiduIcon,
    name: '百度',
    searchHref: 'https://www.baidu.com/s?wd=',
    shortcut: 'alt+3'
  },
  {
    icon: XiaohongshuIcon,
    name: '小红书',
    searchHref: 'https://www.xiaohongshu.com/search_result?keyword=',
    shortcut: 'alt+4'
  },
  {
    icon: TikTokIcon,
    name: '抖音',
    searchHref: 'https://www.douyin.com/root/search/',
    shortcut: 'alt+5'
  },
  {
    icon: BilibiliIcon,
    name: 'bilibili',
    searchHref: 'https://search.bilibili.com/all?keyword=',
    shortcut: 'alt+6'
  },
  {
    icon: GithubIcon,
    name: 'github',
    searchHref: 'https://github.com/search?q=hello',
    shortcut: 'alt+7'
  }
]

const showSelectEngin = ref(false)
const searchEnginIcon = ref<RenderFunction>(BingIcon)

function onChangeEngin(ev:Event) {
  ev.stopPropagation()
  console.log(7777777, showSelectEngin.value)

  showSelectEngin.value = !showSelectEngin.value
}
const inputId = useId()
const inputSearchText = ref('')
const searchHrefText = ref(searchEnginList[0].searchHref)

function onFocusInput() {
  showSelectEngin.value = false
}
function onSelectEngin(enginInfo:EnginItem) {
  showSelectEngin.value = false
  searchHrefText.value = enginInfo.searchHref
  searchEnginIcon.value = enginInfo.icon
}
onMounted(() => {
  onClickOutside(enginSelectRef.value, () => {
    showSelectEngin.value = false
  })
})

watch(alt_1, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[0].searchHref
    searchEnginIcon.value = searchEnginList[0].icon
  }
})
watch(alt_2, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[1].searchHref
    searchEnginIcon.value = searchEnginList[1].icon
  }
})
watch(alt_3, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[2].searchHref
    searchEnginIcon.value = searchEnginList[2].icon
  }
})
watch(alt_4, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[3].searchHref
    searchEnginIcon.value = searchEnginList[3].icon
  }
})
watch(alt_5, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[4].searchHref
    searchEnginIcon.value = searchEnginList[4].icon
  }
})
watch(alt_6, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[5].searchHref
    searchEnginIcon.value = searchEnginList[5].icon
  }
})
watch(alt_7, (v) => {
  if (v) {
    searchHrefText.value = searchEnginList[6].searchHref
    searchEnginIcon.value = searchEnginList[6].icon
  }
})

function onSearch () {
  const jumpHref = searchHrefText.value + inputSearchText.value
  window.open(jumpHref, '_blank')
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
