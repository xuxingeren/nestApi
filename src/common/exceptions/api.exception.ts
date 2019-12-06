import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: HttpStatus;

  constructor(errorMessage: string, errorCode: HttpStatus) {
    super(errorMessage, errorCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }
  getErrorCode(): HttpStatus {
    return this.errorCode;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
}
