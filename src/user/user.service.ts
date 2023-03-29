import { Injectable } from "@nestjs/common"
import { PrismaClient, User } from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service"
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async getAllUsers(): Promise<User[] | null>  {
    const client = new PrismaClient()
    await client.$connect()
    return await client.user.findMany()
  }
}
