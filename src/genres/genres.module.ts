import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { GenresResolver } from './graphql/resolvers/genres.resolver';

@Module({
  imports: [PrismaModule],
  providers: [GenresService, GenresResolver]
})
export class GenresModule {}
