import { Module } from '@nestjs/common'
import { NavService } from './nav.service'
import { NavController } from './nav.controller'
import { ListModule } from './list/list.module'

@Module({
  controllers: [NavController],
  providers: [NavService],
  imports: [ListModule],
})
export class NavModule {}
