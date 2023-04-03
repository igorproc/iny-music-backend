import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Device } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { NewDeviceInput } from "./graphql/dto/create-device.dto"
@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService){}

  async getDeviceByCliendId(clientId: string): Promise<Device> {
    try {
      return await this.prisma.device.findUnique({
        where: {
          client_id: clientId
        }
      })
    } catch {
      throw new HttpException('Device is not found', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  async setUserDevice(deviceData: NewDeviceInput, ip: string): Promise<Device> {
    try {
      return await this.prisma.device.create({
        data: {
          ...deviceData,
          permission: 'allow',
          ip,
          uid: Number(process.env.TEMP_ID),
          created_at: Math.floor(Date.now() / 1000),
          updated_at: Math.floor(Date.now() / 1000)
        }
      })
    } catch(error) {
      console.log(error)
      throw new HttpException('device is already write', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  async setUidIntoUserDevice(clientId: string, uid: number): Promise<Device> {
    try {
      return await this.prisma.device.update({
        where: {
          client_id: clientId
        },
        data: {
          uid
        }
      })
    } catch(error) {
      throw new HttpException('device is not found', HttpStatus.I_AM_A_TEAPOT)
    }
  }
}
