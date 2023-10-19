import { Field, Int, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
import { UserGender } from './user-enums'

@InputType({ description: 'input for input user data' })
export class RegisterUser {
  @Field(() => String)
  @MaxLength(320)
  email: string

  @Field(() => String)
  @MaxLength(256)
  password: string

  @Field(() => String)
  @MaxLength(16)
  name: string

  @Field(() => String)
  @MaxLength(16)
  surname: string

  @Field(() => String)
  gender: UserGender

  @Field(() => Int)
  birthday: number

  @Field(() => String)
  @MaxLength(18)
  phone: string
}
