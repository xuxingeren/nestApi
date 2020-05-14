import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';
import { Request, Response } from 'express';
import cfg from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    if (request.user || cfg.nextUrl.includes(request.originalUrl)) {
      return true;
    } else {
      response.clearCookie('x-access-token');
      throw new ApiException('登录失效', HttpStatus.UNAUTHORIZED);
    }
  }
}
