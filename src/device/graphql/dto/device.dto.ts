import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class DeviceModel {
  @Field(() => String, { nullable: true })
  clientId: string;
}
