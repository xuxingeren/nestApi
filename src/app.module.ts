import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { CatsController } from './cats/cats.controller';

// import { Cors } from './cors.middleware';

@Module({
  imports: [PhotoModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
// 跨域中间件
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(Cors)
//       .forRoutes({ path: 'fetch', method: RequestMethod.ALL });
//   }
// }
