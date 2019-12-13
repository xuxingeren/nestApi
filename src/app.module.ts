import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PhotoModule } from './photo/photo.module';
import { Cors } from './middleware/index';
import { AuthModule } from './auth/auth.module';
import { ApiException } from './common/exceptions/api.exception';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: ApiException,
  }, {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
// export class AppModule {}
// 跨域中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Cors)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
