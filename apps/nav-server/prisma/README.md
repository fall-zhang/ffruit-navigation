## Prisma 的使用

```bash
# 安装 prisma
npm install prisma
# 初始化当前项目（创建 prisma 文件夹以及内部的 schema.prisma 以及 .env 文件
npx prisma init

# Prisma Client 提供了类型安全，根据你的 Prisma 模型生成类型
npm install @prisma/client
# 初次安装时会自动执行 prisma generate，根据 prisma 生成 ts 类型
prisma generate

```

### 将当前数据格式提交到数据库

```bash
# 关系型数据库
pnpm prisma migrate dev

# mongo
pnpm prisma db push
```

### 初始化项目

```bash
pnpm prisma init
```

### 连接数据库

```bash
# 连接 postgresql
psql -h localhost -p 5432 -U fall -d myapp

```

## 必要知识

### schema

对应的 schema.prisma 文件 

datasource 表明你的 prisma 如何连接到数据库

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://john:password@localhost:5432/myAppDB?schema=public"
}
```

### generator

每个 schema 可以有多个 generator

generator 决定了当你运行 prisma generate 命令时，在哪里创建文件

```prisma
generator client {
  // 表明哪种 prisma client 被生成（当前仅 js 可用）
  provider = "prisma-client-js"
  // 定义输出位置
  output   = "./generated/prisma-client-js"
}
```