import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ArtsistModelForSong } from './atrist-output.dto'
import { FeatModelForSong } from './feat-output.dto'

@ObjectType('SongDataFragment')
export class SongDataFragment {
  @Field(() => ArtsistModelForSong)
  artist: ArtsistModelForSong

  @Field(() => [String])
  genres: string[]

  @Field(() => [FeatModelForSong])
  feats: FeatModelForSong[]

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  subtitle: string

  @Field(() => Boolean)
  explicit: boolean

  @Field(() => Int)
  duration: number

  @Field(() => String, { nullable: true })
  songUrl: string
}
