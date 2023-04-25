import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { GenresModule } from '@/genres/genres.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { SongResolver } from './graphql/resolvers/song.resolver';
import { FileManagerModule } from '@/file-manager/file-manager.module';
import { ArtistModule } from '@/artist/artist.module';
import { FeatModule } from '@/feat/feat.module';

@Module({
  imports: [GenresModule, PrismaModule, FileManagerModule, ArtistModule, FeatModule],
  providers: [SongService, SongResolver]
})
export class SongModule {}
