import { NewSongFragment } from "@/playlist/album/graphql/dto/song/song-input.dto"
export type TAlbumContentData = {
  uid: number,
  pid: number,
  songs: NewSongFragment[]
}

export type TCustomPlaylistData = {
  uid: number
  pid: number,
  songsIds: number[]
}