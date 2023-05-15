import { Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/prisma/prisma.service";
import { TAuthPayload } from './types/auth.types';
import { compareSync } from "bcrypt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ){}

  async signIn(signInData: TAuthPayload, request): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: signInData.email
        }
      })
      if(!compareSync(signInData.password, user.password)) {
        throw new UnauthorizedException()
      }
      const accessToken = await this.jwt.signAsync({ username: signInData.email, sub: user.uid })
      request?.res.cookie('Authorization', 'Bearer ' + accessToken)

      return user
    } catch {      
      throw new HttpException('wrong password or email', HttpStatus.NOT_FOUND)
    }
  }
}
