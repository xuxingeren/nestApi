import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';
import cfg from '../config';
import { getAsync } from '../utils/redis';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['x-access-token'];
    if (!cfg.nextUrl.includes(request.originalUrl)) {
      if (!token) {
        throw new ApiException('登录失效', HttpStatus.UNAUTHORIZED);
      } else {
        const haveToken = await getAsync(token);
        if (haveToken) {
          return true;
        } else {
          throw new ApiException('登录失效', HttpStatus.UNAUTHORIZED);
        }
      }
    } else {
      return true;
    }
  }
}
