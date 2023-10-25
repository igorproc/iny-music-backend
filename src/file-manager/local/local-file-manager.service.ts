import { Injectable } from '@nestjs/common'

import { createWriteStream, createReadStream, unlinkSync } from 'fs'
import { FileUpload } from '@/dto/file-upload.dto'
import { generateToken } from '@utils/generate/token.util'

@Injectable()
export class LocalFileManagerService {
  uploadFile = async (createReadStream, fileName: string, fileType: string): Promise<string> => {
    try {
      const fileLocalPath = `./uploads/${fileName}${fileType}`
      const isLocalUploaded = await createReadStream().pipe(createWriteStream(fileLocalPath))
      if (isLocalUploaded) {
        return fileLocalPath
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  getFile = (filePath: string, fileName: string, fileExt: string) => {
    try {
      const fileReadStream = createReadStream(filePath)
      return {
        fileReadStream,
        fileName: `${fileName}${generateToken().slice(0, 5)}${fileExt}`,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  deleteFile = (filePath: string): boolean => {
    try {
      unlinkSync(filePath)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }

  async waitFileUpload(file): Promise<FileUpload> {
    try {
      const isPromise = Boolean(file && typeof file.then === 'function')
      if (!isPromise) return file

      return file.then((fileData) => fileData)
    } catch (error) {
      throw new Error(error)
    }
  }
}
