<template>
  <div class="flex h-full w-full">
    <LeftNavMenus show :categories="category" :show-menu-type="showMenuType" @showMenus="toggleMenu2" />
    <div class="grow flex flex-col">
      <AppHeader @handleShowPopup="showPopup = true" @handleShowMenu="toggleMenu" />
      <router-view />
      <div class="grow"></div>
      <PageFooter></PageFooter>
    </div>
    <LinkJumpNotice/>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/home-page/head-section.vue'
import PageFooter from '@/components/home-page/page-footer.vue'
import LeftNavMenus from '@/components/home-page/nav-menu.vue'
import useBaseStore from '@/store'
import { isMobileSize } from '@/utils/utils'

defineOptions({
  name: 'default-layout'
})

function toggleMenu () {
  showMenuType.value = showMenuType.value === 'none' ? 'all' : 'none'
}
function toggleMenu2 () {
  showMenuType.value = showMenuType.value === 'all' ? 'half' : 'all'
}
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
  const isShowJumpNotice:boolean = getLocal('SHOW_JUMP_NOTICE', false)
  const baseStore = useBaseStore()
  baseStore.setShowJumpNotice(isShowJumpNotice)
})
</script>
