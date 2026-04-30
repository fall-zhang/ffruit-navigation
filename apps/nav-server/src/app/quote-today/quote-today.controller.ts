import { Body, Controller, Get } from '@nestjs/common'
import { QuoteTodayService } from './quote-today.service'

@Controller('quote-today')
export class QuoteTodayController {
  constructor (private readonly quoteTodayService: QuoteTodayService) {}


  @Get()
  create () {
    return this.quoteTodayService.getToday()
  }
}
