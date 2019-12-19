import { Injectable, Scope, Inject } from '@nestjs/common';
import { User, Login, Register } from '../interfaces/auth.interface';
import { rsaDecrypt } from '../../utils/encryption';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';
import { setAsync, delAsync, expireAsync } from '../../utils/redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) { }
  async findUser(): Promise<User> {
    try {
      const res = await this.authRepository.find();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    return {
      id: 1111,
      name: '小明',
      age: 18,
    };
  }
  async login(res: Response, login: Login): Promise<void> {
    const payload = {
      user: login.user,
      type: this.req.headers['resources-type'],
    };
    const token = this.jwtService.sign(payload);
    res.cookie('x-access-token', token, { expires: new Date(Date.now() + 120 * 60 * 1000), httpOnly: true });
    console.log(login.user, token);
    await setAsync(token, true);
    await expireAsync(token, 120 * 60);
    res.status(200).json({
      success: true,
      code: 200,
    });
  }
  async getRouteList(): Promise<{}> {
    return [{
      path: '/workbench',
      isLast: true,
      title: '工作台',
      id: 1,
      parentId: '',
      levelId: '1',
      icon: 'home',
    },
    {
      path: '/system',
      isLast: false,
      title: '系统管理',
      id: 2,
      parentId: '',
      levelId: '2',
      icon: 'setting',
    }, {
      path: '/system/hello',
      isLast: true,
      title: 'hello',
      id: 3,
      parentId: 2,
      levelId: '2-3',
      icon: 'heart',
    }];
  }
  async register(register: Register): Promise<{}> {
    console.log(rsaDecrypt(new Buffer(register.user, 'base64')).toString());
    return {};
  }
  async logout(res: Response): Promise<void> {
    const token = this.req.cookies['x-access-token'];
    if (token) {
      await delAsync(token);
    }
    res.clearCookie('x-access-token');
    res.status(200).json({
      success: true,
      code: 200,
    });
  }
}
