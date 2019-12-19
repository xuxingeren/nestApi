import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  constructor(private readonly schema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new ApiException(error.details[0].message, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
