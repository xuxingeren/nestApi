import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';
import cfg from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user || cfg.nextUrl.includes(request.originalUrl)) {
      return true;
    } else {
      throw new ApiException('登录失效', HttpStatus.UNAUTHORIZED);
    }
  }
}
