import { Test, TestingModule } from '@nestjs/testing'
import { HomepageInfoService } from './homepage-info.service'

describe('HomepageInfoService', () => {
  let service: HomepageInfoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomepageInfoService]
    }).compile()

    service = module.get<HomepageInfoService>(HomepageInfoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
