import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Genre } from '@prisma/client'
import axios from 'axios'

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  getAllGenreList = async (): Promise<Genre[]> => {
    try {
      return await this.prisma.genre.findMany()
    } catch (error) {
      console.error(error)
    }
  }

  fillGenreList = async (): Promise<boolean> => {
    try {
      const genresList = await axios.get<string[]>(
        'https://raw.githubusercontent.com/voltraco/genres/master/genres.json',
      )
      for (const genreTitle of genresList.data) {
        await this.prisma.genre.create({
          data: {
            title: genreTitle,
          },
        })
      }
      return true
    } catch (error) {
      console.error(error)
    }
  }

  getGenreById = async (gid: number): Promise<Genre> => {
    try {
      return await this.prisma.genre.findUnique({
        where: {
          gid,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
}
