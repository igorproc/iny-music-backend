import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { imageTypes, soundTypes } from './const/file-manager.const';
import { FileManager } from '@prisma/client';
import { FileUpload } from '@/dto/file-upload.dto';
import { LocalFileManagerService } from './local/local-file-manager.service';
import { CdnFileManager } from './cdn/cdn-file-manager.service';
import { TFileTypeCheckOutput, TUploadFileOutput } from './types/file-manager.type';

@Injectable()
export class FileManagerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localFileManager: LocalFileManagerService,
    private readonly cdnFileManager: CdnFileManager,
  ){}

  checkFileType = (fileName: string): TFileTypeCheckOutput => {
    const fileType: string = fileName.match(/\.[a-zA-Z0-9]*/)[0]
    if(Object.keys(soundTypes).includes(fileType)) {
      return {
        mimeFileExtension: soundTypes[fileType],
        fileType: 'song',
        fileExtension: fileType
      }
    }
    if(Object.keys(imageTypes).includes(fileType)) {
      return {
        mimeFileExtension: imageTypes[fileType],
        fileType: 'image',
        fileExtension: fileType
      }
    }
    return null
  }

  uploadFile = async(file: FileUpload, fileId: number): Promise<TUploadFileOutput> => {
    try {
      const fileType: TFileTypeCheckOutput = this.checkFileType(file.filename)
      if(!fileType) throw new Error('неверный тип файла')

      const localFilePath = await this.localFileManager.uploadFile(file.createReadStream, fileId.toString(), fileType.fileExtension)
      if(!localFilePath) throw new Error('искаженный файл')
      
      const localFile = this.localFileManager.getFile(localFilePath, fileId + fileType.fileExtension, fileType.mimeFileExtension)
      if(!localFile) throw new Error('ошибка сервера')

      const CDNFilePath = await this.cdnFileManager.uploadFileToCDN(localFile)
      if(!CDNFilePath) throw new Error('Ахтунг CDN поплыл!')

      const localFileIsDelete = this.localFileManager.deleteFile(localFilePath)
      if(!localFileIsDelete) throw new Error('0_0')

      return {
        CDNFilePath,
        fileType: fileType.fileType
      }
    } catch(error) {
      console.log(error)
    }
  }

  createFileManagerRecord = async(file: FileUpload, fileId: number): Promise<FileManager> => {
    try {
      const CDNFilePath: TUploadFileOutput = await this.uploadFile(file, fileId)
      return await this.prisma.fileManager.create({
        data: {
          type_value: fileId,
          type: CDNFilePath.fileType === 'song' ? 'song_id': 'image_id',
          path: CDNFilePath.CDNFilePath
        }
      })
    } catch {
      throw new HttpException('ошибка сервера', HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  getFileManagerRecordById = async(id: number): Promise<FileManager> => {
    try {
      return await this.prisma.fileManager.findFirst({
        where: {
          fmid: id
        }
      })
    } catch {
      throw new HttpException('записи с таким id не существует', HttpStatus.NOT_FOUND)
    }
  }
}
