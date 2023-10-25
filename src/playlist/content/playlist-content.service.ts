import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { SongService } from '@/song/song.service'
import { NewPlaylistContentData } from './graphql/dto/create-playlist-content.dto'
import { SongDataFragment } from './../album/graphql/dto/song/song-output.dto'
import { TCustomPlaylistData } from './types/playlist-content'

@Injectable()
export class PlaylistContentService {
  constructor(private readonly prisma: PrismaService, private readonly song: SongService) {}

  async createAlbumContent(playlistContentData: NewPlaylistContentData): Promise<number> {
    try {
      const songId = await this.song.createSong(playlistContentData.song)

      if (!songId) {
        throw new Error('SongUploadError')
      }

      const playlistContent = await this.prisma.playlistContent.create({
        data: {
          pid: null,
          who_added_uid: playlistContentData.uid,
          sid: songId,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000),
        },
      })

      if (!playlistContent) {
        throw new Error('AlbumContentError')
      }

      return playlistContent.pcid
    } catch (error) {
      throw new Error(error)
    }
  }

  async createCustomContent(playlistContentData: TCustomPlaylistData): Promise<boolean> {
    try {
      for (const songId of playlistContentData.songsIds) {
        await this.prisma.playlistContent.create({
          data: {
            pid: playlistContentData.pid,
            who_added_uid: playlistContentData.uid,
            sid: songId,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
          },
        })
      }

      return true
    } catch (error) {
      throw new Error(error)
    }
  }

  async getPlaylistContent(id: number): Promise<SongDataFragment[]> {
    try {
      const songIds = await this.prisma.playlistContent.findMany({ where: { pid: id }, select: { sid: true } })
      const songsData = []
      for (const songId of songIds) {
        const songData = await this.song.getSongBySid(songId.sid)
        if (songData) songsData.push(songData)
      }

      if (songsData.length) return songsData
    } catch (error) {
      throw new Error(error)
    }
  }

  async setPlaylistIdIntoContent(playlistContentId: number, playlistId: number): Promise<void> {
    try {
      await this.prisma.playlistContent.update({
        where: { pcid: playlistContentId },
        data: { pid: playlistId },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deletePlaylistContentRecord(playlistContentId: number): Promise<void> {
    try {
      await this.prisma.playlistContent.delete({
        where: { pcid: playlistContentId },
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}
