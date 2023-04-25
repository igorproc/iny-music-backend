import { Module } from "@nestjs/common";
import { LocalFileManagerService } from "./local-file-manager.service";

@Module({
  providers: [LocalFileManagerService],
  exports: [LocalFileManagerService]
})
export class LocalFileManagerModule{}