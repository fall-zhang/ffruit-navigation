import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * 验证是否拥有权限
 */
@Injectable()
export class RulesGuard implements CanActivate {
  canActivate (
    context:ExecutionContext
  ):boolean|Promise<boolean>|Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    console.log('🚀 ~ AuthGuard ~ request:', request)
    // validateRequest(request)
    return true
  }
}
