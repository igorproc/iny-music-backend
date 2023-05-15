import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { hashSync } from "bcrypt";
import RandExp from "randexp";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "@/user/auth/auth.service";
import { DeviceService } from "@/device/device.service";
import { FileManagerService } from '@/file-manager/file-manager.service';
import { UserModel } from '@/user/graphql/dto/user.dto';
import { RegisterUser } from '@/user/graphql/dto/create-user.dto';
import { UserLogin } from '@/user/graphql/dto/login-user.dto';
import { UserGender, UserRole } from './graphql/dto/user-enums';
import { Prisma, User } from "@prisma/client";
import { validateEmail } from "@utils/validate/email.util";
import { validatePhone } from "@utils/validate/phone.util";
import { SALT } from "./const/user.const";
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly device: DeviceService,
    private readonly fileManager: FileManagerService,
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

  async reiquredFieldsAreValidateAndUnique(userData: RegisterUser): Promise<boolean> {
    if(await this.emailIsExsist(userData.email)) {
      throw new HttpException('пользователь с таким email существует', HttpStatus.BAD_GATEWAY)
    }
    if(await this.phoneIsExsist(userData.phone)) {
      throw new HttpException('пользователь с таким номером телефона существет', HttpStatus.BAD_GATEWAY)
    }
    return true
  }

  async createNewUser(userData: RegisterUser, clientId: string, request): Promise<User> {
    try {
      await this.reiquredFieldsAreValidateAndUnique(userData)
      const userDevice = await this.device.getDeviceByClientId(clientId)

      const user = await this.prisma.user.create({
        data: {
          username: userData.email,
          password: hashSync(userData.password, SALT),
          name: userData.name,
          surname: userData.surname,
          gender: UserGender[userData.gender],
          birthday: userData.birthday,
          phone: userData.phone,
          email: userData.email,
          role: UserRole.user,
          platform: userDevice.client_id,
          blocking: 'none',
          avatar_id: null,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })

      await this.device.setUidIntoUserDevice(clientId, user.uid)
      await this.auth.signIn({ email: userData.email, password: userData.password }, request)

      return user
    } catch(error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException('что-то не так с данными', HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  async loginUser(loginData: UserLogin, request): Promise<UserModel> {
    try {
      const userData = await this.auth.signIn(loginData, request)
      let avatarUrl = null
      if(userData.avatar_id) {
        avatarUrl = this.fileManager.getFileManagerRecordById(userData.avatar_id)
      }
      return {
        username: userData.username,
        gender: UserGender[userData.gender],
        birthday: userData.birthday,
        phone: userData.phone,
        avatarUrl: avatarUrl.path,
        email: userData.email,
        role: UserRole[userData.role]
      }
    } catch {

    }
  }
}
