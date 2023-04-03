import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeviceModel } from '../dto/device.dto';
import { DeviceService } from 'src/device/device.service';
import { NewDeviceInput } from '../dto/create-device.dto';
import { IpAddress } from 'src/decorators/ipAddress';

@Resolver(of => DeviceModel)
export class DeviceResolver {
  constructor(private deviceService: DeviceService){}

  @Query(
    returns => [DeviceModel],
    { description: 'returns devicesList' }
  )
  async getDeviceByClientId(
      @Args('clientId', { type: () => String })
      clientId: string
    ): Promise<DeviceModel> {
    return await this.deviceService.getDeviceByCliendId(clientId)
  }

  @Mutation(
    returns => DeviceModel,
    { description: 'Declarate a new device' }
  )
  async createUserDevice(
      @Args('NewDeviceInput', { type: () => NewDeviceInput })
      deviceData: NewDeviceInput,
      @IpAddress() ip,
    ): Promise<DeviceModel> {
      return await this.deviceService.setUserDevice(deviceData, ip)
  }

  @Mutation(
    returns => DeviceModel,
    { description: 'Pair User with device' }
  )
  async setUidIntoUserDevice(
    @Args('clientId', { type: () => String }) clientId: string,
    @Args('uid', { type: () => Int }) uid: number
  ): Promise<DeviceModel> {
    return await this.deviceService.setUidIntoUserDevice(clientId, uid)
  }
}
