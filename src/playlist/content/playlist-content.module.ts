import { Module } from "@nestjs/common";
import { SongModule } from '@/song/song.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistContentResolver } from './graphql/resolvers/playlist-content.resolver';

@Module({
  imports: [PrismaModule, SongModule],
  providers: [PlaylistContentService, PlaylistContentResolver],
  exports: [PlaylistContentService]
})
export class PlaylistContentModule {}