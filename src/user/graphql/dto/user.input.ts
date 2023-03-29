import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class newUserInput {
  @Field()
  @MaxLength(32)
  username: string;

  @Field()
  @MaxLength(256)
  password: string;

  @Field()
  @MaxLength(16)
  name: string;

  @Field()
  @MaxLength(16)
  surname: string;

  @Field()
  @MaxLength(128)
  platform: string;

  @Field()
  gender: string;

  @Field()
  birthday: string;

  @Field()
  @MaxLength(18)
  phone: string;

  @Field()
  @MaxLength(320)
  email: string;

  @Field()
  role: string

  @Field()
  blocking: string
  
  @Field()
  avatar_id: number
}