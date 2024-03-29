import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { hashSync } from 'bcrypt'

import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from '@/user/auth/auth.service'
import { DeviceService } from '@/device/device.service'
import { FileManagerService } from '@/file-manager/file-manager.service'

import {
  UserModel,
  RegisterUser,
  UserLogin,
  UserLogout,
  UpdateUserAvatar,
  UpdateUserAvatarOutput,
} from '@/user/graphql/dto/user.dto'

import { UserGender, UserRole } from './graphql/dto/user-enums'

import { validateEmail } from '@utils/validate/email.util'
import { validatePhone } from '@utils/validate/phone.util'
import { SALT } from './const/user.const'
import { Request } from 'express'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly device: DeviceService,
    private readonly fileManager: FileManagerService,
  ) {}

  async getUserByUid(uid: number): Promise<UserModel> {
    try {
      let avatarUrl = null
      const userData = await this.prisma.user.findUniqueOrThrow({
        where: {
          uid: uid,
        },
      })

      if (userData.avatar_id) {
        avatarUrl = await this.fileManager.getFileManagerRecordById(userData.avatar_id)
      }

      return {
        uid: userData.uid,
        username: userData.username,
        gender: userData.gender,
        birthday: userData.birthday,
        phone: userData.phone,
        avatarUrl: avatarUrl?.path,
        email: userData.email,
        role: userData.role,
      }
    } catch {
      throw new HttpException('Пользовтеля с таким id не существет', HttpStatus.NOT_FOUND)
    }
  }

  async emailIsExsist(userEmail: string): Promise<string> {
    if (!validateEmail(userEmail)) {
      throw new HttpException('неверный формат email', HttpStatus.FOUND)
    }
    const emailData: { email: string } = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        email: true,
      },
      rejectOnNotFound: false,
    })
    return emailData ? emailData.email : ''
  }

  async phoneIsExsist(userPhone: string): Promise<string> {
    if (!validatePhone(userPhone)) {
      throw new HttpException('неверный формат телефона', HttpStatus.FOUND)
    }
    const phoneData: { phone: string } = await this.prisma.user.findUnique({
      where: {
        phone: userPhone,
      },
      select: {
        phone: true,
      },
      rejectOnNotFound: false,
    })
    return phoneData ? phoneData.phone : ''
  }

  async reiquredFieldsAreValidateAndUnique(userData: RegisterUser): Promise<boolean> {
    if (await this.emailIsExsist(userData.email)) {
      throw new HttpException('user with this email exists', HttpStatus.BAD_GATEWAY)
    }
    if (await this.phoneIsExsist(userData.phone)) {
      throw new HttpException('there is a user with this phone number', HttpStatus.BAD_GATEWAY)
    }
    return true
  }

  async createNewUser(userData: RegisterUser, clientId: string, request: Request): Promise<User> {
    try {
      await this.reiquredFieldsAreValidateAndUnique(userData)
      const userDevice = await this.device.getDeviceByClientId(clientId)
      if (!userDevice) {
        return
      }

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
          updated_at: Math.floor(Date.now() / 1000),
        },
      })

      const userIsSyncedWithClientId = await this.device.setUidIntoUserDevice(clientId, user.uid)
      const userIsSignIn = await this.auth.signIn({ email: userData.email, password: userData.password }, request)

      if (userIsSyncedWithClientId && userIsSignIn) {
        return user
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException("there's something wrong with data", HttpStatus.BAD_REQUEST)
      }
    }
  }

  async loginUser(loginData: UserLogin, request: Request): Promise<UserModel> {
    try {
      const userData = await this.auth.signIn(loginData, request)

      if (userData) {
        return await this.getUserByUid(userData.uid)
      }
    } catch (error) {
      throw new HttpException('Incorrect Login', HttpStatus.BAD_REQUEST)
    }
  }

  async updateUserAvatar(updateData: UpdateUserAvatar): Promise<UpdateUserAvatarOutput> {
    try {
      const uploadedFileData = await this.fileManager.createFileManagerRecord(updateData.avatarFile, updateData.userId)
      if (!uploadedFileData) {
        return
      }
      const updatedUserAvatar = await this.prisma.user.update({
        where: { uid: updateData.userId },
        data: { avatar_id: uploadedFileData.fmid },
      })
      if (!updatedUserAvatar) {
        return
      }
      return { avatarPath: uploadedFileData.path }
    } catch (error) {
      throw new HttpException('Invalid File', HttpStatus.OK)
    }
  }

  async logoutUser(logoutData: UserLogout, request: Request): Promise<boolean> {
    try {
      const response = request.res
      response.cookie('Authorization', '', { maxAge: 0 })

      return await this.device.removeUidFromUserDevice(logoutData.clientId, logoutData.uid)
    } catch (error) {
      throw new Error(error)
    }
  }
}
