import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { UserModel } from '../models/user.model'
import { Resolver, Query, Args, Int } from '@nestjs/graphql';

@Resolver (of => UserModel)
export class UserResolver {
  constructor(
    private userService: UserService
  ){}

  @Query(
    returns => UserModel,
    { description: 'Find User By uid' },
  )
  async getUserByUid(
      @Args('id', { type: () => Int }) id: number
    ): Promise<User | Error> {
    const user = await this.userService.getUserByUid(id)
    return user
  }
}
