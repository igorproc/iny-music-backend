import { ArtistService } from '@/artist/artist.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TOutputFeatsNames } from './types/feat.type';

@Injectable()
export class FeatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artist: ArtistService
  ){}

  createFeatsRecord = async(featsName: string[], songId: number): Promise<number> => {
    try {
      for (const artist of featsName) {
        const artistId = await this.artist.getArtistByAltName(artist)
        await this.createFeatRecord(artistId, featsName.findIndex((featName) => featName === artist), songId)
      }
      return songId
    } catch(error) {
      console.error(error)
    }
  }

  createFeatRecord = async(artistId: number, position: number, songId: number) => {
    try {
      await this.prisma.feat.create({
        data: {
          aid: artistId,
          sid: songId,
          position: position,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })
    } catch(error) {
      console.error(error)
    }
  }

  getFeatsIds = async(songId: number): Promise<TOutputFeatsNames[]> => {
    try {
      const featNamesList: TOutputFeatsNames[] = []
      const featIds = await this.prisma.feat.findMany({
        where: {
          sid: songId
        },
        select: {
          aid: true,
          position: true
        }
      })
      for(const featId of featIds) {        
        const artistDataById = await this.artist.getAtrist(featId.aid)        
        featNamesList.push({ name: artistDataById.alt_name, position: featId.position })
      }
      return featNamesList
    } catch(error) {
      console.error(error)
    }
  }
}
