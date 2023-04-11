import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Device } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service"
import { NewDeviceInput } from "@/device/graphql/dto/create-device.dto";
@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService){}

  async setUserDevice(deviceData: NewDeviceInput, ip: string): Promise<Device> {
    try {
      return await this.prisma.device.create({
        data: {
          ...deviceData,
          permission: 'allow',
          ip,
          uid: null,
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        },
      })
    } catch(error) {
      throw new HttpException('device is already write', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  async setUidIntoUserDevice(clientId: string, uid: number): Promise<Device> {
    try {
      return await this.prisma.device.update({
        where: {
          client_id: clientId,
        },
        data: {
          uid
        }
      })
    } catch {
      throw new HttpException('device is not found', HttpStatus.I_AM_A_TEAPOT)
    }
  }
}
