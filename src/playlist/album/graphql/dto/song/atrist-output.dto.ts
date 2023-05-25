import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("ArtistOutputforSong")
export class ArtsistModelForSong {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  altName: string;

  @Field(() => String)
  artistImage: string;

  @Field(() => String)
  shareToken: string;
}