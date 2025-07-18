import { useDark } from '@vueuse/core'
import { defineStore } from 'pinia'

import { onMounted } from 'vue'
useDark()

type MenuInfo = {
  parentId:string
  id:string
}
type StateType = {
  isDarkMode:boolean,
  /**
   * 开启后，点击链接会提示用户注意安全
   */
  showJumpNotice:boolean
  category:MenuInfo[],
  selectedMenuParentId:string
  selectedMenuId:string
}
type StateEvent = {
  saveCategory(payload:MenuInfo[]):void
  saveSelectedId(payload:MenuInfo):void
}

// <'base-store', StateType, any, StateEvent>
const useBaseStore = defineStore('base-store', {
  state: ():StateType => ({
    isDarkMode: false,
    showJumpNotice: true,
    category: [],
    selectedMenuParentId: '',
    selectedMenuId: ''
  }),

  actions: {
    saveCategory (payload:MenuInfo[]) {
      localStorage.setItem('category', JSON.stringify(payload))
      this.category = payload
    },
    saveSelectedId (payload:MenuInfo) {
      this.selectedMenuParentId = payload?.parentId
      this.selectedMenuId = payload?.id
    },
    setShowJumpNotice(newVal:boolean) {
      this.showJumpNotice = newVal
    }
  }
})

export default useBaseStore
