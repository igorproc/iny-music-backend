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

  createFeatsRecord = async(featsIds: number[], featType: string, typeValue: number): Promise<number> => {
    try {
      for(const artistId of featsIds) {
        const artistData = await this.artist.getAtristData(artistId)
        await this.createFeatRecord(artistData.id, featsIds.findIndex((featId) => featId === artistId), featType, typeValue)
      }
      return typeValue
    } catch(error) {
      console.error(error)
    }
  }

  createFeatRecord = async(artistId: number, position: number, featType: string, songId: number) => {
    try {
      await this.prisma.feat.create({
        data: {
          aid: artistId,
          type: featType,
          type_value: songId,
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
          type_value: songId
        },
        select: {
          aid: true,
          position: true
        }
      })
      for(const featId of featIds) {        
        const artistDataById = await this.artist.getAtristData(featId.aid)        
        featNamesList.push({ name: artistDataById.altName, position: featId.position })
      }
      return featNamesList
    } catch(error) {
      console.error(error)
    }
  }
}
