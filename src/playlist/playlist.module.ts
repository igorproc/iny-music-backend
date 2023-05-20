import { Module } from '@nestjs/common';
import { PlaylistCustomModule } from './custom/playlist-custom.module';
import { PlaylistAlbumModule } from './album/playlist-album.module';

@Module({
  imports: [PlaylistAlbumModule, PlaylistCustomModule],
})
export class PlaylistModule {}
