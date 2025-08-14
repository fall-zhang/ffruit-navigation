import { NavDataType } from 'nav-types'
export type LinkGroup = {
  id:string
  name:string
  // 子分组的 id
  subGroup:string
  navList:NavDataType[]
}


export type TagItem = {
  id:string
  name:string

}
