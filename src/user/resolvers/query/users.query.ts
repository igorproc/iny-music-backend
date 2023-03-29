import { Field, ID, ObjectType, Query, Resolver } from "type-graphql";
import { UserService } from '../../user.service'
import { User } from "@prisma/client";


@ObjectType()
export class Users {
  @Field(type => ID)
  readonly uid: number

  @Field()
  username: string

  @Field()
  password: string

  @Field()
  name: string

  @Field()
  surname: string

  @Field(type => String)
  platform: number
}

@Resolver(Users)
export class UsersResolver {
  constructor(private users: UserService){}

  @Query((returns) => [Users], { nullable: true })
  async getAllUesrs(): Promise<User[] | null> {
    return await this.users.getAllUsers()
  }
}