import { Injectable } from "@nestjs/common";
import { createWriteStream, readFileSync, unlinkSync } from 'fs';
import { File } from '@web-std/file'

@Injectable()
export class LocalFileManagerService {

  uploadFile = async(createReadStream, fileName: string, fileType: string): Promise<string> => {
    return new Promise((resolve) => {
      const fileLocalPath = `./uploads/${fileName}${fileType}`
      createReadStream()
        .pipe(createWriteStream(fileLocalPath))
        .on('finish', () => {
          resolve(fileLocalPath)
        })
    })
  }

  getFile = (filePath: string, fileName: string, fileType: string) => {
    try {
      const fileBuffer = readFileSync(filePath)
      const file = new File([fileBuffer], fileName, { type: fileType })
      return file
    } catch (error) {
      console.log(error)
    }
  }

  deleteFile = (filePath: string): void => {
    try {
      unlinkSync(filePath)
    } catch(error) {
      console.log(error)
    }
  }
}