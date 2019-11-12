import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Cors implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const origin = req.get('Origin');
    console.log(origin);
    if (origin !== undefined) {
      res.set({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
      });
      // 判断是不是预检请求
      if (req.method === 'OPTIONS') {
        res.set({
          'Access-Control-Allow-Headers':
          `resources-type,xuxin-auth,
          DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization`,
          'Content-Type': 'text/plain;charset=UTF-8',
          'Access-Control-Max-Age': 1728000,
          'Content-Length': 0,
        });
        res.status(204).end();
        return;
      }
    }
    next();
  }
}
