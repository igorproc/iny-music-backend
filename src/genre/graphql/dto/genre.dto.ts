import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Genre' })
export class GenreModel {
  @Field(() => ID)
  readonly gid: number

  @Field(() => String)
  title: string
}
