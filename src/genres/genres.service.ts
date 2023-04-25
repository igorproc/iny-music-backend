import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { DeclarateGenreModel } from "./types/TDeclarateGenre.type"

@Injectable()
export class GenresService {
  constructor(
    private prisma: PrismaService,
  ){}

  async declarateMusicGenre(genreData: DeclarateGenreModel): Promise<Boolean> {
    try {
      return await Promise.all(genreData.gidList.map(async (gid) => {
        await this.prisma.genres.create({
          data: {
            gsid: genreData.gsid,
            gid
          }
        })
      })
      ).then(
       () => { return true }
      )
    } catch(error) {
      console.error(error)
    }
  }
}
