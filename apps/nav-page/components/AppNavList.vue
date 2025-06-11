<template>
  <div>
    <el-row class="website" :gutter="20">
      <AppNavItem v-for="item in list" :data="item" :key="item._id" @handleNavClick="handleNavClick"
        @handleNavStar="handleNavStar" />
    </el-row>
  </div>
</template>

<script lang="ts">
import AppNavItem from './AppNavItem.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppNavList',
  components: {
    AppNavItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isStar: false,
    }
  },
  methods: {
    async addNavView(navData = {}) {
      const { href, view, _id: id } = navData

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
      const { star, _id: id } = navData

      const stars = localStorage.get('STARS') || {}
      if (stars[id]) return

      star++
      await axios.put('/api/nav', { id, star })
      cb()
      stars[id] = star
      localStorage.set('STARS', stars)
    }
  }
})
</script>

<style lang="scss" scoped>
.website {}
</style>
