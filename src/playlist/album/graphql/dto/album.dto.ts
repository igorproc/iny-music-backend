import { SongDataFragment } from './song/song-output.dto';
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType("AlbumData")
export class AlbumDataOutput {
  @Field(() => Int)
  artistId: number

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  subtitle: string

  @Field(() => String, { nullable: true })
  albumLogo: string

  @Field(() => [SongDataFragment])
  songs: SongDataFragment[]
}