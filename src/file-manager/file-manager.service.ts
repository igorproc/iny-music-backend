import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { FileManager } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'
import { LocalFileManagerService } from './local/local-file-manager.service'
import { CdnFileManager } from './cdn/cdn-file-manager.service'

import { imageTypes, soundTypes } from './const/file-manager.const'
import { TFileTypeCheckOutput, TUploadFileOutput } from './types/file-manager.type'
import { FileUpload } from '@/dto/file-upload.dto'

@Injectable()
export class FileManagerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localFileManager: LocalFileManagerService,
    private readonly cdnFileManager: CdnFileManager,
  ) {}

  checkFileType = (mimeType: string): TFileTypeCheckOutput => {
    switch (true) {
      case soundTypes[mimeType] !== undefined:
        return {
          mimeFileExtension: mimeType,
          fileType: 'song',
          fileExtension: soundTypes[mimeType],
        }
      case imageTypes[mimeType] !== undefined:
        return {
          mimeFileExtension: mimeType,
          fileType: 'image',
          fileExtension: imageTypes[mimeType],
        }
      default:
        return null
    }
  }

  uploadFile = async (file: FileUpload, fileId: number): Promise<TUploadFileOutput> => {
    try {
      const fileData = await this.localFileManager.waitFileUpload(file)

      const fileType: TFileTypeCheckOutput = this.checkFileType(fileData.mimetype)
      if (!fileType) {
        return
      }

      const localFilePath = await this.localFileManager.uploadFile(
        fileData.createReadStream,
        fileId.toString(),
        fileType.fileExtension,
      )
      if (!localFilePath) {
        return
      }

      const localFile = this.localFileManager.getFile(localFilePath, fileId.toString(), fileType.fileExtension)

      if (!localFile) {
        return
      }

      const CDNFilePath = await this.cdnFileManager.uploadFileToCDN(localFile)
      if (!CDNFilePath) {
        return
      }

      const localFileIsDelete = this.localFileManager.deleteFile(localFilePath)
      if (!localFileIsDelete) {
        return
      }

      return {
        CDNFilePath,
        fileType: fileType.fileType,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  createFileManagerRecord = async (file: FileUpload, fileId: number): Promise<FileManager> => {
    try {
      const fileManagerData = await this.prisma.fileManager.create({
        data: {
          type_value: fileId,
        },
      })
      if (!fileManagerData) {
        return
      }

      const CDNFilePath: TUploadFileOutput = await this.uploadFile(file, fileManagerData.fmid)
      if (!CDNFilePath) {
        await this.prisma.fileManager.deleteMany({
          where: { fmid: fileManagerData.fmid },
        })
        return
      }
      return await this.prisma.fileManager.update({
        where: { fmid: fileManagerData.fmid },
        data: {
          type: CDNFilePath.fileType === 'song' ? 'song_id' : 'image_id',
          path: CDNFilePath.CDNFilePath,
        },
      })
    } catch {
      throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  getFileManagerRecordById = async (id: number): Promise<FileManager> => {
    try {
      return await this.prisma.fileManager.findFirst({
        where: {
          fmid: id,
        },
      })
    } catch {
      throw new HttpException('song is not found', HttpStatus.NOT_FOUND)
    }
  }
}
