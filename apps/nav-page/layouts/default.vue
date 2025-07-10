<template>
  <div class="flex h-full w-full">
    <LeftNavMenus show :categories="category" :show-menu-type="showMenuType" @showMenus="toggleMenu2" />
    <div class="grow">
      <AppHeader @handleShowPopup="showPopup = true" @handleShowMenu="toggleMenu" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/home-page/head-section.vue'
import LeftNavMenus from '@/components/home-page/nav-menu.vue'
import useBaseStore from '@/store'
import { isMobileSize } from '@/utils/utils'
import 'element-plus/theme-chalk/dark/css-vars.css'

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
</script>

<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

a[title="站长统计"] {
  display: none;
}
</style>
