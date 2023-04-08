import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class DeviceModel {
  @Field(type => ID)
  readonly id: number;

  @Field(type => Int)
  app_id: number;

  @Field(type => String, { nullable: true })
  client_id: string;

  @Field(type => Int, { nullable: true })
  uid: number;

  @Field(type => String)
  ip: string;

  @Field(type => String)
  platform: string;

  @Field(type => String)
  permission: string;

  @Field(type => Int)
  updated_at: number;

  @Field(type => Int)
  created_at: number;
}
