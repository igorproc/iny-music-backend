import { Injectable } from "@nestjs/common"
import { User } from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service"
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async getAllUsers(): Promise<User[] | Error>  {
    const users = await this.prisma.user.findMany()
    if(!Array.isArray(users) || !users.length) {
      throw new Error('User not found')
    }
    return users
  }

  async getUserByUid(uid: number): Promise<User | Error> {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: uid
      }
    })
    if (!user) {
      throw new Error('User is not find')
    }
    return user
  }
}
