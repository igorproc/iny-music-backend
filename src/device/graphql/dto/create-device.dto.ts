import { Field, InputType, Int } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
@InputType({ description: 'device data input' })
export class NewDeviceInput {
  @Field(() => Int)
  app_id: number;

  @Field(() => String)
  @MaxLength(36)
  client_id: string;

  @Field(() => String)
  @MaxLength(128)
  platform: string;
}
