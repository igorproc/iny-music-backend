import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { PrismaService } from '@/prisma/prisma.service'
import { TAuthPayload, TAuthData } from './types/auth.types'
import { COOKIE_MAX_AGE } from '@/types/cookie'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async signIn(signInData: TAuthPayload, request): Promise<TAuthData> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: signInData.email,
        },
        select: {
          uid: true,
          password: true,
        },
      })
      if (!compareSync(signInData.password, user.password)) {
        throw new UnauthorizedException()
      }
      const accessToken = await this.jwt.signAsync({ username: signInData.email, sub: user.uid })
      const response = request.res
      response.cookie('Authorization', 'Bearer ' + accessToken, { maxAge: COOKIE_MAX_AGE * 1000 })
      return user
    } catch {
      throw new HttpException('wrong password or email', HttpStatus.NOT_FOUND)
    }
  }
}
