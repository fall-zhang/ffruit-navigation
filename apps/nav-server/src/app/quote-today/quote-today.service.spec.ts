import { Test, TestingModule } from '@nestjs/testing'
import { QuoteTodayService } from './quote-today.service'

describe('QuoteTodayService', () => {
  let service: QuoteTodayService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteTodayService]
    }).compile()

    service = module.get<QuoteTodayService>(QuoteTodayService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
