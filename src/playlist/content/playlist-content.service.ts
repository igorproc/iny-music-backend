import { TAlbumContentData } from './types/playlist-content'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { SongService } from '@/song/song.service'

@Injectable()
export class PlaylistContentService {
  constructor(private readonly prisma: PrismaService, private readonly song: SongService) {}

  async createAlbumContent(playlistContentData: TAlbumContentData): Promise<boolean> {
    try {
      const songsIds = await this.song.createSongList(playlistContentData.songs)
      console.log(songsIds)

      if (!songsIds) return

      songsIds.forEach(async (playlistSongId) => {
        await this.prisma.playlistContent.create({
          data: {
            pid: playlistContentData.pid,
            who_added_uid: playlistContentData.uid,
            sid: playlistSongId,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
          },
        })
      })

      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
