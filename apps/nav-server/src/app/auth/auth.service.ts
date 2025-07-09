import { Injectable } from '@nestjs/common'
import { create as createAuthSvg } from 'svg-captcha'
@Injectable()
export class AuthService {
  getAuthCode () {
    return createAuthSvg({
      size: 4,
      fontSize: 26,
      width: 100,
      height: 34,
      background: '#ccee24'
    })
  }
}
