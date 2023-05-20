import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ArtsistModelForSong } from "./atrist-output.dto";
import { FeatModelForSong } from "./feat-output.dto";

@ObjectType("SongDataFragment")
export class SongDataFragment {
  @Field(() => ArtsistModelForSong, { nullable: true })
  artist: ArtsistModelForSong;

  @Field(() => [String], { nullable: true })
  genres: string[];

  @Field(() => [FeatModelForSong], { nullable: true })
  feats: FeatModelForSong[];

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  subtitle: string;

  @Field(() => Boolean, { nullable: true })
  explicit: boolean;

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => String, { nullable: true })
  songUrl: string;
}