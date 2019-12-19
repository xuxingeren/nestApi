import { Controller, Get, Post, Body, Res, UsePipes } from '@nestjs/common';
import { User, Login, Register } from './interfaces/auth.interface';
import { registerJoi } from './interfaces/auth.joi';
import { AuthService } from './services/auth.service';
import { ValidatePipe } from '../pipes/validate.pipe';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('getUserInfo')
  async findUser(): Promise<User> {
    return await this.authService.findUser();
  }
  @Post('login')
  async login(@Body() login: Login, @Res() res: Response): Promise<void> {
    return await this.authService.login(res, login);
  }
  @Get('getRouteList')
  async getRouteList(): Promise<{}> {
    return await this.authService.getRouteList();
  }
  @Post('register')
  @UsePipes(new ValidatePipe(registerJoi))
  async register(@Body() register: Register): Promise<{}> {
    return await this.authService.register(register);
  }
  @Get('logout')
  async logout(@Res() res: Response): Promise<void> {
    return await this.authService.logout(res);
  }
}
