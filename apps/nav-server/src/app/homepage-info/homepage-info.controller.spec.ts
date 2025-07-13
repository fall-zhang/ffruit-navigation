import { Test, TestingModule } from '@nestjs/testing'
import { HomepageInfoController } from './homepage-info.controller'
import { HomepageInfoService } from './homepage-info.service'

describe('HomepageInfoController', () => {
  let controller: HomepageInfoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomepageInfoController],
      providers: [HomepageInfoService]
    }).compile()

    controller = module.get<HomepageInfoController>(HomepageInfoController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
