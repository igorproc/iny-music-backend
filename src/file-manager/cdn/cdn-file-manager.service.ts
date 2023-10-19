import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { CDNApiVersion, secretCDNKey } from './const/file-manager-cdn.const'
import { TCDNData } from './types/cdn.type'

@Injectable()
export class CdnFileManager {
  uploadFileToCDN = async (file): Promise<string> => {
    try {
      const formDataForUpload = new FormData()
      formDataForUpload.append('file', file)

      const { data } = await axios.post<TCDNData>(
        `http://cdn/api/method/file.imageUpload?v=${CDNApiVersion}&server-token=${secretCDNKey}`,
        formDataForUpload,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      if (data.code === 500) {
        throw new Error('Ахтунг CDN поплыл!')
      }

      return data.path
    } catch (error) {
      console.error(error)
    }
  }
}
