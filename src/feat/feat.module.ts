import { Module } from '@nestjs/common';
import { FeatService } from './feat.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ArtistModule } from '@/artist/artist.module';

@Module({
  imports: [PrismaModule, ArtistModule],
  providers: [FeatService],
  exports: [FeatService]
})
export class FeatModule {}
