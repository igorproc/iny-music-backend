import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("ArtistOutputforSong")
export class ArtsistModelForSong {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  surname: string;

  @Field(() => String, { nullable: true })
  altName: string;
}