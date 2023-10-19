import { Module } from '@nestjs/common'
import { GenresService } from './genres.service'
import { PrismaModule } from '@/prisma/prisma.module'
import { GenreModule } from '@/genre/genre.module'

@Module({
  imports: [PrismaModule, GenreModule],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
