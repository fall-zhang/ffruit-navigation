<template>
  <div :style="{ marginLeft: contentMarginLeft }">
    <AppNavMenus :categorys="category" :show-menu-type="showMenuType" @showMenus="toggleMenu2" />
    <AppHeader @handleShowPopup="showPopup = true" @handleShowMenu="toggleMenu" />
    <router-view />
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppNavMenus from '@/components/AppNavMenus.vue'
import useBaseStore from '@/store'
import { isMobileSize } from '@/utils/utils'
export default {
  components: { AppHeader, AppNavMenus },
  data() {
    return {
      isCollapse: true,
      showPopup: false,
      showLog: false,
      // none, half, all
      showMenuType: 'half',
      category: [],
      isStar: false,
    }
  },
  computed: {
    sideBarWidth() {
      if (this.showMenuType == 'half') {
        return '70px'
      } else if (this.showMenuType == 'all') {
        return '220px'
      } else {
        return 0
      }
    },
    contentMarginLeft() {
      if (this.showMenuType == 'half') {
        return '70px'
      } else if (this.showMenuType == 'all') {
        if (isMobileSize()) {
          return 0
        } else {
          return '220px'
        }
      } else {
        return 0
      }
    },
  },
  methods: {
    async addNavView(navData = {}) {
      const { view, _id: id } = navData

      await axios.put('/api/nav', { id, view: view + 1 })

      const views = localStorage.get('VIEWS') || {}
      views[id] = view + 1
      localStorage.set('VIEWS', views)
    },
    handleNavClick(navData = {}) {
      const { href } = navData
      this.addNavView(navData)
      window.open(href, '_blank')
    },
    async handleNavStar(navData = {}, cb = () => { }) {
      let { star, _id: id } = navData

      const stars = localStorage.get('STARS') || {}
      if (stars[id]) return

      star++
      await axios.put('/api/nav', { id, star })
      cb()
      stars[id] = star
      localStorage.set('STARS', stars)
    },
    async findNav(id) {
      this.loading = true
      const { data } = await this.$api.findNav(id)
      this.data = data
      this.loading = false
    },
    async handleSubMenuClick(parentId, id) {
      await this.findNav(parentId)
    },
    toggleMenu() {
      this.showMenuType = this.showMenuType === 'none' ? 'all' : 'none'
    },
    toggleMenu2() {
      this.showMenuType = this.showMenuType === 'all' ? 'half' : 'all'
    },
    handleResize() {
      if (isMobileSize()) {
        this.showMenuType = 'none'
      } else {
        this.showMenuType = 'half'
      }
    }
  },

  mounted() {
    this.handleResize()
    window.onresize = throttle(this.handleResize.bind(this), 300)

    const store = useBaseStore()
    const localCategory = localStorage.getItem('category')
    const category = localCategory ? JSON.parse(localCategory) : []
    store.saveCategory(category)
    this.category = category
  }
}
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

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

p {
  margin: 0;
}

a[title="站长统计"] {
  display: none;
}
</style>
