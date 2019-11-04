import { Controller, Get, Query, Response, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';

@Controller('fetch')
export class CatsController {
  @Get('getInfo')
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
  @Post('login')
  setData(@Response() res, @Body() body) {
    res.status(HttpStatus.OK).json({
      user: body.user || 'test',
      password: body.password || 'password',
      code: 200,
  });
  }
}
