import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from '@/decorators/isPublic.decorator';
import { GenreService } from '@/genre/genre.service';
import { GenreModel } from '../dto/genre.dto';

@Resolver(() => GenreModel)
export class GenreResolver {
  constructor( private genreService: GenreService ){}

  @Public()
  @Query(
    () => [GenreModel],
    { description: "Get All Genres List", nullable: true }
  )
  async getAllGenreList(): Promise<GenreModel[]> {
    return await this.genreService.getAllGenreList()
  }

  @Mutation(
    () => String,
    { description: "Set All Genres", nullable: true }
  )
  async setAllGenres(): Promise<void> {
    return await this.genreService.fillGenreList()
  }
}
