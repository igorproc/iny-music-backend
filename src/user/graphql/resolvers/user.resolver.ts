import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql'
import { Request } from 'express'

import { User } from '@prisma/client'
import { UserService } from '@/user/user.service'
import Public from '@/decorators/isPublic.decorator'

import {
  UserModel,
  UserLogout,
  UpdateUserAvatar,
  UpdateUserAvatarOutput,
  UserLogin,
  RegisterUser,
} from '@/user/graphql/dto/user.dto'
import { TAuthPayload } from '@/user/auth/types/auth.types'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { description: 'Find User By uid' })
  async getUserByUid(@Args('id', { type: () => Int }) id: number): Promise<UserModel> {
    return await this.userService.getUserByUid(id)
  }

  @Public()
  @Mutation(() => UserModel, {
    description: 'create a new user',
    nullable: true,
  })
  async createUser(
    @Args('userData', { type: () => RegisterUser }) userData: RegisterUser,
    @Args('clientId', { type: () => String }) clientId: string,
    @Context('req') req: Request,
  ): Promise<User> {
    return await this.userService.createNewUser(userData, clientId, req)
  }

  @Public()
  @Mutation(() => UserModel, { description: 'login user' })
  async loginUser(
    @Args('loginData', { type: () => UserLogin }) loginData: TAuthPayload,
    @Context('req') req: Request,
  ): Promise<UserModel> {
    return await this.userService.loginUser(loginData, req)
  }

  @Mutation(() => Boolean, { description: 'logout user' })
  async logoutUser(
    @Args('logoutData', { type: () => UserLogout }) logoutData: UserLogout,
    @Context('req') req: Request,
  ): Promise<boolean> {
    return await this.userService.logoutUser(logoutData, req)
  }

  @Mutation(() => UpdateUserAvatarOutput, { description: 'Update user avatar' })
  async updateUserAvatar(
    @Args('updateAvatarData', { type: () => UpdateUserAvatar }) updateData: UpdateUserAvatar,
  ): Promise<UpdateUserAvatarOutput> {
    return await this.userService.updateUserAvatar(updateData)
  }
}
