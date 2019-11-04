import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  finally(): string {
    return 'cats';
  }
}
