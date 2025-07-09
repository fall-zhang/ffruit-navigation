
export class CreateTrackDto {
  programName:string
  pageName: string // 页面，模块名称
  url: string // 页面，应用 URL
  timeStamp: string // 错误的时间戳
  deviceInfo:{
    userAgent: 'Chrome', // 用户浏览器类型
    browserVersion: '110', // 用户浏览器版本
    system:'windows'
  } // 用户浏览器类型

  message: string // 错误详细信息
  loadedTime: string // 本次应用运行时间
  filename: string //  'http://localhost:8080/examples.js' 访问的文件名
  selector: string // 'HTML BODY #container .content INPUT' // 选择器
  type: 'error' | 'warn' | 'performance' // 类型，包括 error, warn, performance
  subType: string // 'jsError' // 错误类型
  position: string // '0:0' // 行列信息
  errorStack: any
}
