import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { GenresModule } from '@/genres/genres.module';

@Module({
  imports: [GenresModule],
  providers: [SongService]
})
export class SongModule {}
