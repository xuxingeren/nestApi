import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ApiException } from './common/exceptions/api.exception';
import { LoggingInterceptor, TransformInterceptor, ErrorsInterceptor } from './interceptor';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`,
  }), AuthModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: ApiException,
  }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    }, {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
