import { generateToken } from '@/utils/generate/token.util'
import { PrismaService } from '@/prisma/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Artist, FileManager } from '@prisma/client'
import { CreateArtistInput } from './graphql/dto/create-artist.dto'
import { FileManagerService } from '@/file-manager/file-manager.service'

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService, private readonly fileManager: FileManagerService) {}

  async getAtristData(artistUid: number) {
    try {
      const artistData = await this.prisma.artist.findUnique({
        where: {
          aid: artistUid,
        },
      })
      let artistImagePath: string = ''
      if (artistData.avatar_id) {
        const fileManagerData = await this.fileManager.getFileManagerRecordById(artistData.avatar_id)
        artistImagePath = fileManagerData.path
      }
      return {
        id: artistData.aid,
        name: artistData.name,
        surname: artistData.surname,
        altName: artistData.alt_name,
        artistImage: artistImagePath,
        shareToken: artistData.share_token,
      }
    } catch {
      throw new HttpException("Artist wasn't found", HttpStatus.NOT_FOUND)
    }
  }

  async createArtist(artistData: CreateArtistInput): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.create({
        data: {
          owner_uid: artistData.ownerUid,
          alt_name: artistData.altName ? artistData.altName : `${artistData.name} ${artistData.surname}`,
          name: artistData.name,
          surname: artistData.surname,
          avatar_id: null,
          share_token: generateToken(),
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
