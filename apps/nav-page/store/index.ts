import { defineStore } from 'pinia'

type MenuInfo = {
  parentId:string
  id:string
}
type StateType = {
  category:MenuInfo[],
  selectedMenuParentId:string
  selectedMenuId:string
}

type StateEvent = {
  saveCategory(payload:MenuInfo[]):void
  saveSelectedId(payload:MenuInfo):void
}

const useBaseStore = defineStore<'base-store', StateType, any, StateEvent>('base-store', {
  state: () => ({
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
    }
  }
})


export default useBaseStore
