import { FileUpload } from '@/dto/file-upload.dto'
import { Field, InputType, Int } from '@nestjs/graphql'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

@InputType('NewCustomPlaylistInput')
export class NewCustomPlaylistInput {
  @Field(() => Int)
  uid: number

  @Field(() => Int)
  aid: number

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  subtitle: string

  @Field(() => Boolean)
  isPrivate: boolean

  @Field(() => GraphQLUpload, { nullable: true })
  playlistImage: FileUpload

  @Field(() => [Int], { nullable: true })
  songsIds: number[]
}
