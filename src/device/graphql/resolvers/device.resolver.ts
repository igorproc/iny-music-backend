import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { DeviceService } from "@/device/device.service"
import { NewDeviceInput } from "@/device/graphql/dto/create-device.dto"
import IpAddress from "@/decorators/ipAddress.decorator"
import Public from "@/decorators/isPublic.decorator"

@Resolver(() => String)
export class DeviceResolver {
  constructor(private deviceService: DeviceService){}

  @Public()
  @Mutation(
    () => String,
    { description: 'Declarate a new device', nullable: true }
  )
  async createUserDevice(
      @Args('deviceData', { type: () => NewDeviceInput })
      deviceData: NewDeviceInput,
      @IpAddress() ip: string,
    ): Promise<string> {
      return await this.deviceService.setUserDevice(deviceData, ip)
  }
}
