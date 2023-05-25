import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistModel } from '../dto/artist.dto';
import { Public } from '@/decorators/isPublic.decorator';
import { ArtistService } from '@/artist/artist.service';
import { CreateArtistInput } from '../dto/create-artist.dto';
import { Artist } from '@prisma/client';
@Resolver(() => ArtistModel)
export class ArtistResolver {
  constructor( private readonly artistService: ArtistService ){}

  @Public()
  @Mutation(
    () => ArtistModel,
    { description: "create an artist" }
  )
  async createArtist(
    @Args('artistInput', { type: () => CreateArtistInput }) artistData: CreateArtistInput,
  ): Promise<Artist> {
    return await this.artistService.createArtist(artistData)
  }
}
