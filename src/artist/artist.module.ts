import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistResolver } from './graphql/resolvers/artist.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { FileManagerModule } from '@/file-manager/file-manager.module';

@Module({
  imports: [PrismaModule, FileManagerModule],
  providers: [ArtistService, ArtistResolver],
  exports: [ArtistService]
})
export class ArtistModule {}
