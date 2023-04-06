import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserGender, UserBlocking, UserRole } from './user-enums';

@ObjectType({ description: 'User' })
export class UserModel {
  @Field(type => ID)
  readonly uid: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  platform: string;

  @Field()
  gender: UserGender;

  @Field()
  birthday: number;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  role: UserRole;

  @Field()
  avatar_id: number;

  @Field()
  updated_at: number;

  @Field()
  created_at: number;
}
