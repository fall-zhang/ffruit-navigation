import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, Request } from 'express'

@Injectable()
export class ResHandlerMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: () =>void) {
    console.log('🚀 ~ ResHandlerMiddleware ~ use ~ any:', res.json)
    // console.log('🚀 ~ ', req)
    res.json({
      message: '请求成功',
      data: {

      },
      code: 200
    })
    next()
  }
}
