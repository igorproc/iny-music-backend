import { PrismaService } from '@/prisma/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Artist, FileManager } from '@prisma/client'
import { CreateArtistInput } from './graphql/dto/create-artist.dto'
import { FileManagerService } from '@/file-manager/file-manager.service'

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService, private readonly fileManager: FileManagerService) {}

  async getAtrist(artistUid: number): Promise<Artist> {
    try {
      return await this.prisma.artist.findUnique({
        where: {
          aid: artistUid,
        },
      })
    } catch {
      throw new HttpException('Artist is wasnt found', HttpStatus.NOT_FOUND)
    }
  }

  getArtistByAltName = async (altName: string): Promise<number> => {
    try {
      const artistId = await this.prisma.artist.findFirst({
        where: {
          alt_name: altName,
        },
        select: {
          aid: true,
        },
      })
      return artistId.aid
    } catch {
      throw new HttpException('Artist is wasnt found', HttpStatus.NOT_FOUND)
    }
  }

  async createArtist(artistData: CreateArtistInput): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.create({
        data: {
          owner_uid: artistData.ownerUid,
          alt_name: artistData.altName,
          name: artistData.name,
          surname: artistData.surname,
          avatar_id: null,
          verify: false,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000),
        },
      })

      if (!artistData.avatarFile) return artist

      const uploadFilePath: FileManager = await this.fileManager.createFileManagerRecord(
        artistData.avatarFile,
        artist.aid,
      )

      return await this.prisma.artist.update({
        where: {
          aid: artist.aid,
        },
        data: {
          avatar_id: uploadFilePath.fmid,
        },
      })
    } catch (error) {
      console.error(error)

      throw new HttpException('Artist Is has been created', HttpStatus.NOT_ACCEPTABLE)
    }
  }
}
