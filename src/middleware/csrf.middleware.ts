import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export default class Cors implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next();
  }
}
