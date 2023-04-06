import { Field, ID, ObjectType } from '@nestjs/graphql';
import { devicesPermission } from './device.enum';

@ObjectType({ description: 'User' })
export class DeviceModel {
  @Field(type => ID)
  readonly id: number;

  @Field()
  app_id: number;

  @Field({ nullable: true })
  client_id: string;

  @Field()
  uid: number;

  @Field()
  ip: string;

  @Field()
  platform: string;

  @Field()
  permission: string;

  @Field()
  updated_at: number;

  @Field()
  created_at: number;
}
