import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { PrismaService } from '@/prisma.service'

@Module({
  controllers: [TagController],
  providers: [TagService, PrismaService],
  imports: []
})
export class TagModule {}
