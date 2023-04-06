import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { hashSync } from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "@/auth/auth.service";
import { DeviceService } from "@/device/device.service";
import { validateEmail } from "@utils/validate/email.util";
import { validatePhone } from "@utils/validate/phone.util";
import { SALT } from "./const/user.const";
import { TAuthPayload } from "@/auth/types/auth.types";
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly device: DeviceService,
  ){}

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

  async usernameIsExsist(username: string): Promise<string> {
    const dbUsername: { username: string } = await this.prisma.user.findUnique({
      where: { username },
      select: { username: true },
      rejectOnNotFound: false
    })
    return dbUsername ? dbUsername.username : ''
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
    if(await this.usernameIsExsist(userData.username)) {
      throw new HttpException('пользователь с таким логином существет', HttpStatus.BAD_GATEWAY)
    }
    if(await this.emailIsExsist(userData.email)) {
      throw new HttpException('пользователь с таким email существует', HttpStatus.BAD_GATEWAY)
    }
    if(await this.phoneIsExsist(userData.phone)) {
      throw new HttpException('пользователь с таким номером телефона существет', HttpStatus.BAD_GATEWAY)
    }
    return true
  }

  async createNewUser(userData: User, clientId: string): Promise<User> {
    try {
      await this.reiquredFieldsAreValidateAndUnique(userData) 

      const expandedUserData = Object.assign({}, userData)
      delete expandedUserData.password

      const user = await this.prisma.user.create({
        data: {
          ...expandedUserData,
          password: hashSync(userData.password, SALT),
          role: 'user',
          platform: 'windows',
          blocking: 'none',
          avatar_id: 1,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })
      if(!await this.device.setUidIntoUserDevice(clientId, user.uid)) {
        throw new HttpException(
          'текущее утройство пользователя не задекларированно, пожалуйста перегзагрузите страницу',
          HttpStatus.BAD_GATEWAY
        )
      }
      await this.auth.signIn({ email: userData.email, password: userData.password })
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

  async loginUser(loginData: TAuthPayload): Promise<User> {
    try {
      const jwt = this.auth.signIn(loginData)
      if(!jwt) {
        throw new HttpException('wrong password or email', HttpStatus.NOT_FOUND)
      }
      return await this.prisma.user.findUnique({
        where: {
          email: loginData.email
        }
      })
    } catch {
      throw new HttpException('session Expried', HttpStatus.BAD_REQUEST)
    }
  }
}
