import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, MaxLength } from "class-validator";
import { UserGender } from "./user-enums";

@InputType({ description: 'input for input user data' })
export class NewUserInput {
  @Field()
  @MaxLength(32)
  username?: string;

  @Field()
  @IsOptional()
  @MaxLength(256)
  password?: string;

  @Field()
  @MaxLength(16)
  name?: string;

  @Field()
  @MaxLength(16)
  surname?: string;

  @Field()
  gender?: UserGender;

  @Field()
  birthday?: number;

  @Field()
  @MaxLength(18)
  phone?: string;

  @Field()
  @MaxLength(320)
  email?: string;
}
