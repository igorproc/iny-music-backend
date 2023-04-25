import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { GenreResolver } from './graphql/resolvers/genre.resolver';

@Module({
  imports: [PrismaModule],
  providers: [GenreService, GenreResolver],
  exports: [GenreService]
})
export class GenreModule {}
