import { Injectable } from '@nestjs/common';
import { User, Login } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  async findUser(): Promise<User> {
    return {
      id: 1111,
      name: '小明',
      age: 18,
    };
  }
  async login(login: Login): Promise<{}> {
    console.log(login);
    return {
      success: true,
      code: 200,
      message: 'asdfasdf',
    };
  }
  async getRouteList(): Promise<{}> {
    return {
      success: true,
      code: 200,
      data: [{
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
      }],
    };
  }
}
