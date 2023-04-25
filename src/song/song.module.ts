import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { GenresModule } from '@/genres/genres.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { SongResolver } from './graphql/resolvers/song.resolver';
import { FileManagerModule } from '@/file-manager/file-manager.module';

@Module({
  imports: [GenresModule, PrismaModule, FileManagerModule],
  providers: [SongService, SongResolver]
})
export class SongModule {}
