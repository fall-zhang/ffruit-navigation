## 用户反馈

- 错误上报

用户主动对于错误进行上报的功能（够通用）

### 用户信息

```jsonc
// 前端性能指标
// 在用户五秒没操作后发送请求
{
  "programName": "前端监控系统",
  "type": "bug", // feature
  "title": "标题闪烁",
  "time":"2024",
  "isHandled":false,
  "handledTime":"",
  "describe": "鼠标放置在标题上会闪烁", // 用户浏览器类型
  "images":["path/picture.png"]
}
```