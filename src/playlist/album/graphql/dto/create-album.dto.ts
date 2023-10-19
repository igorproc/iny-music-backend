import { FileUpload } from '@/dto/file-upload.dto'
import { Field, InputType, Int } from '@nestjs/graphql'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { NewSongFragment } from './song-input.dto'

@InputType('NewAlbumModel')
export class NewAlbumData {
  @Field(() => Int)
  uid: number

  @Field(() => Int)
  aid: number

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  subtitle: string

  @Field(() => GraphQLUpload)
  albumImage: FileUpload

  @Field(() => [String], { nullable: true })
  featNames: string[]

  @Field(() => [NewSongFragment], { nullable: true })
  songs: NewSongFragment[]
}
