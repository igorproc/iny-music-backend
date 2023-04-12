import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistModel } from '../dto/artist.dto';
import { Public } from '@/decorators/isPublic.decorator';
import { ArtistService } from '@/artist/artist.service';
import { CreateArtistInput } from '../dto/create-artist.dto';
import { Artist } from '@prisma/client';
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"
import { FileUpload } from '@/dto/file-upload.dto';

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

  @Public()
  @Mutation(
    returns => ArtistModel,
    { description: "create an artist" }
  )
  async CreateArtistInput(
    @Args('artistInput', { type: () => CreateArtistInput }) artistData: CreateArtistInput,
    @Args('artistImage', { type: () => GraphQLUpload, nullable: true }) artistImage: FileUpload
  ): Promise<Artist> {
    return await this.artistService.createArtist(artistData, artistImage)
  }
}
