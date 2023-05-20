import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { UserService } from "@/user/user.service"
import { User } from '@prisma/client';
import { UserModel } from "@/user/graphql/dto/user.dto";
import { RegisterUser } from "@/user/graphql/dto/create-user.dto";
import { UserLogin } from "@/user/graphql/dto/login-user.dto";
import { TAuthPayload } from '@/user/auth/types/auth.types';
import { Public } from '@/decorators/isPublic.decorator';

@Resolver (() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService){}

  @Query(
    () => UserModel,
    { description: 'Find User By uid' },
  )
  async getUserByUid(
      @Args('id', { type: () => Int }) id: number
    ): Promise<UserModel> {
    return await this.userService.getUserByUid(id)
  }

  @Public()
  @Mutation(
    () => UserModel,
    { description: 'create a new user', nullable: true }
  )
  async createUser(
    @Args('userData', { type: () => RegisterUser }) userData: RegisterUser,
    @Args('clientId', { type: () => String }) clientId: string,
    @Context("req") req,
  ): Promise<User> {
    return await this.userService.createNewUser(userData, clientId, req)
  }

  @Public()
  @Mutation(
    () => UserModel,
    { description: 'login user', nullable: true }
  )
  async loginUser(
    @Args('loginData', { type: () => UserLogin }) loginData: TAuthPayload,
    @Context("req") req,
  ): Promise<UserModel> {
    return await this.userService.loginUser(loginData, req)
  }
}
