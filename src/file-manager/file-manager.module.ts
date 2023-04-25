import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { LocalFileManagerModule } from './local/local-file-manager.module';
import { CdnFileManagerModule } from './cdn/cdn-file-manager.module';

@Module({
  imports: [PrismaModule, LocalFileManagerModule, CdnFileManagerModule],
  providers: [FileManagerService],
  exports: [FileManagerService]
})
export class FileManagerModule {}
