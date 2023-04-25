import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist, FileManager } from '@prisma/client';
import { CreateArtistInput } from './graphql/dto/create-artist.dto';
import { FileUpload } from '@/dto/file-upload.dto';
import { FileManagerService } from '@/file-manager/file-manager.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileManager: FileManagerService
  ){}

  async getAtrist(artistUid: number): Promise<Artist> {
    try {      
      return await this.prisma.artist.findUnique({
        where: {
          aid: artistUid
        }
      })
    } catch {
      throw new HttpException('Artist is wasnt found', HttpStatus.NOT_FOUND)
    }
  }

  async createArtist(artistData: CreateArtistInput, artistImage: FileUpload): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.create({
        data: {
          ...artistData,
          avatar_id: null,
          verify: false,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })

      if(!artistImage) return artist

      const uploadFilePath: FileManager = await this.fileManager.createFileManagerRecord(artistImage, artist.aid)

      return await this.prisma.artist.update({
        where: {
          aid: artist.aid
        },
        data: {
          avatar_id: uploadFilePath.fmid
        }
      })

    } catch(error) {
      console.error(error)
      
      throw new HttpException('Artist Is has been created', HttpStatus.NOT_ACCEPTABLE)
    }
  }
}
