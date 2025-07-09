import { IsBoolean, IsDateString, IsIn, IsString } from 'class-validator'

export class CreateFeedbackDto {
  programName: string // '前端监控系统'
  @IsIn(['bug', 'feature'])
  type: 'bug' | 'feature' // feature

  @IsString()
  title: string // 问题

  // isHandled?:boolean //
  @IsDateString()
  submitTime:string // 时间戳

  handledTime:string // 时间戳
  describe: string // 鼠标放置在标题上会闪烁 用户浏览器类型
  deviceInfo: {
    userAgent: 'chrome' | 'firefox' | '', // 用户浏览器类型
    browserVersion: string, // 用户浏览器版本
    system: 'windows' | 'mac' | 'linux' // 用户使用系统
    systemArc: 'x86' | 'arm' // 用户使用系统
  } // 用户浏览器类型

  images:string[] // ["path/picture.png"]
  @IsBoolean()
  isHandled:boolean

  reportTime:string
  reportUser:string
  deviceName:string
}
