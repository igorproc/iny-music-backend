import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { CreateArtistInput } from './graphql/dto/create-artist.dto';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { FileUpload } from '@/dto/file-upload.dto';

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
      let fileId: number = null
      if(artistImage) {     
        fileId = await this.fileManager.declarateFile(artistImage.createReadStream, artistImage.filename)
      }
      return await this.prisma.artist.create({
        data: {
          ...artistData,
          avatar_id: fileId,
          verify: false,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })
    } catch(error) {
      console.log(error)
      
      throw new HttpException('Artist Is has been created', HttpStatus.NOT_ACCEPTABLE)
    }
  }
}
