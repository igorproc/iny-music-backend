import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DeviceService } from '@/device/device.service'
import { NewDeviceInput } from '@/device/graphql/dto/create-device.dto'
import IpAddress from '@/decorators/ipAddress.decorator'
import Public from '@/decorators/isPublic.decorator'
import { DeviceModel } from '@/device/graphql/dto/device.dto'

@Resolver(() => String)
export class DeviceResolver {
  constructor(private deviceService: DeviceService) {}

  @Public()
  @Mutation(() => DeviceModel, {
    description: 'Declarate a new device',
    nullable: true,
  })
  async createUserDevice(
    @Args('deviceData', { type: () => NewDeviceInput })
    deviceData: NewDeviceInput,
    @IpAddress() ip: string,
  ): Promise<DeviceModel> {
    return await this.deviceService.setUserDevice(deviceData, ip)
  }
}
