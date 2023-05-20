import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { FileUpload } from "@/dto/file-upload.dto";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"

@InputType({ description: "Atrist model" })
export class CreateArtistInput {
  @Field(() => Int)
  ownerUid: number;

  @Field(() => String)
  @MaxLength(16)
  name: string;

  @Field(() => String)
  @MaxLength(16)
  surname: string;

  @Field(() => String, { nullable: true })
  @MaxLength(32)
  altName: string;

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile: FileUpload
}