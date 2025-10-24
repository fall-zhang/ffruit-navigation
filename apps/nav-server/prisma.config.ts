import path from 'node:path'
import { defineConfig } from 'prisma/config'
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'

const pgConnectString = process.env.DATABASE_POSTGRES_URL


export default defineConfig({
  schema: path.join('prisma'),
  experimental: {
    adapter: true
  },
  async adapter() {
    return new PrismaPg({
      DATABASE_POSTGRES_URL: pgConnectString
    })
  }
})
