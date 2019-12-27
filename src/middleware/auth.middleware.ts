import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { AddUserRequest } from '../interfaces';
import { JwtService } from '@nestjs/jwt';
import { getAsync } from '../utils/redis';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }
  async use(req: AddUserRequest, res: Response, next: () => void) {
    const token = req.cookies['x-access-token'];
    if (!token) {
      next();
      return;
    }
    const haveToken = await getAsync(token);
    if (haveToken) {
      const user = this.jwtService.decode(token);
      req.user = user;
    }
    next();
  }
}
