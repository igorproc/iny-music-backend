import { PrismaService } from '@/prisma/prisma.service';
import { getUploadedFileDirectory } from '@/utils/currentDirectory';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { imageTypes, soundTypes } from './const/file-manager.const';

@Injectable()
export class FileManagerService {
  constructor( private readonly prisma: PrismaService ){}

  async fileUpload(createReadStream, filePath: string): Promise<boolean> {
    try {
      await createReadStream().
        pipe(createWriteStream(filePath))
      return true
    } catch(error) {
      throw new Error(error)
    }
  }

  async declarateFileIntoDb(fileGroup: string, fileType: string): Promise<string> {
    try {
      const fileId: { fmid: number } = await this.prisma.fileManager.create({
        data: {
          type: fileGroup === 'songs' ? 'song_id' : 'avatar_id',
        },
        select: {
          fmid: true
        }
      })
      const localFilePath = getUploadedFileDirectory(fileId.fmid, fileGroup, fileType)
      const filePath = process.env.CDN_LINK + localFilePath.substring(1)      

      await this.prisma.fileManager.update({
        where: {
          fmid: fileId.fmid
        },
        data: {
          path: filePath
        }
      })
      
      return localFilePath
    } catch(error) {
      throw new Error(error)
    }
  }

  async declarateFile(createReadStream, filename: string) {
    try {
      const fileType: string = filename.match(/\.[a-zA-Z0-9]*/)[0]      
      if(soundTypes.includes(fileType)) {        
        const songPath = await this.declarateFileIntoDb('songs', fileType)            
        await this.fileUpload(createReadStream, songPath)
      }
      else if(imageTypes.includes(fileType)) {
        const imagePath = await this.declarateFileIntoDb('images', fileType)
        await this.fileUpload(createReadStream, imagePath)
      }
      else {
        throw new HttpException('некорректный файл', HttpStatus.BAD_REQUEST)
      }
      return true
    } catch(error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
