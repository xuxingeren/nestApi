import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Cors implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    return (...args: any[]) => {
      const origin = req.get('Origin');
      // 判断是不是来自跨域的请求
      if (origin !== undefined) {
        res.set({
          'Access-Control-Allow-Origin': origin,
        });
        // 判断是不是预检请求
        if (req.method === 'OPTIONS') {
          res.set({
            'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          });
          res.status(204).end();
          return;
        }
      }
      next();
    };
  }
}

// @Middleware()
// export class Cors implements NestMiddleware {
//   resolve(): (req, res, next) => void {
//     return (req, res, next) => {
//       const origin = req.get('Origin');
//       // 判断是不是来自跨域的请求
//       if (origin !== undefined) {
//         res.set({
//           'Access-Control-Allow-Origin': origin,
//         });
//         // 判断是不是预检请求
//         if (req.method === 'OPTIONS') {
//           res.set({
//             'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
//             'Access-Control-Allow-Headers': 'Content-Type',
//           });
//           res.status(204).end();
//           return;
//         }
//       }
//       next();
//     };
//   }
// }
