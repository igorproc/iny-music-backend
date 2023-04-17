import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class DeviceModel {
  @Field(() => ID)
  readonly id: number;

  @Field(() => Int)
  app_id: number;

  @Field(() => String, { nullable: true })
  client_id: string;

  @Field(() => Int, { nullable: true })
  uid: number;

  @Field(() => String)
  ip: string;

  @Field(() => String)
  platform: string;

  @Field(() => String)
  permission: string;

  @Field(() => Int)
  updated_at: number;

  @Field(() => Int)
  created_at: number;
}
