import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Prisma, User } from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service"
import { validateEmail } from "src/utils/validate/email"
import { validatePhone } from "src/utils/validate/phone"
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async getUserByUid(uid: number): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          uid: uid
        }
      })
    } catch {
      throw new HttpException('Пользовтеля с таким id не существет', HttpStatus.NOT_FOUND)
    }
  }

  async emailIsExsist(userEmail: string): Promise<string> {
    if(!validateEmail(userEmail)) {
      throw new HttpException('неверный формат email', HttpStatus.FOUND)
    }
    const emailData: { email: string } = await this.prisma.user.findUnique({
      where: {
        email: userEmail
      },
      select: {
        email: true
      },
      rejectOnNotFound: false
    })
    return emailData ? emailData.email : ''
  }

  async phoneIsExsist(userPhone: string): Promise<string> {
    if(!validatePhone(userPhone)) {
      throw new HttpException('неверный формат телефона', HttpStatus.FOUND)
    }
    const phoneData: { phone: string } = await this.prisma.user.findUnique({
      where: {
        phone: userPhone
      },
      select: {
        phone: true
      },
      rejectOnNotFound: false
    })
    return phoneData ? phoneData.phone : ''
  }

  async reiquredFieldsAreValidateAndUnique(userData: User): Promise<boolean> {
    if(await this.emailIsExsist(userData.email)) {
      throw new HttpException('пользователь с таким email существует', HttpStatus.OK)
    }
    if(await this.phoneIsExsist(userData.phone)) {
      throw new HttpException('пользователь с таким номером телефона существет', HttpStatus.OK)
    }
    return true
  }

  async createNewUser(userData: User): Promise<User | Error> {
    try {
      this.reiquredFieldsAreValidateAndUnique(userData)
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          role: 'user',
          blocking: 'none',
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })
      return user
    } catch(error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('что-то не так с данными', HttpStatus.BAD_REQUEST)
        }
      }
      throw error
    }
  }
}
