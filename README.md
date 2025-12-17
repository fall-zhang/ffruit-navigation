## 鲜果导航

一个新鲜，简约的，导航 + 起始页

我在互联网上收藏了很多资源内容，但苦于没有好的地方可以，以及对收藏进行整理，展示分享，方便打开以及使用。

因此该项目的目标在于，网站收藏统一整理，展示并分类，作为起始页，方便快速访问。

## 技术栈

一个 typescript 全栈项目，包括以下技术

- 客户端：nuxt，Vue，element-plus，+ tailwindcss(daisyUI)，实现 SSR
- 控制台：React + VueRouter + tailwindcss + shadcn
- 应用后端：nestjs + prisma + postgresql

## 项目结构

- bruno-api 使用 [bruno](github.com/usebruno/bruno) 管理 API 文档
- nav-admin 应用后端管理页面
  - 对数据库的内容进行 CRUD
  - 登录模块
- nav-main 导航应用
  - 提供搜索跳转
- nav-server 后端服务
  - postgresql 数据库
  - 用户登录

## 项目部署

一键 docker 部署

## 贡献和支持

开源不易，欢迎 star，赞助，或者 pull request，让项目保持新鲜。