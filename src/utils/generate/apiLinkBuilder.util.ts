import * as process from 'process'

export function apiLinkBuilder(apiUrl: string, payloadUrl: string, apiVersion?: number) {
  return process.env.IS_SSL ? 'http' : 'https' + '://' + apiUrl + `?v=${apiVersion}` + payloadUrl
}
