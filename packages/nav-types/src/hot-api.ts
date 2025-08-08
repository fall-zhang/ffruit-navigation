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
