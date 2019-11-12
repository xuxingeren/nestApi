import { Controller, Get, Query, Response, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';

@Controller('fetch')
export class CatsController {
  @Get('getUserInfo')
  getId(@Response() res, @Query() query) {
    if (query.id) {
      res.status(HttpStatus.OK).json({
        id: query.id,
        code: 200,
    });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        msg: 'id没有传过来',
        code: 500,
    });
    }
  }
  @Post('login')
  setData(@Response() res, @Body() body) {
    console.log(body);
    res.status(HttpStatus.OK).json({
      user: body.user || 'test',
      password: body.password || 'password',
      code: 200,
  });
  }
}
