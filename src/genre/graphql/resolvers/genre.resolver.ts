import { Query, Mutation, Resolver } from '@nestjs/graphql'
import Public from '@/decorators/isPublic.decorator'
import { GenreService } from '@/genre/genre.service'
import { GenreModel } from '../dto/genre.dto'

@Resolver(() => GenreModel)
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @Public()
  @Query(() => [GenreModel], {
    description: 'Get All Genres List',
  })
  async getAllGenreList(): Promise<GenreModel[]> {
    return await this.genreService.getAllGenreList()
  }

  @Mutation(() => Boolean, { description: 'Fill genres into db' })
  async fillGenresList(): Promise<boolean> {
    return await this.genreService.fillGenreList()
  }
}
