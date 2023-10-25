import { Injectable } from '@nestjs/common'
import { InjectS3, S3 } from 'nestjs-s3'

import * as process from 'process'

@Injectable()
export class CdnFileManager {
  constructor(@InjectS3() private readonly s3: S3) {}

  uploadFileToCDN = async (file): Promise<string> => {
    try {
      const fileIsUploaded = await this.s3.putObject({
        Bucket: process.env.S3_BUCKKET,
        Key: file.fileName,
        Body: file.fileReadStream,
        ACL: 'public-read',
      })

      if (fileIsUploaded.$metadata.httpStatusCode !== 200) {
        return
      }
      return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKKET}/${file.fileName}`
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}
