import { PlaylistContentModule } from '@/playlist/content/playlist-content.module';
import { FileManagerModule } from '@/file-manager/file-manager.module';
import { Module } from "@nestjs/common";
import { PrismaModule } from '@/prisma/prisma.module';
import { PlaylistCustomService } from './playlist-custom.service';

@Module({
  imports: [PrismaModule, FileManagerModule, PlaylistContentModule],
  providers: [PlaylistCustomService]
})
export class PlaylistCustomModule {}
