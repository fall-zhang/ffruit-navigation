import { Test, TestingModule } from '@nestjs/testing'
import { NavTagController } from './nav-tag.controller'
import { NavTagService } from './nav-tag.service'

describe('NavTagController', () => {
  let controller: NavTagController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavTagController],
      providers: [NavTagService]
    }).compile()

    controller = module.get<NavTagController>(NavTagController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
