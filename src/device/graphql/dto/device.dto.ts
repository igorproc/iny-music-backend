import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Device' })
export class DeviceModel {
  @Field(() => String, { nullable: true })
  clientId: string
}
