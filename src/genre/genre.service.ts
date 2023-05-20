import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService){}

  getAllGenreList = async(): Promise<Genre[]> => {
    try {
      return await this.prisma.genre.findMany()
    } catch(error) {
      console.error(error)
    }
  }

  fillGenreList = async(): Promise<void> => {
    try {
      const genresList = await axios.get<string[]>('https://raw.githubusercontent.com/voltraco/genres/master/genres.json')
      genresList.data.forEach(async (genreTitle) => {
        await this.prisma.genre.create({
          data: {
            title: genreTitle
          }
        })
      })
    } catch(error) {
      console.error(error)
    }
  }

  getGenreById = async(gid: number): Promise<Genre> => {
    try {
      return this.prisma.genre.findUnique({
        where: {
          gid
        }
      })
    } catch(error) {
      console.error(error)
    }
  }
}
