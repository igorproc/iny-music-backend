import { PlaylistAlbumModule } from './album/playlist-album.module';
import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [PlaylistAlbumModule],
  providers: [PlaylistService]
})
export class PlaylistModule {}
