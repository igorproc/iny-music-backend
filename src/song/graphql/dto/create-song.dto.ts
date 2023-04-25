import { Field, InputType, Int } from "@nestjs/graphql";
import { FileUpload } from "@/dto/file-upload.dto";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"

@InputType("CreateSongInput")
export class CreateSongInput {
  @Field(() => Int)
  aid: number;

  @Field(() => [String], { nullable: true })
  featsNames: string[];

  @Field(() => [Int])
  genresIds: number[];

  @Field(() => Int)
  ownerUid: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => Boolean)
  explicit: boolean;

  @Field(() => Int)
  duration: number;

  @Field(() => GraphQLUpload, { nullable: true })
  song: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  largeImg: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  smallImg: FileUpload;
}