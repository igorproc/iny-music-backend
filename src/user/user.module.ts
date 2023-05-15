import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '@/user/auth/auth.module';
import { DeviceModule } from '@/device/device.module';
import { FileManagerModule } from '@/file-manager/file-manager.module';


@Module({
  imports: [PrismaModule, AuthModule, DeviceModule, FileManagerModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
