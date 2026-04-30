import { Injectable } from '@nestjs/common'
import word from './data/data.json'
@Injectable()
export class QuoteTodayService {
  getToday ():string {
    const quoteLength = word.data.length

    const dateCount = getDaysBetween('2026-05-01', Date.now())
    const restDate = dateCount % quoteLength
    const dateQuote = word.data[restDate]
    if (dateQuote) {
      return dateQuote.text
    }
    return word.data[0].text
  }
}


function getDaysBetween (startDate:string | number | Date, endDate:number | Date):number {
  // 兼容字符串或 Date 对象
  const d1 = new Date(startDate)
  const d2 = new Date(endDate)

  // 使用 UTC 提取年月日，自动将时分秒归零，彻底避免夏令时/时区导致的 23/25 小时问题
  const start = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
  const end = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())

  // 计算差值并转为天数（结果为整数，正负表示先后顺序）
  return Math.round((end - start) / (1000 * 60 * 60 * 24))
}

// 📌 使用示例
// console.log(getDaysBetween('2023-10-01', '2023-10-05')) //  4
// console.log(getDaysBetween('2023-10-05', '2023-10-01')) // -4
