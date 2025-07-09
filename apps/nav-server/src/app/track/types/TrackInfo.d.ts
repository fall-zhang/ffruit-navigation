// - error 类型：错误
//   - js-error 代码片段给出的错误
//   - promise-error
// - warn 类型：警告
//   - js-warn 代码片段给出的警告


// - performance 性能
//   - FCP
//   - TTI

export type ErrorTrack = {
  programName: string, // 项目名称：前端监控系统
  pageName: string, // 项目名称：性能检测
  url: string // 'http://localhost:8080/#/performance', // 页面 URL
  timestamp: string, // 访问时间戳：'1590815288710'
  userAgent: string, // 用户浏览器类型：'Chrome'
  message: string, // 报错信息 'Uncaught TypeError: Cannot set property \'error\' of undefined'
  filename: string, // 访问的文件名 'http://localhost:8080/example.js'
  stack: string, // 堆栈信息 'btnClick (http://localhost:8080/:20:39)^HTMLInputElement.onclick (http://localhost:8080/:14:72)'
  selector: string, // 选择器 'HTML BODY #container .content INPUT'
  type: 'error' | 'warn' | 'info', // 类型，包括 error, warn
  subType: 'jsError' | 'promise-error', // 错误类型
  position: string, // 行列信息 '10:0'
  errorStack: Error
  // "errorType": "jsError", // 错误类型
}


export type PerformanceTrack = {
  programName: string // 前端监控系统
  type: 'performance'
  message: string // '渲染正常，渲染速度为 20ms',
  time: number // 渲染时长，单位为 毫秒 ms
  deviceInfo: {
    userAgent: string, // 用户浏览器类型
    system: string, // 用户主机信息
    screen: string, // 分辨率
    viewPoint: string, // document 可视分辨率
    CPU: string,
    GPU: string,
  },
  performanceInfo: {
    TTI: string
    FCP: string
  }
}
