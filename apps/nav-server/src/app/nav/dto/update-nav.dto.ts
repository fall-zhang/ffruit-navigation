import { PartialType } from '@nestjs/mapped-types'
import { CreateNavDto } from './create-nav.dto'
import { IsIn, IsNumber } from 'class-validator'
import { LinkState } from '@/generated/prisma/enums'

export class UpdateNavDto extends PartialType(CreateNavDto) {
  @IsNumber()
  id:number

  @IsIn(['CHECK', 'REJECT', 'PASS'])
  status?: LinkState
}
