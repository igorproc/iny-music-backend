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

  async declarateFileIntoDb(fileGroup: string, fileType: string): Promise<{ localFilePath: string, fileId: number }> {
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
      
      return {
        localFilePath,
        fileId: fileId.fmid
      }
    } catch(error) {
      throw new Error(error)
    }
  }

  async declarateFile(createReadStream, filename: string): Promise<number> {
    try {
      // console.log(createReadStream, filename)
      
      const fileType: string = filename.match(/\.[a-zA-Z0-9]*/)[0]      
      let fileIdIntoDb: number = null

      if(soundTypes.includes(fileType)) {        
        const songPath = await this.declarateFileIntoDb('songs', fileType)
        fileIdIntoDb = songPath.fileId
        await this.fileUpload(createReadStream, songPath.localFilePath)
      }
      else if(imageTypes.includes(fileType)) {
        const imagePath = await this.declarateFileIntoDb('images', fileType)
        fileIdIntoDb = imagePath.fileId
        await this.fileUpload(createReadStream, imagePath.localFilePath)
      }
      else {
        throw new HttpException('некорректный файл', HttpStatus.BAD_REQUEST)
      }
      return fileIdIntoDb
    } catch(error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
