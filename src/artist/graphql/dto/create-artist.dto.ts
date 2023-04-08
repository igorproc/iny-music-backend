import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType({ description: "Atrist model" })
export class CreateArtistInput {
  @Field(type => Int)
  owner_uid: number;

  @Field(type => String)
  @MaxLength(16)
  name: string;

  @Field(type => String)
  @MaxLength(16)
  surname: string;

  @Field(type => String, { nullable: true })
  @MaxLength(32)
  altname: string;

  @Field({ nullable: true })
  verify: string;

  @Field(type => Int)
  avatar_id: number;
}