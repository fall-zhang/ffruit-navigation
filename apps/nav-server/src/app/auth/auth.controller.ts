import { Controller, Get, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get('/authImg')
  getAuthCode (@Res() res:Response) {
    const authCode = this.authService.getAuthCode()
    const passCode = authCode.text
    res.type('image/svg+xml')
    res.send(authCode.data)
    // return authCode.data
  }
}
