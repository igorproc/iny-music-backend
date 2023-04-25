import { GenresService } from '@/genres/genres.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FileManager, Song } from '@prisma/client';
import { CreateSongInput } from './graphql/dto/create-song.dto';
import { FileUpload } from '@/dto/file-upload.dto';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { SongModel } from './graphql/dto/song.dto';

@Injectable()
export class SongService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly genres: GenresService,
    private readonly fileManager: FileManagerService,
  ){}

  async getSongBySid(id: number): Promise<Song> {
    try {
      return await this.prisma.song.findFirst({
        where: {
          sid: id
        }
      })
    } catch(error) {
      console.error(error)
    }
  }

  async createSong(songData: CreateSongInput, songFile: FileUpload): Promise<SongModel> {
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

    const genresDeclarateStatus = await this.genres.declarateMusicGenre({ gsid: song.sid, gidList: songData.genresIds } )
    const uploadFilePath: FileManager = await this.fileManager.createFileManagerRecord(songFile, song.sid)

    if(genresDeclarateStatus) {
      await this.prisma.song.update({
        where: {
          sid: song.sid
        },
        data: {
          gsid: song.sid,
          file_manager_id: uploadFilePath.fmid
        }
      })
    }

    return {
      ...song,
      fileUrl: uploadFilePath.path
    }
  }
}
