import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { NavigateLink, NavSchema } from '../nav/schemas/nav.schema'

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [MongooseModule.forFeature([{ name: NavigateLink.name, schema: NavSchema }])]
})
export class TagModule {}
