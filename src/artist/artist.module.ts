import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistResolver } from './graphql/resolvers/artist.resolver';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ArtistService, ArtistResolver],
  exports: [ArtistService]
})
export class ArtistModule {}
