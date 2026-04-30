import { Test, TestingModule } from '@nestjs/testing'
import { QuoteTodayController } from './quote-today.controller'
import { QuoteTodayService } from './quote-today.service'

describe('QuoteTodayController', () => {
  let controller: QuoteTodayController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteTodayController],
      providers: [QuoteTodayService]
    }).compile()

    controller = module.get<QuoteTodayController>(QuoteTodayController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
