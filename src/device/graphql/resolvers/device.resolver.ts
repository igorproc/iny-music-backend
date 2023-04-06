import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { DeviceModel } from "@/device/graphql/dto/device.dto";
import { DeviceService } from "@/device/device.service";
import { NewDeviceInput } from "@/device/graphql/dto/create-device.dto";
import { IpAddress } from "@decorators/IpAddress.decorator";
import { Public } from "@/decorators/isPublic.decorator";

@Resolver(of => DeviceModel)
export class DeviceResolver {
  constructor(private deviceService: DeviceService){}

  @Public()
  @Mutation(
    returns => DeviceModel,
    { description: 'Declarate a new device' }
  )
  async createUserDevice(
      @Args('NewDeviceInput', { type: () => NewDeviceInput })
      deviceData: NewDeviceInput,
      @IpAddress() ip: string,
    ): Promise<DeviceModel> {
      return await this.deviceService.setUserDevice(deviceData, ip)
  }
}
