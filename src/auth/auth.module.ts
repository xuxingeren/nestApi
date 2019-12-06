import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
