import firefoxBookmark from './firefox-bookmarks'

interface FirefoxMarkItem {
  guid: string
  title: string
  index: number
  dateAdded: number,
  lastModified: number,
  id: number,
  // 1 书签 2 文件夹 3 分隔符
  typeCode: number,
  type: string //   'text/x-moz-place-container' | 'text/x-moz-place'
  root?: string,
  children?:FirefoxMarkItem[]
}

interface RichFireFox {
  guid: string
  title: string
  index: number
  id: number,
  // 1 书签 2 文件夹 3 分隔符
  typeCode: number,
  type: string //   'text/x-moz-place-container' | 'text/x-moz-place'
  root?: string,
  parent:string[]
  dateAdded: string | number,
  lastModified: string,
}

function firefoxBookmarkParse (bookmark:FirefoxMarkItem[], parent:string[] = []):RichFireFox[] {
  let result:RichFireFox[] = []
  bookmark.forEach(item => {
    // 文件夹中无内容
    if (item.type === 'text/x-moz-place-container' && !item.children) {
      return
    }
    if (item.type === 'text/x-moz-place-container' && item.children) {
      const list = firefoxBookmarkParse(item.children, [...parent, item.title])
      result = result.concat(list)
    } else {
      const newInfo:RichFireFox = {
        ...item,
        parent,
        dateAdded: new Date(item.dateAdded).toISOString(),
        lastModified: new Date(item.lastModified).toISOString()
      }
      result.push(newInfo)
    }
  })
  return result
}

const flatBookmark = firefoxBookmarkParse(firefoxBookmark.children)

const userMarkList = flatBookmark.filter(item => {
  if (item.parent.includes('Mozilla Firefox')) {
    return false
  }
  return true
})
// type UserMapGroup = Record<string, string | Record<string, string>>

const getMarkGroup = (markList:RichFireFox[]) => {
  const objTree:any = {}

  markList.forEach(item => {
    if (item.parent.length > 0) {
      let curObj = objTree
      item.parent.forEach(menuItem => {
        curObj[menuItem] = {}
        curObj = curObj[menuItem]
      })
    }
  })
  return objTree
}

const markGroupList = getMarkGroup(userMarkList)
console.log('markGroupList', markGroupList)

// database.push()
console.log('flatBookmark', flatBookmark.length)

