import { Controller, Get } from "@nestjs/common"
import { UserService } from "./user.service"
import * as UserResolvers from "@generated/type-graphql"

@Controller('/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getAllUsers() {
    return this.UserService.getAllUsers()
  }
}
