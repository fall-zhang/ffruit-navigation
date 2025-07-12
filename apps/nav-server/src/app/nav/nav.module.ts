import { Module } from '@nestjs/common'
import { NavService } from './nav.service'
import { NavController } from './nav.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { NavigateLink, NavSchema } from './schemas/nav.schema'

@Module({
  controllers: [NavController],
  providers: [NavService],
  imports: [
    // ListModule
    // MongooseModule.forFeature([{ name: NavigateLink.name, schema: NavSchema }])
  ],
  exports: []
})
export class NavModule {}
