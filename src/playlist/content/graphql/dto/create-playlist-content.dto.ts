import { NewSongFragment } from '@/playlist/content/graphql/dto/song/song-input.dto'
import { Field, Int, InputType } from '@nestjs/graphql'

@InputType('NewPlaylistContentData')
export class NewPlaylistContentData {
  @Field(() => Int)
  uid: number

  @Field(() => NewSongFragment)
  song: NewSongFragment
}
