import { Injectable } from '@nestjs/common'

type HomePageInfo = {
  // 上月浏览量
  lastMonthView:number
  totalView:number
  // 用户总量
  userCount:number
  // 上月用户数量
  lastMonthNewUser:number
  // 活跃用户数量，登陆过三次以上
  activeUserCount:number
  // 收藏的书签数量
  bookmarkCount:number
}


@Injectable()
export class HomepageInfoService {
  getInfo():HomePageInfo {
    const result:HomePageInfo = {
      lastMonthView: 0,
      totalView: 0,
      userCount: 0,
      lastMonthNewUser: 0,
      activeUserCount: 0,
      bookmarkCount: 0
    }
    return result
  }
}
