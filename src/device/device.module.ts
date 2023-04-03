import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DeviceService } from './device.service'
import { DeviceResolver } from './graphql/resolvers/device.resolver';

@Module({
  imports: [PrismaModule],
  providers: [DeviceService, DeviceResolver],
})
export class DeviceModule {}
