import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  // nest提供的跨域设置
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
      // if ([].indexOf(origin) !== -1 || !origin) {
      //   callback(null, true);
      // } else {
      //   callback(new Error('Not allowed by CORS'));
      // }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'resources-type'],
    maxAge: 1728000,
    credentials: true,
    optionsSuccessStatus: 204,
  });
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
