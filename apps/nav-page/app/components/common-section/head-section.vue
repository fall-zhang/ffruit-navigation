<template>
  <div :class="twMerge(['h-16 items-center px-6 flex bg-neutral-200 dark:bg-neutral-800 shadow-xl justify-between w-full border-b-neutral-500 border-b backdrop-blur-xl',hasBgImageHeaderClass])">
    <div class=" sm:flex items-center">
      <nuxt-link to="/" class="flex items-center">
        <OrangeIcon :size="36"/>
        <h1 class="text-2xl mr-4 text-(--text-primary) font-bold">鲜果导航</h1>
      </nuxt-link>
      <!-- <AppSearch class="not-sm:hidden" /> -->
    </div>
    <div class="grow"></div>
    <div class="tooltip tooltip-bottom" data-tip="更换壁纸">
      <div tabindex="0" role="button" class="m-1  mr-2 p-1 rounded cursor-pointer hover:bg-neutral-200/30" @click="onUploadFile">
        <ImageIcon class="text-white dark:text-neutral-200" height="26"  width="26"/>
      </div>
      <!-- <div >Hover</div> -->
    </div>
    <input ref="uploadRef" type="file" class="hidden" @change="onChangeFile" >
    <ThemeSwitch />
    <i class="el-icon-menu" @click="$emit('handleShowMenu')"></i>
  </div>
</template>

<script lang="ts" setup>
import { ImageIcon } from 'lucide-vue-next'
import AppSearch from './head-search.vue'
import { OrangeIcon } from '../icon/orange-icon'
import { saveImageToDB } from '@/utils/image-store'
import useBaseStore from '@/store'
import { twMerge } from 'tailwind-merge'
const uploadRef = useTemplateRef('uploadRef')
const hasBgImageHeaderClass = computed(() => {
  if (baseStore.bgImageUrl) {
    return ' bg-white/10 dark:bg-black/10 border-0'
  }
})
const baseStore = useBaseStore()
function onChangeFile(e:Event) {
  if (!e.target) {
    return
  }
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const selectFile = files[0]
  // 转换为 Base64 格式
  if (!selectFile) {
    console.warn('without select file')
    return
  }
  const fileUrl = URL.createObjectURL(selectFile)
  baseStore.bgImageUrl = fileUrl

  saveImageToDB(selectFile)
}

function onUploadFile() {
  uploadRef.value?.click()
  // 处理文件上传
}

</script>

<style lang="scss" scoped>
.button-item {
  margin-left: 10px;
}

</style>
