## 描述

鲜果导航的后端

## 环境配置

```bash
# 安装依赖
pnpm install

# 使用示例生成配置文件
copy .env.example .env

# 进入 docker 目录
cd docker
 
# 使用示例生成 docker-compose
copy docker-compose.example.yml docker-compose.yml

# 启动镜像
docker-compose up -d

# 使用 prisma 生成推送格式到数据库
# mongo
npx prisma db push
# 关系型数据库
pnpm prisma migrate dev
# 推送并命名
pnpm prisma migrate dev --name init
```

## 启动项目

```bash
# development
$ pnpm run start

# production mode
$ pnpm run start:prod
```

## 关于 prisma

prisma generate 生成新的类型文件

pnpm prisma-migrate 生成数据结构并发送到数据库

## nestjs 使用

```bash
# 创建新的 module，module 可以简写为 mo
nest g module [moduleName] # 其中 g 是 generate 的简写
# 创建新的 controller，可以简写为 co
nest g controller [moduleName]
# 创建新的 service，可以简写为 s
nest g service [moduleName]
# 创建新的 middleware，可以简写为 mi
nest g middleware [moduleName]
# 创建全部内容，可以选择生成不同风格的内容
nest g resource [name]
```


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Prisma

每次更改 `.prisma` 文件后，都需要运行 prisma generate 用来生成库里面的内容，之后就可以进行 crud 了 

## 待办项

后端常见场景

- 何将返回数据进行统一包装
- 包含 message，data，code 三个属性

- [ ] 将 firefox 的书签文件转换为 group 分组，以及 link 链接
- [ ] 分组支持排序功能，权重高的在前面 0 - 9999
- [ ] 分组支持 parent 字段，确定父组
- [ ] 定时（每周一早上三点）对网页进行爬取，确保网页还可以访问，并且更新网页的状态
- [x] 分页查询
- [x] 文件上传
- [ ] 文件下载
- [ ] 将网址列表作为一个库，用户点击更新，或者没有库的时候才进行网址库的拉取，否则为用户自定义库
  - [ ] 推荐的网页大小控制在 50k 以内
  - [ ] 添加到 favorite 中的网址会最终打包到该库内
- [ ] 监听 schema.prisma 文件的更改，自动执行， prisma generate