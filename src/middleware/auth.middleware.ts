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
    const token: string = req.cookies['x-access-token'];
    const type = req.headers['resources-type'] as string;
    if (!token) {
      next();
      return;
    }
    const user = this.jwtService.decode(token) as Payload;
    if (user) {
      const redisToken: string = await getAsync(`${user.user}&${user.type}`);
      const redisUser = this.jwtService.decode(redisToken) as Payload;
      if ((redisToken === token || (redisUser && user.type !== redisUser.type)) && type === user.type) {
        req.user = user;
      }
    }
    next();
  }
}
