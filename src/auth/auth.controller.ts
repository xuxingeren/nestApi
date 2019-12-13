import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { User, Login, Register } from './interfaces/auth.interface';
import { AuthService } from './services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('getUserInfo')
  async findUser(): Promise<User> {
    return await this.authService.findUser();
  }
  @Post('login')
  async login(@Body() login: Login, @Res() res: Response): Promise<{}> {
    return await this.authService.login(res, login);
  }
  @Get('getRouteList')
  async getRouteList(): Promise<{}> {
    return await this.authService.getRouteList();
  }
  @Post('register')
  async register(@Body() register: Register): Promise<{}> {
    return await this.authService.register(register);
  }
}
