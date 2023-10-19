import { Module } from '@nestjs/common'
import { SongModule } from '@/song/song.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { PlaylistContentService } from './playlist-content.service'

@Module({
  imports: [PrismaModule, SongModule],
  providers: [PlaylistContentService],
  exports: [PlaylistContentService],
})
export class PlaylistContentModule {}
