import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, MoviePoster } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MovieEntity } from './entities/movie.entity';
// import { In, Repository } from 'typeorm';
// import { MovieDto } from './dto/movie.dto';
// import { ActorEntity } from 'src/actor/entities/actor.entity';
// import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  public async findAll() {
    return await this.prismaService.movie.findMany({
        where: {
            isAvailable: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            title: true,
            actors: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
  }

  public async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
        where: {
            id
        },
        include: {
            actors: true,
            poster: true
        }
    });

    if (!movie || !movie.isAvailable) throw new NotFoundException('Movie is not found for the specified ID');

    return movie;
  }

  public async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;
    const actors = await this.prismaService.actor.findMany({
        where: {
            id: { in: actorIds }
        }
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Actors not found');

    let poster: MoviePoster | null = null;

    const movie = this.prismaService.movie.create({
      select: {
        id: true,
        title: true,
        rating: true,
        releaseYear: true,
        createdAt: true,
        updatedAt: true,
        isAvailable: true,
        description: true,
        genre: true,
        posterId: true,
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });
    return movie;
  }

//   public async update(id: string, dto: MovieDto): Promise<boolean> {
//     const movie = await this.findById(id);
//     Object.assign(movie, dto);
//     await this.movieRepository.save(movie);
//     return true;
//   }

//   public async delete(id: string): Promise<string> {
//     const movie = await this.findById(id);
//     await this.movieRepository.remove(movie);
//     return movie.id;
//   }
}
