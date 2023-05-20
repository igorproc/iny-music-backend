import { NewSongFragment } from "@/playlist/album/graphql/dto/song-input.dto"
export type TAlbumContentData = {
  uid: number,
  pid: number,
  songs: NewSongFragment[]
}