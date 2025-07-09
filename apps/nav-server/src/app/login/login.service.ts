import { Injectable } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { UpdateLoginDto } from './dto/update-login.dto'
import mongoose from 'mongoose'

@Injectable()
export class LoginService {
  async userLogin (createLoginDto: CreateLoginDto) {
    const userModule = mongoose.model('User')
    if (!userModule.findOne()) {
      // 没有管理员，默认设置一个
      await userModule.create({})
    } else {
      throw new Error('账号或密码错误')
    }
    const token = ''
    return 'Bearer ' + token
  }
}
