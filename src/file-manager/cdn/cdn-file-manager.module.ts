import { Module } from '@nestjs/common';
import { CdnFileManager } from './cdn-file-manager.service';

@Module({
  providers: [CdnFileManager],
  exports: [CdnFileManager],
})
export class CdnFileManagerModule{}