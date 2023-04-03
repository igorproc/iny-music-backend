import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { devicesPermission } from "./device.enum";

@InputType({ description: 'input for input user data' })
export class NewDeviceInput {
  @Field()
  app_id: number;

  @Field()
  @MaxLength(36)
  client_id: string;

  @Field()
  @MaxLength(128)
  platform: string;
}
