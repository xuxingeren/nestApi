import { Controller, Get, Query, Response, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('get')
  getId(@Response() res, @Query() query) {
    if (query.id) {
      res.status(HttpStatus.OK).json({
        id: query.id,
        code: 200,
    });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        msg: 'id没有传过来',
        code: 500,
    });
    }
  }
  @Post('set')
  setData(@Response() res, @Body() body) {
    res.status(HttpStatus.OK).json({
      name: body.name,
      age: body.age,
      code: 200,
  });
  }
}
