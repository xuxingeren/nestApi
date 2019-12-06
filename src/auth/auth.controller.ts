import { Controller, Get, Post, Body } from '@nestjs/common';
import { User, Login } from './interfaces/auth.interface';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('getUserInfo')
  async findUser(): Promise<User> {
    return await this.authService.findUser();
  }
  @Post('login')
  async login(@Body() login: Login): Promise<{}> {
    return await this.authService.login(login);
  }
  @Get('getRouteList')
  async getRouteList(): Promise<{}> {
    return await this.authService.getRouteList();
  }
}
