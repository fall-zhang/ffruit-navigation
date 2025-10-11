import { UsersService } from '@/app/users/users.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
type LoginRes = {
  data:any | null
  msg:string
  state:boolean
}
@Injectable()
export class AuthService {
  constructor(private usersService:UsersService) {

  }

  async signIn(username:string, pass:string):Promise<LoginRes> {
    const user = await this.usersService.findOne(username)
    if (!user) {
      return {
        msg: '用户不存在',
        data: null,
        state: false
      }
    }
    // if (user.password !== pass) {
    //   return {
    //     msg: '密码错误',
    //     data: null,
    //     state: false
    //   }
    // }

    return {
      msg: '登录成功',
      data: user,
      state: false
    }
  }
}
