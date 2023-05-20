import { AlbumDataOutput } from './graphql/dto/album.dto';
import { PlaylistContentService } from '@/playlist/content/playlist-content.service';
import { FeatService } from '@/feat/feat.service';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { NewAlbumData } from './graphql/dto/create-album.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { playlistType } from '../graphql/playlist-enums';
import { generateToken } from '@/utils/generate/token.util';

@Injectable()
export class PlaylistAlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileManager: FileManagerService,
    private readonly feat: FeatService,
    private readonly playlistContent: PlaylistContentService
  ){}

  async createAlbum(albumData: NewAlbumData): Promise<string> {
    let featId: number = null
    const playlistData = await this.prisma.playlist.create({
      data: {
        type: playlistType.album,
        owner_uid: albumData.uid,
        aid: albumData.aid,
        fid: null,
        is_private: false,
        title: albumData.title,
        avatar_id: 0,
        subtitle: albumData.subtitle ? albumData.subtitle : null,
        share_token: generateToken(),
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000)
      }
    })

    const albumImageIsUpload = await this.fileManager.createFileManagerRecord(albumData.albumImage, playlistData.pid)

    const contentIsUpload = await this.playlistContent.createAlbumContent({
      pid: playlistData.pid,
      uid: albumData.uid,
      songs: albumData.songs
    })

    if(albumData.featNames) {
      featId = await this.feat.createFeatsRecord(albumData.featNames, 'album', playlistData.pid)
    }

    const playlistUpdate = await this.prisma.playlist.update({
      where: {
        pid: playlistData.pid
      },
      data: {
        fid: featId,
        avatar_id: albumImageIsUpload.fmid
      }
    })

    if(playlistUpdate && contentIsUpload) {
      console.log(playlistUpdate)
      return '123'
    }
  }

  async getAlbumData(shareToken: string): Promise<AlbumDataOutput> {
    const playlistData = await this.prisma.playlist.findFirst({ where: { type: playlistType.album, share_token: shareToken } })

    if(!playlistData) return
    const imageUrl = await this.fileManager.getFileManagerRecordById(playlistData.avatar_id)
    const songsData = await this.playlistContent.getPlaylistContent(playlistData.pid)

    return {
      artistId: playlistData.aid,
      title: playlistData.title,
      subtitle: playlistData.subtitle,
      albumLogo: imageUrl.path,
      songs: songsData
    }
  }
}
