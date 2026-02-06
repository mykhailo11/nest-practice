import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller({
  path: 'movies',
  // host: ['api.mtcinema.com']
})
export class MovieController {
  constructor(
    private readonly movieService: MovieService
  ) {}

  @Get()
  public findAll(@Query() query: any) {
    const { genre } = query;
    return genre ? `Films in ${genre} genre` : [
      {
        title: 'One'
      },
      {
        title: 'Two'
      }
    ]
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return `Film with '${body.title}' was created`
  }

  @Get('headers')
  public getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('user-agent')
  public getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  @Get('request')
  public getRequestDetails(@Req() request: Request) {
    return {
      method: request.method,
      url: request.url,
      headers: request.headers,
      query: request.query,
      params: request.params
    };
  }

  @Get('response')
  public getResponseDetails(@Res() response: Response) {
    response.status(201).json({ message: 'Hello' });
  }

  @Get('all')
  public findAllMovies() {
    return this.movieService.findAll();
  }

  @Get(':id')
  public findByIdMovie(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @Post('create')
  public createMovie(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  // @Put('update/:id')
  // public updateMovie(@Param('id') id: string, @Body() dto: MovieDto) {
  //   return this.movieService.update(id, dto);
  // }

  // @Delete(':id')
  // public deleteMovie(@Param('id') id: string) {
  //   return this.movieService.delete(id);
  // }
}
