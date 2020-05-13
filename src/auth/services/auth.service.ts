import { Injectable, Scope, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { User, Login, Register, Payload } from '../interfaces/auth.interface';
import { rsaEncrypt, rsaDecrypt } from '../../utils/encryption';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Response } from 'express';
import { AddUserRequest } from '../../interfaces';
import { setAsync, delAsync, expireAsync } from '../../utils/redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST) private readonly req: AddUserRequest,
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) { }
  async findUser(): Promise<User> {
    try {
      const { uid } = this.req.user as Payload;
      const res = await this.authRepository.findOne({ uid });
      return {
        uid: res.uid,
        user: res.user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async login(res: Response, login: Login): Promise<void> {
    try {
      const authData = await this.authRepository.findOne({ user: login.user });
      if (!authData) {
        throw new Error('账号或密码错误');
      }
      const password = rsaDecrypt(Buffer.from(authData.password, 'base64')).toString();
      if (password === login.password) {
        const payload: Payload = {
          uid: authData.uid,
          user: authData.user,
          type: this.req.headers['resources-type'],
          loginDate: Date.now(),
        };
        const token = await this.signToken(authData.uid, payload);
        res.cookie('x-access-token', token, { expires: new Date(Date.now() + 120 * 60 * 1000), httpOnly: true });
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
      menus: true,
      ancestorsId: 1,
      parentId: '',
      level: 1,
      icon: 'home',
    },
    {
      path: '/system',
      isLast: false,
      title: '系统管理',
      id: 2,
      menus: true,
      ancestorsId: 2,
      parentId: '',
      level: 1,
      icon: 'setting',
    }, {
      path: '/system/role',
      isLast: true,
      title: '角色管理',
      id: 3,
      menus: true,
      ancestorsId: 2,
      parentId: 2,
      level: 2,
      icon: 'user',
    }, {
      path: '/system/role_details',
      isLast: true,
      title: '角色设置',
      id: 4,
      menus: false,
      ancestorsId: 2,
      parentId: 3,
      level: 3,
      icon: 'user',
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
    const { uid } = this.req.user as Payload;
    await delAsync(uid);
    res.clearCookie('x-access-token');
    res.status(200).json({
      success: true,
      code: 200,
    });
  }
  async signToken(uid: number, payload: Payload): Promise<string> {
    const token = this.jwtService.sign(payload);
    await setAsync(uid, token);
    await expireAsync(uid, 120 * 60);
    return token;
  }
}
