import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@ObjectType({ description: 'Atrist' })
export class ArtistModel {
  @Field(() => ID)
  readonly aid: number

  @Field(() => Int)
  owner_uid: number

  @Field(() => String)
  @MaxLength(16)
  name: string

  @Field(() => String)
  @MaxLength(16)
  surname: string

  @Field(() => String, { nullable: true })
  @MaxLength(32)
  alt_name: string

  @Field(() => Boolean)
  verify: boolean

  @Field(() => Int, { nullable: true })
  avatar_id: number

  @Field(() => Int)
  updated_at: number

  @Field(() => Int)
  created_at: number
}
