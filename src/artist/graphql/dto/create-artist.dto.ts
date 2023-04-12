import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { FileUpload } from "@/dto/file-upload.dto";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"

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
  alt_name: string;

  @Field(type => GraphQLUpload, { nullable: true })
  avatarFile: FileUpload
}