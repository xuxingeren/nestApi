import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { AddUserRequest } from '../interfaces';
import { JwtService } from '@nestjs/jwt';
import { getAsync } from '../utils/redis';
import { Payload } from '../auth/interfaces/auth.interface';
@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }
  async use(req: AddUserRequest, res: Response, next: () => void) {
    const token = req.cookies['x-access-token'];
    if (!token) {
      next();
      return;
    }
    const user = this.jwtService.decode(token) as Payload;
    if (user) {
      const redisToken = await getAsync(user.uid);
      const redisUser = this.jwtService.decode(redisToken) as Payload;
      if (redisToken === token || user.type !== redisUser.type) {
        req.user = user;
      }
    }
    next();
  }
}
