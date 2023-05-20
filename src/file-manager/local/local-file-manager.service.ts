import { Injectable } from "@nestjs/common";
import { File } from '@web-std/file'
import { createWriteStream, readFileSync, unlinkSync } from 'fs';
import { FileUpload } from '@/dto/file-upload.dto';

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

  deleteFile = (filePath: string): boolean => {
    try {
      unlinkSync(filePath)
      return true
    } catch(error) {
      console.log(error)
    }
  }

  async waitFileUpload(file): Promise<FileUpload> {
    const isPromise = Boolean(file && typeof file.then === 'function')
    if(!isPromise) return file

    return new Promise((resolve) => {
      file.then((fileData) => resolve(fileData))
    })
  }
}