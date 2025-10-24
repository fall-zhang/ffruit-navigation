import { IsNumber } from 'class-validator'

export class NavAddViewDto {
  @IsNumber()
  name:number

  href:number
  id:number
}
