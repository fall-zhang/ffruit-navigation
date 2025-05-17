import {defineStore} from 'pinia'

const useBaseStore = defineStore('base-store',{
  state:()=> ({
    category: [],
    selectedMenuParentId: '',        
    seletedMenuId: '',
  }),

  actions: {
    saveCategory( payload:any) {
      localStorage.setItem('category', JSON.stringify(payload))
      this.category = payload
    },
    saveSeletedId(payload:any) {
      this.selectedMenuParentId = payload?.parentId
      this.seletedMenuId = payload?.id
    }
  }
})


// 需要返回一个函数
export default useBaseStore


/* text-overflow($line) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line;
}
 */