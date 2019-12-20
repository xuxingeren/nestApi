import { Injectable, Scope, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { User, Login, Register } from '../interfaces/auth.interface';
import { rsaEncrypt, rsaDecrypt } from '../../utils/encryption';
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
      const res = await this.authRepository.findOne({ user: '17783267847' });
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
    try {
      const authData = await this.authRepository.findOne({ user: login.user });
      const password = rsaDecrypt(new Buffer(authData.password, 'base64')).toString();
      if (password === login.password) {
        const payload = {
          uid: authData.uid,
          user: authData.user,
          type: this.req.headers['resources-type'],
        };
        const token = this.jwtService.sign(payload);
        res.cookie('x-access-token', token, { expires: new Date(Date.now() + 120 * 60 * 1000), httpOnly: true });
        await setAsync(token, true);
        await expireAsync(token, 120 * 60);
        res.status(200).json({
          success: true,
          code: 200,
        });
      } else {
        throw new Error('账号或密码错误');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
    try {
      const authData = await this.authRepository.findOne({ user: register.user });
      if (authData) {
        throw new Error('用户已存在');
      } else {
        const auth = new Auth();
        auth.user = register.user;
        auth.password = rsaEncrypt(register.password).toString('base64');
        auth.create_time = new Date();
        await this.authRepository.save(auth);
        return {};
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
