import { Field, Int, ObjectType, InputType, ID } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

import { UserGender, UserRole } from '@/user/graphql/dto/user-enums'
import { FileUpload } from '@/dto/file-upload.dto'

// LOGIN USER INPUT
@InputType({ description: 'input for login user' })
export class UserLogin {
  @Field(() => String)
  @MaxLength(32)
  email: string

  @Field(() => String)
  @MaxLength(256)
  password: string
}

// REGISTER USER INPUT
@InputType({ description: 'input for register user' })
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

// LOGOUT USER INPUT
@InputType({ description: 'input for logout user' })
export class UserLogout {
  @Field(() => Int)
  @MaxLength(32)
  uid: number

  @Field(() => String)
  @MaxLength(256)
  clientId: string
}

// UPDATE USER AVATAR INPUT
@InputType({ description: 'Data for update a avatar file' })
export class UpdateUserAvatar {
  @Field(() => Int)
  userId: number

  @Field(() => GraphQLUpload)
  avatarFile: FileUpload
}

// UPDATE USER AVATAR OUTPUT
@ObjectType({ description: 'Response for update avatar' })
export class UpdateUserAvatarOutput {
  @Field(() => String)
  avatarPath: string
}

//USER MODEL
@ObjectType({ description: 'User' })
export class UserModel {
  @Field(() => ID, { nullable: true })
  uid: number

  @Field(() => String, { nullable: true })
  username: string

  @Field(() => UserGender, { nullable: true })
  gender: string

  @Field(() => Int, { nullable: true })
  birthday: number

  @Field(() => String, { nullable: true })
  phone: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string

  @Field(() => String, { nullable: true })
  email: string

  @Field(() => UserRole, { nullable: true })
  role: string
}
