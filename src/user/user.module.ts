import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { DeviceModule } from '@/device/device.module';

@Module({
  imports: [PrismaModule, AuthModule, DeviceModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
