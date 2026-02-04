import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'actors' })
export class ActorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string;

    @ManyToMany(() => MovieEntity, movie => movie.actors)
    movies: MovieEntity[]

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

}