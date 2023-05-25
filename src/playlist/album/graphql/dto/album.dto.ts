import { ArtsistModelForSong } from './song/atrist-output.dto';
import { SongDataFragment } from './song/song-output.dto';
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType("AlbumData")
export class AlbumDataOutput {
  @Field(() => String)
  typename: string

  @Field(() => ArtsistModelForSong, { nullable: true })
  artist: ArtsistModelForSong

  @Field(() => String, { nullable: true })
  title: string

  @Field(() => String, { nullable: true })
  subtitle: string

  @Field(() => String, { nullable: true })
  shareToken: string

  @Field(() => String, { nullable: true })
  albumLogo: string

  @Field(() => [SongDataFragment])
  songs: SongDataFragment[]

  @Field(() => Int, { nullable: true })
  createdAt: number
}