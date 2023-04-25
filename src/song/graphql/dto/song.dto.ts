import { Field, ID, Int, ObjectType } from "@nestjs/graphql";


@ObjectType("Song")
export class SongModel {
  @Field(() => ID)
  sid: number;

  @Field(() => String, { nullable: true })
  fileUrl: string;

  @Field(() => Int)
  aid: number;

  @Field(() => Int, { nullable: true })
  fid: number;

  @Field(() => Int, { nullable: true })
  gsid: number

  @Field(() => Int)
  owner_uid: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => Boolean)
  explicit: boolean;

  @Field(() => Int)
  duration: number;

  @Field(() => Int, { nullable: true })
  updated_at: number;

  @Field(() => Int, { nullable: true })
  created_at: number;
}