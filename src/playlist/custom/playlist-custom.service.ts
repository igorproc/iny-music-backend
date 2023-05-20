import { PlaylistContentService } from './../content/playlist-content.service';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { generateToken } from '@/utils/generate/token.util';
import { playlistType } from '../graphql/playlist-enums';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { NewCustomPlaylistInput } from './graphql/dto/create-playlist.dto';
import { Playlist } from '@prisma/client';

@Injectable()
export class PlaylistCustomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileManager: FileManagerService,
    private readonly playlistContent: PlaylistContentService
  ){}
  async createCustomPlaylist(playlistData: NewCustomPlaylistInput): Promise<string> {
    const playlist: Playlist = await this.prisma.playlist.create({
      data: {
        type: playlistType.custom,
        owner_uid: playlistData.uid,
        aid: null,
        fid: null,
        is_private: playlistData.isPrivate,
        title: playlistData.title,
        subtitle: playlistData.subtitle ? playlistData.subtitle : null,
        avatar_id: null,
        share_token: generateToken(),
        updated_at: Math.floor(Date.now() / 1000),
        created_at: Math.floor(Date.now() / 1000)
      }
    })

    if(playlistData.playlistImage) {
      const avatarFileManager = await this.fileManager.createFileManagerRecord(playlistData.playlistImage, playlist.pid)
      this.prisma.playlist.update({
        where: { pid: playlist.pid },
        data: { avatar_id: avatarFileManager.fmid }
      })
    }

    const contentIsUploading = await this.playlistContent.createCustomContent({
      pid: playlist.pid,
      uid: playlistData.uid,
      songsIds: playlistData.songsIds
    })

    if(contentIsUploading) {
      console.log(this.prisma.playlist.findFirst({ where: { pid: playlist.pid } }))
      return '123'
    }
  }

  async getCustomPlaylistData(shareToken: string): Promise<any> {
    const playlistData = await this.prisma.playlist.findFirst({ where: { type: playlistType.custom, share_token: shareToken } })

    if(!playlistData) return
    let imageData = null
    if(playlistData.avatar_id) {
      imageData = await this.fileManager.getFileManagerRecordById(playlistData.avatar_id)
    }
    const songsData = await this.playlistContent.getPlaylistContent(playlistData.pid)

    return {
      artistId: playlistData.aid,
      title: playlistData.title,
      subtitle: playlistData.subtitle,
      albumLogo: imageData?.path,
      songs: songsData
    }
  }
}
