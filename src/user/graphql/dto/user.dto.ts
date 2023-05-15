import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserGender, UserRole } from './user-enums';

@ObjectType({ description: 'User' })
export class UserModel {
  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => UserGender, { nullable: true })
  gender: UserGender;

  @Field(() => Int, { nullable: true })
  birthday: number;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => UserRole, { nullable: true })
  role: UserRole;
}
