import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistResolver } from './graphql/resolvers/artist.resolver';

@Module({
  providers: [ArtistService, ArtistResolver]
})
export class ArtistModule {}
