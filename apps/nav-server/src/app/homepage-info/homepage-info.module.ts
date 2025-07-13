import { Module } from '@nestjs/common'
import { HomepageInfoService } from './homepage-info.service'
import { HomepageInfoController } from './homepage-info.controller'

@Module({
  controllers: [HomepageInfoController],
  providers: [HomepageInfoService]
})
export class HomepageInfoModule {}
