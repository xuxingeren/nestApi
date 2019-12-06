import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';
import { Request, Response } from 'express';
@Injectable()
export default class Cookie implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.originalUrl, 'x-access-token:' + req.cookies['x-access-token']);
    const token = req.cookies['x-access-token'];
    if (!token && req.originalUrl !== '/auth/login' && req.originalUrl !== '/auth/getRouteList') {
      throw new ApiException('请登录', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
