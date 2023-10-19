import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { v4 } from 'uuid'

import { NewDeviceInput } from '@/device/graphql/dto/create-device.dto'
import { Device } from '@prisma/client'
import { DeviceModel } from '@/device/graphql/dto/device.dto'
import { devicesPermission } from '@/device/graphql/dto/device.enum'

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async getDeviceByClientId(clientId: string): Promise<Device> {
    return await this.prisma.device.findUnique({
      where: {
        client_id: clientId,
      },
    })
  }

  async setUserDevice(deviceData: NewDeviceInput, ip: string): Promise<DeviceModel> {
    try {
      const userDevice = await this.prisma.device.create({
        data: {
          app_id: deviceData.appId,
          client_id: v4(),
          platform: deviceData.platform,
          permission: devicesPermission.ALLOW,
          ip,
          uid: null,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000),
        },
      })
      return { clientId: userDevice.client_id }
    } catch (error) {
      throw new HttpException('device is already write', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  async setUidIntoUserDevice(clientId: string, uid: number): Promise<boolean> {
    try {
      const deviceData = await this.prisma.device.update({
        where: {
          client_id: clientId,
        },
        data: {
          uid,
        },
      })
      return !!deviceData
    } catch {
      throw new HttpException('device is not found', HttpStatus.I_AM_A_TEAPOT)
    }
  }
}
