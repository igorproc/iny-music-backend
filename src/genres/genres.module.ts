import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GenresService],
  exports: [GenresService]
})
export class GenresModule {}
