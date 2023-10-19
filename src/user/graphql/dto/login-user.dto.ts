import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType({ description: 'input for input user data' })
export class UserLogin {
  @Field(() => String)
  @MaxLength(32)
  email: string

  @Field(() => String)
  @MaxLength(256)
  password: string
}
