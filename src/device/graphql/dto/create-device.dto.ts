import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
@InputType({ description: 'device data input' })
export class NewDeviceInput {
  @Field(() => Int)
  appId: number

  @Field(() => String)
  @MaxLength(128)
  platform: string
}
