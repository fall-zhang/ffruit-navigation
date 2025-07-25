import { CreateCategoryDto } from '@/app/category/dto/create-category.dto'
import { CreateNavDto } from '@/app/nav/dto/create-nav.dto'


export interface FirefoxMarkItem {
  guid: string
  title: string
  index: number
  dateAdded: number,
  lastModified: number,
  id: number,
  // 1 书签 2 文件夹 3 分隔符
  typeCode: number,
  type: string //   'text/x-moz-place-container' | 'text/x-moz-place'
  uri?: string,
  root?: string,
  children?:FirefoxMarkItem[]
}

interface RichCreateNavDto extends CreateNavDto {
  parent:string[]
}
/**
 * 将 firefox 书签解析为导航列表
 */
export function firefoxBookmarkParse (bookmark:FirefoxMarkItem[], parent:string[] = []):RichCreateNavDto[] {
  let result:RichCreateNavDto[] = []
  bookmark.forEach(item => {
    // 文件夹中无内容
    if (item.type === 'text/x-moz-place-container' && !item.children) {
      return
    }
    if (item.type === 'text/x-moz-place-container' && item.children) {
      const list = firefoxBookmarkParse(item.children, [...parent, item.title])
      result = result.concat(list)
    } else {
      if (!item.uri) {
        return
      }
      const newInfo:RichCreateNavDto = {
        parent,
        createTime: new Date(item.dateAdded / 1000).toISOString(),
        auditTime: new Date(item.lastModified / 1000).toISOString(),
        href: item.uri,
        categoryId: '',
        name: item.title,
        desc: '',
        logo: '',
        authorName: 'root',
        authorUrl: 'root',
        tag: undefined,
        view: 0,
        star: 0,
        status: 1,
        accessState: 1
      }
      result.push(newInfo)
    }
  })
  return result
}

export function excludeUselessMark(originList:RichCreateNavDto[]) {
  return originList.filter(item => item.parent.includes('toolbar'))
}
/**
 * 获取 firefox 书签中的分组
 */
export const getMarkGroup = (markList:RichCreateNavDto[]):CreateCategoryDto[] => {
  const optList = excludeUselessMark(markList)

  const categoryList:CreateCategoryDto[] = []
  let id = 1
  const mapIdObj:Record<string, number> = {}
  optList.forEach(item => {
    if (item.parent.length > 0) {
      let parentName:string = ''
      item.parent.forEach(menuItem => {
        if (menuItem === 'toolbar') {
          return
        }
        if (mapIdObj[menuItem]) {
          parentName = menuItem
          return
        }
        mapIdObj[menuItem] = id
        categoryList.push({
          name: menuItem,
          id,
          createTime: (new Date()).toISOString(),
          icon: '',
          parentId: mapIdObj[parentName] || 0
        })
        id += 1
        parentName = menuItem
      })
    }
  })

  return categoryList
}
