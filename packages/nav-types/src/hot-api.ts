// Daily hot api 返回的接口格式

// 榜单数据
export interface ListItem {
  id: number | string;
  title: string;
  cover?: string;
  author?: string;
  desc?: string;
  hot: number | undefined;
  timestamp: number | undefined;
  url: string;
  mobileUrl: string;
}

// 路由接口数据
export interface HotApiResType {
  updateTime: string | number;
  fromCache: boolean;
  data: ListItem[];
  message?: string;
}

/**
 * hot api 支持的 path
 */
export type HotAPIType = '36kr' |
'52pojie' |
'baidu' |
'bilibili' |
'douban-movie' |
'douyin' |
'github' |
'guokr' |
'hackernews' |
'history' | // 历史上的今天
'hupu' |
'huxiu' |
'ithome' | // IT 之家
'juejin' |
'kuaishou' |
'qq-news' | // 腾讯新闻
'linuxdo' | // Linux 技术社区热搜
'smzdm' | // 什么值得买
'sspai' | // 少数派
'thepaper' | // 澎湃
'tieba' |
'toutiao' |
'v2ex' |
'weibo' |
'weread' | // 微信读书
'zhihu' // 知乎

/**
 * Hot api 的单项内容
 */
export type HotApiItem = {
  path:HotAPIType
  name:string
}
// 2E40DA80-B958-49C1-BE1F-FD31002C8574

export function getApiTitle(type:HotAPIType) {
  switch (type) {
    case '36kr':
      return '36 氪'
    case '52pojie':
    case 'baidu':
    case 'bilibili':
      return 'BiliBili'
    case 'douban-movie':
    case 'douyin':
      return '抖音'
    case 'github':
    case 'guokr':
    case 'hackernews':
    case 'history':
    case 'hupu':
    case 'huxiu':
    case 'ithome':
      return 'IT 之家'
    case 'juejin':
    case 'kuaishou':
    case 'qq-news':
    case 'linuxdo':
    case 'smzdm':
    case 'sspai':
    case 'thepaper':
    case 'tieba':
    case 'toutiao':
    case 'v2ex':
    case 'weibo':
    case 'weread':
    case 'zhihu':
  }
  return ''
}
