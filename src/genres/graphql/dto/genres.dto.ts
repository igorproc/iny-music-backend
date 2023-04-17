import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Genres")
export class GenresModel {
  @Field(() => ID)
  readonly id: number;

  @Field(() => Int)
  gsid: number;

  @Field(() => Int)
  gid: number;
}