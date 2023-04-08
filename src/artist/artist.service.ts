import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async createArtist(artistData: Artist): Promise<Artist> {
    try {
      return await this.prisma.artist.create({
        data: {
          ...artistData,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })
    } catch {
      throw new HttpException('Artist Is has been created', HttpStatus.NOT_ACCEPTABLE)
    }
  }

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
}
