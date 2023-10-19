import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { CDNApiVersion, secretCDNKey } from './const/file-manager-cdn.const'
import { TCDNData } from './types/cdn.type'
import { apiLinkBuilder } from '@utils/generate/apiLinkBuilder.util'
import * as process from 'process'

@Injectable()
export class CdnFileManager {
  uploadFileToCDN = async (file): Promise<string> => {
    try {
      const formDataForUpload = new FormData()
      formDataForUpload.append('file', file)
      const cdnLink = apiLinkBuilder(
        `${process.env.CDN_LINK}/api/method/file.imageUpload`,
        `&server-token=${secretCDNKey}`,
        Number(CDNApiVersion),
      )

      const { data } = await axios.post<TCDNData>(cdnLink, formDataForUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (data.code === 500) {
        throw new Error('Ахтунг CDN поплыл!')
      }

      return data.path
    } catch (error) {
      console.error(error)
    }
  }
}
