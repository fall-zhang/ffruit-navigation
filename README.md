## 鲜果导航

一个新鲜，简约的，导航 + 起始页

我在互联网上收藏了很多资源内容，但苦于没有好的地方可以展示，可以方便的对收藏进行整理，进而方便地打开，因此开发该项目，将所有收藏统一整理，展示，作为起始页，方便我快速访问。

## 技术栈

一个 typescript 全栈项目，包括以下技术

- 客户端：nuxt，Vue，element-plus，+ tailwindcss(daisyUI)，实现 SSR
- 控制台：React + VueRouter + tailwindcss + shadcn
- 应用后端：nestjs + prisma + postgresql

## 项目结构

- bruno-api 使用 [bruno](github.com/usebruno/bruno) 开源软件使用该 API

- nav-admin 应用后端管理页面
  - 控制 tag
  - 控制所有导航
  - 控制所有建议
  - 控制 nav-page 所有相关数据
 
- nav-main 导航应用
  - 提供搜索跳转

- nav-server 后端服务
  - mongodb 数据库
  - 获取 tag 等信息

## 项目部署

一键部署为 docker 
一键部署为 github-pages

## 贡献和支持

开源不易，欢迎 star，赞助，或者

如果你想参与项目，那就尽管提 PR 吧，让我们保持新鲜。

