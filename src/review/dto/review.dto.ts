import { IsNumber, IsString, IsUUID, Max, Min } from "class-validator"

export class ReviewDto {
    @IsString()
    text: string
    @IsNumber()
    @Max(10)
    @Min(0)
    rating: number
    @IsUUID()
    movieId: string
}