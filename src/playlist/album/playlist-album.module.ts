import { FeatModule } from '@/feat/feat.module';
import { FileManagerModule } from '@/file-manager/file-manager.module';
import { AlbumPlaylistMutationsResolver } from './graphql/resolvers/album-playlist.mutations';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PlaylistContentModule } from '@/playlist/content/playlist-content.module';
import { PlaylistAlbumService } from './playlist-album.service';

@Module({
  imports: [PrismaModule, FileManagerModule, FeatModule, PlaylistContentModule],
  providers: [PlaylistAlbumService, AlbumPlaylistMutationsResolver],
  exports: [PlaylistAlbumService]
})
export class PlaylistAlbumModule {}
