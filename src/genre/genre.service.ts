import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService){}

  async getAllGenreList(): Promise<Genre[]> {
    try {
      return await this.prisma.genre.findMany()
    } catch(error) {
      console.error(error)
    }
  }

  async fillGenreList(): Promise<void> {
    try {
      const { data } = await axios.get('https://raw.githubusercontent.com/voltraco/genres/master/genres.json')

      await Promise.all(data.map(async (genreTitle) => {
        await this.prisma.genre.create({
          data: {
            title: genreTitle
          }
        })
      }));
    } catch(error) {
      console.error(error)
    }
  }

  async getGenreById(gid: number): Promise<Genre> {
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
