import { Field, InputType, Int } from "@nestjs/graphql";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"
import { FileUpload } from "@/dto/file-upload.dto";

@InputType("NewSongFragment")
export class NewSongFragment {
  @Field(() => Int)
  aid: number;

  @Field(() => [Int], { nullable: true })
  featsIds: number[];

  @Field(() => [Int])
  genresIds: number[];

  @Field(() => Int)
  ownerUid: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  subtitle: string;

  @Field(() => Boolean)
  explicit: boolean;

  @Field(() => Int)
  duration: number;

  @Field(() => GraphQLUpload, { nullable: true })
  songFile: FileUpload;
}