import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiException } from '../common/exceptions/api.exception';

@Injectable()
export default class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          console.log('********************************');
          console.log('error:', err);
          console.log(`After-------------------------------------------------------`);
          return throwError(new ApiException(err.message, err.status));
        },
        ),
      );
  }
}
