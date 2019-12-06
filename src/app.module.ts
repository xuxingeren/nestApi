import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PhotoModule } from './photo/photo.module';
import { Cors, Cookie } from './middleware/index';
import { AuthModule } from './auth/auth.module';
import { ApiException } from './common/exceptions/api.exception';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: ApiException,
  }],
})
// export class AppModule {}
// 跨域中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Cors)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(Cookie)
      .forRoutes({ path: '*', method: RequestMethod.ALL});
  }
}
