import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
@InputType({ description: 'input for input user data' })
export class NewDeviceInput {
  @Field(type => Int)
  app_id: number;

  @Field(type => String)
  @MaxLength(36)
  client_id: string;

  @Field(type => String)
  @MaxLength(128)
  platform: string;
}
