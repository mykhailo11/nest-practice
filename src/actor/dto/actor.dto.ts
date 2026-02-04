import { IsNotEmpty, IsString } from "class-validator";

export class ActorDto {
    @IsString()
    @IsNotEmpty()
    name: string
}