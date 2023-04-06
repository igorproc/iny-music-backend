import { Injectable, UnauthorizedException, HttpException, HttpStatus, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/prisma/prisma.service";
import { TAuthPayload, TUserDataFromDatabase, TSignInToken } from './types/auth.types';
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ){}

  async signIn(signInData: TAuthPayload): Promise<TSignInToken> {
    try {
      const user: TUserDataFromDatabase = await this.prisma.user.findUnique({
        where: {
          email: signInData.email
        },
        select: {
          uid: true,
          password: true
        },
        rejectOnNotFound: false
      })
      if(!compareSync(signInData.password, user.password)) {
        throw new UnauthorizedException()
      }
      return {
        access_token: await this.jwt.signAsync({ username: signInData.email, sub: user.uid })
      }
    } catch {
      throw new HttpException('pizdec', HttpStatus.CONFLICT)
    }
  }
}
