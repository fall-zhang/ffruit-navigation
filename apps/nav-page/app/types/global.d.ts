import { NavDataType } from 'nav-types'
export type LinkGroup = {
  id:string
  name:string
  // 子分组的 id
  parent:string | number
  navList:NavDataType[]
}


export type TagItem = {
  id:string
  name:string

}
