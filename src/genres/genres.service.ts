import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { DeclarateGenreModel } from './graphql/dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    private prisma: PrismaService,
  ){}

  async declarateMusicGenre(genreData: DeclarateGenreModel): Promise<void> {
    try {
      await Promise.all(genreData.gidList.map(async (gid) => {
        await this.prisma.genres.create({
          data: {
            gsid: genreData.gsid,
            gid
          }
        })
      }))
    } catch(error) {
      console.log(error)
    }
  }
}
