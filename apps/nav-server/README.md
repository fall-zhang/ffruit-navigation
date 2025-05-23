## 描述

该项目作为 less-process 的后端使用

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

- [ ] 分页查询

- [ ] 文件上传
- [ ] 文件下载