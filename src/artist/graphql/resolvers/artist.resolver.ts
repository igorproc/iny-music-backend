import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ArtistModel } from '../dto/artist.dto';
import { Public } from '@/decorators/isPublic.decorator';
import { ArtistService } from '@/artist/artist.service';

@Resolver(of => ArtistModel)
export class ArtistResolver {
  constructor( private readonly artistService: ArtistService ){}

  @Public()
  @Query(
    returns => ArtistModel,
    { description: "return artist data by artistId" }
  )
  async getAtristById(
    @Args('atristId', { type: () => Int }) atristId: number
  ): Promise<ArtistModel> {
    return await this.artistService.getAtrist(atristId)
  }
}
