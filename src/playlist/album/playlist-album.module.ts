import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { FeatModule } from '@/feat/feat.module';
import { FileManagerModule } from '@/file-manager/file-manager.module';
import { PlaylistContentModule } from '@/playlist/content/playlist-content.module';
import { ArtistModule } from '@/artist/artist.module';
import { PlaylistAlbumService } from './playlist-album.service';
import { AlbumPlaylistQueriesResolver } from './graphql/resolvers/album-playlist.queries';
import { AlbumPlaylistMutationsResolver } from './graphql/resolvers/album-playlist.mutations';

@Module({
  imports: [PrismaModule, FileManagerModule, FeatModule, PlaylistContentModule, ArtistModule],
  providers: [PlaylistAlbumService, AlbumPlaylistMutationsResolver, AlbumPlaylistQueriesResolver],
  exports: [PlaylistAlbumService]
})
export class PlaylistAlbumModule {}
