import axios from 'axios'
const navActionMixin = {
  data () {
    return {
      isStar: false
    }
  },
  methods: {
    async addNavView (navData = {}) {
      const { view, _id: id } = navData

      await axios.put('/api/nav', { id, view: view + 1 })

      const views = localStorage.get('VIEWS') || {}
      views[id] = view + 1
      localStorage.set('VIEWS', views)
    },
    handleNavClick (navData = {}) {
      const { href } = navData
      this.addNavView(navData)
      window.open(href, '_blank')
    },
    async handleNavStar (navData = {}, cb = () => {}) {
      let { star, _id: id } = navData

      const stars = localStorage.get('STARS') || {}
      if (stars[id]) return

      star++
      await axios.put('/api/nav', { id, star })
      cb()
      stars[id] = star
      localStorage.set('STARS', stars)
    }
  }
}

export default navActionMixin
