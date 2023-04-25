import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { UserGender } from "./user-enums";

@InputType({ description: 'input for input user data' })
export class NewUserInput {
  @Field(() => String)
  @MaxLength(32)
  username: string;

  @Field(() => String)
  @MaxLength(256)
  password: string;

  @Field(() => String)
  @MaxLength(16)
  name: string;

  @Field(() => String)
  @MaxLength(16)
  surname: string;

  @Field(() => String)
  gender: UserGender;

  @Field(() => String)
  birthday: number;

  @Field(() => String)
  @MaxLength(18)
  phone: string;

  @Field(() => String)
  @MaxLength(320)
  email: string;
}
