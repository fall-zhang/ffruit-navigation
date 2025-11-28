import { Test, TestingModule } from '@nestjs/testing'
import { NavTagService } from './nav-tag.service'

describe('NavTagService', () => {
  let service: NavTagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NavTagService]
    }).compile()

    service = module.get<NavTagService>(NavTagService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
