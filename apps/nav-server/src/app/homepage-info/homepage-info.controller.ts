import { Controller, Get } from '@nestjs/common'
import { HomepageInfoService } from './homepage-info.service'

@Controller('homepage-info')
export class HomepageInfoController {
  constructor(private readonly homepageInfoService: HomepageInfoService) {}

  @Get()
  findAll() {
    return this.homepageInfoService.getInfo()
  }
}
