import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_POSTGRES_URL}`

console.log('⚡️ line:6 ~ pgConnectString: ', connectionString)
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({ connectionString })
    super({ adapter })
  }

  // optional  如果没有连接，prisma 会在第一次调用数据库时连接
  async onModuleInit () {
    await this.$connect()
  }
}
