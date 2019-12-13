import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';
import { Observable } from 'rxjs';
import cfg from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['x-access-token'];
    if (!token && !cfg.nextUrl.includes(request.originalUrl)) {
      throw new ApiException('登录失效', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
