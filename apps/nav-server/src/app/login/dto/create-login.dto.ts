import { IsString, Length } from 'class-validator'

export class CreateLoginDto {
  @Length(5, 20)
  @IsString()
  userName:string

  @IsString()
  password:string
}
