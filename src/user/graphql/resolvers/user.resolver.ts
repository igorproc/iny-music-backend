import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { UserService } from "@/user/user.service"
import { User } from '@prisma/client';
import { UserModel } from "@/user/graphql/dto/user.dto";
import { NewUserInput } from "@/user/graphql/dto/create-user.dto";
import { UserLogin } from "@/user/graphql/dto/login-user.dto";
import { TAuthPayload } from '@/auth/types/auth.types';
import { Public } from '@/decorators/isPublic.decorator';
import { AuthService } from '@/auth/auth.service';

@Resolver (of => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly authService: AuthService){}

  @Query(
    returns => UserModel,
    { description: 'Find User By uid' },
  )
  async getUserByUid(
      @Args('id', { type: () => Int }) id: number
    ): Promise<User | Error> {
    return await this.userService.getUserByUid(id)
  }

  @Public()
  @Mutation(
    returns => UserModel,
    { description: 'create a new user' }
  )
  async createNewUser(
    @Args('userData', { type: () => NewUserInput }) userData: User,
    @Args('clientId', { type: () => String }) clientId: string,
    @Context("req") req,
  ): Promise<User> {
    return await this.userService.createNewUser(userData, clientId, req)
  }

  @Public()
  @Mutation(
    returns => UserModel,
    { description: 'login user' }
  )
  async loginUser(
    @Args('loginData', { type: () => UserLogin }) loginData: TAuthPayload,
    @Context("req") req,
  ): Promise<User> {
    return await this.authService.signIn(loginData, req)
  }
}
