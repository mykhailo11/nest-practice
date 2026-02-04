import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/review.dto';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
        private readonly movieService: MovieService
    ) {}


    async create(dto: ReviewDto): Promise<ReviewEntity> {
        const { text, rating, movieId } = dto;
        const movie = await this.movieService.findById(dto.movieId);
        const review = this.reviewRepository.create({
            text, rating, movie
        });
        return this.reviewRepository.save(review);
    }
}
