import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  public createActor(@Body() dto: ActorDto) {
    return this.actorService.create(dto);
  }
}
