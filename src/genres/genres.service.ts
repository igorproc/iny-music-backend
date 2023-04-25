import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { DeclarateGenreModel } from "./types/TDeclarateGenre.type"
import { GenreService } from '@/genre/genre.service';

@Injectable()
export class GenresService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly genre: GenreService
  ){}

  declarateMusicGenre = async(genreData: DeclarateGenreModel): Promise<number> => {
    try {
      return await Promise.all(genreData.gidList.map(async (gid) => {
        await this.prisma.genres.create({
          data: {
            gsid: genreData.gsid,
            gid
          }
        })
      })
      ).then(() => genreData.gsid)
    } catch(error) {
      console.error(error)
    }
  }

  getGenresById = async(genreId: number) => {
    try {
      const genreList = []
      const allGenresGids = await this.prisma.genres.findMany({
        where: {
          gsid: genreId
        }
      })
      if(!allGenresGids) return genreList

      const genreGidList = allGenresGids.map((genre) => genre.gid)
      Promise.all(genreGidList.map(async (gid) => {
        genreList.push(this.genre.getGenreById(gid))
      }))
      return genreList
    } catch(error) {
      console.error(error)
    }
  }
}
