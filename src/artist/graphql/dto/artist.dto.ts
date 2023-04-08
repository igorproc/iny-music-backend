import { Field, ID, ObjectType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@ObjectType({ description: "Atrist" })
export class ArtistModel {
  @Field(type => ID)
  readonly aid: number;

  @Field()
  owner_uid: number;

  @Field()
  @MaxLength(16)
  name: string;

  @Field()
  @MaxLength(16)
  surname: string;

  @Field(type => String, { nullable: true })
  @MaxLength(32)
  alt_name: string;

  @Field(type => Boolean)
  verify: boolean;

  @Field()
  updated_at: number;

  @Field()
  created_at: number;
}