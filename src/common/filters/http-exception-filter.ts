import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from '../exceptions/api.exception';

@Catch(ApiException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response
      .status(status)
      .json({
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
        date: new Date().toLocaleString(),
        path: request.url,
      });
  }

}
