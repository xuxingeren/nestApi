import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before---------------------------------------------------');
    const request = context.switchToHttp().getRequest();
    const Request = {
      host: request.headers.host,
      originalUrl: request.originalUrl,
      method: request.method,
      cookies: request.cookies,
      body: request.body,
      params: request.params,
    };
    console.log('Request:', Request);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After: ${Date.now() - now}ms-------------------------------------------------------`)),
      );
  }
}
