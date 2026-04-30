import { Module } from '@nestjs/common'
import { QuoteTodayService } from './quote-today.service'
import { QuoteTodayController } from './quote-today.controller'

@Module({
  controllers: [QuoteTodayController],
  providers: [QuoteTodayService]
})
export class QuoteTodayModule {}
