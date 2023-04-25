import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserGender, UserBlocking, UserRole } from './user-enums';

@ObjectType({ description: 'User' })
export class UserModel {
  @Field(() => ID)
  readonly uid: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => String)
  platform: string;

  @Field(() => String)
  gender: UserGender;

  @Field(() => Int)
  birthday: number;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: UserRole;

  @Field(() => Int)
  avatar_id: number;

  @Field(() => Int)
  updated_at: number;

  @Field(() => Int)
  created_at: number;
}
