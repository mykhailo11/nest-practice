import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from 'src/movie/entities/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      MovieEntity,
      MoviePosterEntity,
      ActorEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}
