import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';
// import * as helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
import { AuthGuard } from './auth/auth.guard';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(helmet());
  app.use(cookieParser());
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(csurf());
  // nest提供的跨域设置
  // app.enableCors({
  //   origin: true,
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'， 'resources-type', 'xuxin-auth'],
  //   credentials: true,
  // });
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
