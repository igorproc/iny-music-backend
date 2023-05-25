import { AlbumDataOutput } from './graphql/dto/album.dto';
import { PlaylistContentService } from '@/playlist/content/playlist-content.service';
import { FeatService } from '@/feat/feat.service';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { ArtistService } from '@/artist/artist.service';
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
    private readonly playlistContent: PlaylistContentService,
    private readonly artist: ArtistService
  ){}

  async createAlbum(albumData: NewAlbumData): Promise<string> {
    try {
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
  
      if(albumData.featIds) {
        featId = await this.feat.createFeatsRecord(albumData.featIds, 'album', playlistData.pid)
      }

      if(!albumData.plalistContentIds.length) throw new Error('Nothing Songs To Upload')

      for (const playlistContentId of albumData.plalistContentIds) {
        await this.playlistContent.setPlaylistIdIntoContent(playlistContentId, playlistData.pid)  
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
  
      if(playlistUpdate) {
        return '123'
      }
    } catch(error) {
      throw new Error(error)
    }
  }

  async getAlbumData(shareToken: string): Promise<AlbumDataOutput> {
    const playlistData = await this.prisma.playlist.findFirst({ where: { type: playlistType.album, share_token: shareToken } })

    if(!playlistData) return
    const imageUrl = await this.fileManager.getFileManagerRecordById(playlistData.avatar_id)
    const songsData = await this.playlistContent.getPlaylistContent(playlistData.pid)
    const artistData = await this.artist.getAtristData(playlistData.aid)

    return {
      typename: playlistData.type,
      artist: artistData,
      title: playlistData.title,
      subtitle: playlistData.subtitle,
      shareToken: playlistData.share_token,
      albumLogo: imageUrl.path,
      songs: songsData,
      createdAt: playlistData.created_at
    }
  }
}
