import { GenresService } from '@/genres/genres.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FileManager, Song } from '@prisma/client';
import { CreateSongInput } from './graphql/dto/create-song.dto';
import { FileUpload } from '@/dto/file-upload.dto';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { SuccsessOperationStatus } from '@/dto/status.dto';
import { ArtistService } from '@/artist/artist.service';
import { FeatService } from '@/feat/feat.service';

@Injectable()
export class SongService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artist: ArtistService,
    private readonly genres: GenresService,
    private readonly fileManager: FileManagerService,
    private readonly feat: FeatService
  ){}

  async getSongBySid(id: number) {
    try {
      const songDataById: Song = await this.prisma.song.findFirst({
        where: {
          sid: id
        }
      })
      const artistData = await this.artist.getAtrist(songDataById.aid)
      const genresData = await this.genres.getGenresById(songDataById.gsid)
      const fileUrl = await this.fileManager.getFileManagerRecordById(songDataById.file_manager_id)
      let featData = []
      if(songDataById.fid) {
        featData = await this.feat.getFeatsIds(songDataById.fid)
      }
      return {
        artist: {
          id: artistData.aid,
          name: artistData.name,
          surname: artistData.surname,
          altName: artistData.alt_name
        },
        genres: genresData,
        feats: featData,
        title: songDataById.title,
        subtitle: songDataById.subtitle,
        duration: songDataById.duration,
        songUrl: fileUrl,
        explicit: songDataById.explicit,
      }
    } catch(error) {
      console.error(error)
    }
  }

  async createSong(songData: CreateSongInput, songFile: FileUpload): Promise<SuccsessOperationStatus> {
    const song: Song = await this.prisma.song.create({
      data: {
        aid: songData.aid,
        fid: null,
        gsid: null,
        file_manager_id: 0,
        owner_uid: songData.ownerUid,
        title: songData.title,
        subtitle: songData.subtitle,
        explicit: songData.explicit,
        duration: songData.duration,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000)
      }
    })

    const genresDeclarateStatus: number = await this.genres.declarateMusicGenre({ gsid: song.sid, gidList: songData.genresIds } )
    const uploadFilePath: FileManager = await this.fileManager.createFileManagerRecord(songFile, song.sid)
    const featId: number = await this.feat.createFeatsRecord(songData.featsNames, song.sid)

    await this.prisma.song.update({
      where: {
        sid: song.sid
      },
      data: {
        gsid: genresDeclarateStatus ? genresDeclarateStatus : null,
        file_manager_id: uploadFilePath.fmid,
        fid: featId ? featId : null
      }
    })

    return {
      code: 200,
      message: 'succsesfull'
    }
  }
}
