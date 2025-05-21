// 中间件，用于判断用户是否登录
import { Request, Response, NextFunction } from 'express'

export function logger (req: Request, res: Response, next: NextFunction) {
  next()
}
