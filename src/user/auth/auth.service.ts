import { Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/prisma/prisma.service";
import { TAuthPayload, TAuthData } from './types/auth.types';
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ){}

  async signIn(signInData: TAuthPayload, request): Promise<TAuthData> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: signInData.email
        },
        select: {
          uid: true,
          password: true
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
