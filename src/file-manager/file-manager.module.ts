import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FileManagerService],
  exports: [FileManagerService]
})
export class FileManagerModule {}
