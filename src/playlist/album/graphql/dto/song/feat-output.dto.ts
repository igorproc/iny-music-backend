import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('FeatOutputforSong')
export class FeatModelForSong {
  @Field(() => String, { nullable: true })
  name: string

  @Field(() => Int, { nullable: true })
  position: number
}
