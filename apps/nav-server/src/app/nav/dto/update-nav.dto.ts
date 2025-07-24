import { PartialType } from '@nestjs/mapped-types'
import { CreateNavDto } from './create-nav.dto'
import { IsNumber } from 'class-validator'

export class UpdateNavDto extends PartialType(CreateNavDto) {
  @IsNumber()
  id:number
}
