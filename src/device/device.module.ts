import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DeviceService } from './device.service'
import { DeviceResolver } from '@/device/graphql/resolvers/device.resolver'

@Module({
  imports: [PrismaModule],
  providers: [DeviceService, DeviceResolver],
  exports: [DeviceService],
})
export class DeviceModule {}
