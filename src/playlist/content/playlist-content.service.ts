import { SongDataFragment } from './../album/graphql/dto/song/song-output.dto';
import { TAlbumContentData, TCustomPlaylistData } from './types/playlist-content';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { SongService } from "@/song/song.service";

@Injectable()
export class PlaylistContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly song: SongService,
  ){}

  async createAlbumContent(playlistContentData: TAlbumContentData): Promise<boolean> {
    try {      
      const songsIds = await this.song.createSongList(playlistContentData.songs)      
      if(!songsIds) return
      
      songsIds.forEach(async (playlistSongId) => {
        await this.prisma.playlistContent.create({
          data: {
            pid: playlistContentData.pid,
            who_added_uid: playlistContentData.uid,
            sid: playlistSongId,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000)
          }
        })
      })

      return true
    } catch(error) {
      throw new Error(error)
    }
  }

  async createCustomContent(playlistConentData: TCustomPlaylistData): Promise<boolean> {
    try {
      for(const songId of playlistConentData.songsIds) {
        await this.prisma.playlistContent.create({
          data: {
            pid: playlistConentData.pid,
            who_added_uid: playlistConentData.uid,
            sid: songId,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000)
          }
        })
      }

      return true
    } catch(error) {
      throw new Error(error)
    }
  }

  async getPlaylistContent(id: number): Promise<SongDataFragment[]> {
    const songIds = await this.prisma.playlistContent.findMany({ where: { pid: id }, select: { sid: true } })
    const songsData = []
    for (const songId of songIds) {
      const songData = await this.song.getSongBySid(songId.sid)
      if(songData) songsData.push(songData)
    }

    if(songsData.length) return songsData
  }
}