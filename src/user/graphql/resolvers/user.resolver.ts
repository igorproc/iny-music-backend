import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { UserModel } from '../dto/user.dto'
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { NewUserInput } from '../dto/create-user.dto';
import { UserLogin } from '../dto/login-user.dto';
import { TAuthPayload } from '@/auth/types/auth.types';

@Resolver (of => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService){}

  @Query(
    returns => UserModel,
    { description: 'Find User By uid' },
  )
  async getUserByUid(
      @Args('id', { type: () => Int }) id: number
    ): Promise<User | Error> {
    return await this.userService.getUserByUid(id)
  }

  @Mutation(
    returns => UserModel,
    { description: 'create a new user' }
  )
  async createNewUser(
    @Args('userData', { type: () => NewUserInput }) userData: User,
    @Args('clientId', { type: () => String }) clientId: string
  ): Promise<User> {
    return await this.userService.createNewUser(userData, clientId)
  }

  @Mutation(
    returns => UserModel,
    { description: 'login user' }
  )
  async loginUser(
    @Args('loginData', { type: () => UserLogin }) loginData: TAuthPayload
  ): Promise<User> {
    return await this.userService.loginUser(loginData)
  }
}
