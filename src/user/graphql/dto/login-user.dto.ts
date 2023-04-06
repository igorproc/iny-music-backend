import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType({ description: 'input for input user data' })
export class UserLogin {
  @Field()
  @MaxLength(32)
  username?: string;

  @Field()
  @MaxLength(256)
  password: string
}
