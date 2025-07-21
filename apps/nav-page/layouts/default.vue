<template>
  <div class="flex h-dvh w-full bg-(--background) text-(--foreground) transition-all">
    <div class="grow flex flex-col z-100">
      <HeadSection class="shrink-0"  />
      <router-view />
      <div class="grow"></div>
      <PageFooter></PageFooter>
      <AppFixedButton />
      <LinkJumpNotice/>
    </div>
    <img :src="baseStore.bgImageUrl"  class="backface-hidden object-fit fixed h-screen w-screen left-0 right-0 top-0 bottom-0 object-cover" alt="">
  </div>
</template>

<script lang="ts" setup>
import AppFixedButton from '../components/AppFixedButton.vue'
import HeadSection from '@/components/common-section/head-section.vue'
import PageFooter from '@/components/common-section/page-footer.vue'
import useBaseStore from '@/store'
import { isMobileSize } from '@/utils/utils'
import { useDark } from '@vueuse/core'
import { loadImageFromDB } from '@/utils/image-store'
const baseStore = useBaseStore()
defineOptions({
  name: 'default-layout'
})
useDark({
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light'
})

onMounted(() => {
  async function initImage() {
    try {
      const imageData = await loadImageFromDB()
      baseStore.bgImageUrl = URL.createObjectURL(imageData)
    } catch(err) {
      baseStore.bgImageUrl = ''
    }
  }
  initImage()
})

// function toggleMenu () {
//   showMenuType.value = showMenuType.value === 'none' ? 'all' : 'none'
// }
// function toggleMenu2 () {
//   showMenuType.value = showMenuType.value === 'all' ? 'half' : 'all'
// }
function handleResize () {
  if (isMobileSize()) {
    showMenuType.value = 'none'
  } else {
    showMenuType.value = 'half'
  }
}
const showPopup = ref(false)
const showMenuType = ref('half')
const category = ref([])

onMounted(() => {
  handleResize()
  window.onresize = throttle(handleResize.bind(this), 300)

  const store = useBaseStore()
  const localCategory = localStorage.getItem('category')
  category.value = localCategory ? JSON.parse(localCategory) : []
  store.saveCategory(category.value)
})

onMounted(() => {
  const isShowJumpNotice:boolean = getLocal('SHOW_JUMP_NOTICE', true)
  const baseStore = useBaseStore()
  baseStore.setShowJumpNotice(isShowJumpNotice)
})
</script>
