export type LinkItem = {
  id:string
  logo:string
  // 名称
  name:string
  // 链接地址
  href:string
  view:number
  star:number
  createTime:string
  // 描述
  desc:string
  // 创建用户主页
  creatorUrl:string
  // 创建用户
  creator:string
  linkGroup:string
  linkSubGroup:string
  //
  tags:string[]
}

export type LinkGroup = {
  id:string
  name:string
  // 子分组的 id
  subGroup:string
  navList:LinkItem[]
}


export type TagItem = {
  id:string
  name:string

}
