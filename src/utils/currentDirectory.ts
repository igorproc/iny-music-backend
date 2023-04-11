const stringWithZeros = (numberChars: number): string => {
  let currentString: string = ''
  for(let i = 0; i < numberChars; i++) {
    currentString += '0'
  }
  return currentString
}


export function getUploadedFileDirectory(fileId: number, fileGroup: string, fileType: string): string {
  if(fileId < 1000) return `./uploads/${fileGroup}/0-999/${fileId}${fileType}`

  const fileIdToString: string = String(fileId)
  const rangeStart = `${fileIdToString[0]}${stringWithZeros(fileIdToString.length - 1)}`
  const rangeEnd = `${fileIdToString[0]}${stringWithZeros(fileIdToString.length - 1).slice(0, -3) + 999}`

  return `./uploads/${fileGroup}/${rangeStart}-${rangeEnd}/${fileId}${fileType}`
}
