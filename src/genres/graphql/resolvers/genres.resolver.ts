import { GenreModel } from "@/genre/graphql/dto/genre.dto";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { DeclarateGenreModel } from "../dto/create-genre.dto";
import { GenresService } from "@/genres/genres.service";
import { Public } from "@/decorators/isPublic.decorator";

@Resolver(() => GenreModel)
export class GenresResolver {
  constructor(private genresService: GenresService){}

  @Public()
  @Mutation(() => String, { description: "Declarate genres for current music", nullable: true })
  async declarateGenresInput(
    @Args('newGenresInput', { type: () => DeclarateGenreModel })
    genresData: DeclarateGenreModel
  ): Promise<void> {
    return await this.genresService.declarateMusicGenre(genresData)
  }
}