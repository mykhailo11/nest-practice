import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @Post()
  // public create(@Body() dto: ReviewDto) {
  //   return this.reviewService.create(dto);
  // }
}
