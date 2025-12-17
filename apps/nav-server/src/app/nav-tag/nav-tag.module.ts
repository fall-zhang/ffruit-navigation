import { Module } from '@nestjs/common'
import { NavTagService } from './nav-tag.service'
import { NavTagController } from './nav-tag.controller'
import { PrismaService } from '@/prisma.service'

@Module({
  controllers: [NavTagController],
  providers: [NavTagService, PrismaService]
})
export class NavTagModule {}
