## 用户行为追踪

应用自行对于前端错误上报

数据结构
### 错误上报

```jsonc
// 前端错误 - 脚本
{
  "programName": "前端监控系统", // 项目名称
  "pageName": "性能检测", // 页面，模块名称
  "url": "http://localhost:8080/#/performance", // 页面 URL
  "timestamp": "1590815288710", // 访问时间戳
  "deviceInfo":{
    "userAgent": "Chrome", // 用户浏览器类型
    "system":"windows"
  }, // 用户浏览器类型
  "message": "Uncaught TypeError: Cannot set property 'error' of undefined", // 类型详情
  "filename": "http://localhost:8080/example.js", // 访问的文件名
  "selector": "HTML BODY #container .content INPUT", // 选择器
  "type": "error", // 类型，包括 error, warn, performance
  "subType": "jsError", // 错误类型 
  "position": "0:0", // 行列信息
  "errorStack": {}
  // "errorType": "jsError", // 错误类型
}

// 前端错误 - 异步请求
{
  "subType": "promiseError", // 错误类型 
  "message": "someVar is not defined", // 类型详情
  "queryParam": { // 请求的接口名称
  }, 
}
```


### 性能指标上报

```jsonc
// 前端性能指标
// 在用户五秒没操作后发送请求
{
  "programName": "前端监控系统",
  "type": "performance",
  "subType": "FCP",
  "message": "someVar is not defined",
  "userAgent": "Chrome", // 用户浏览器类型
  "deviceInfo":{
    "CPU":"",
    "GPU":"",
  },
}

```

### 类型汇总

错误类型以及子类型汇总

- error 类型：错误
  - js-error 代码片段给出的错误
  - promise-error
- warn 类型：警告
  - js-warn 代码片段给出的警告
- performance 性能
  - FCP
  - TTI

### 参考文章

