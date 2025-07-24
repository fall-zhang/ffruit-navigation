import { Injectable } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { UpdateLoginDto } from './dto/update-login.dto'

@Injectable()
export class LoginService {
  async userLogin (createLoginDto: CreateLoginDto) {
    const token = ''
    return 'Bearer ' + token
  }
}
