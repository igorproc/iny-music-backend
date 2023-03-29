import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersResolver } from './resolvers/query/users.query';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersResolver, UserService, PrismaService],
})
export class UserModule {}
