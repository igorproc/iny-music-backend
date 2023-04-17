import { Field, InputType, Int } from "@nestjs/graphql";

@InputType({ description: "Genres Input" })
export class DeclarateGenreModel {
  @Field(() => Int)
  readonly gsid: number;

  @Field(() => [Int])
  gidList: number[];
}