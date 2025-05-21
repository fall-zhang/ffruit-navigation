import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // optional  如果没有连接，prisma 会在第一次调用数据库时连接
  async onModuleInit () {
    await this.$connect()
  }
}
