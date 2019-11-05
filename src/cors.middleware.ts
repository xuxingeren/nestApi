import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Cors implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const origin = req.get('Origin');
    console.log(origin);
    // 判断是不是来自跨域的请求
    if (origin !== undefined) {
      res.set({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      });
      // 判断是不是预检请求
      if (req.method === 'OPTIONS') {
        res.set({
          'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
        });
        res.status(204).end();
        return;
      }
    }
    next();
  }
}
