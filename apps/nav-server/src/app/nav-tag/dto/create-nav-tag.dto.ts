import { IsNotEmpty } from 'class-validator'

export class CreateNavTagDto {
  @IsNotEmpty()
  name:string
}
