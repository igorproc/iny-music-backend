import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET_KEY } from "@/auth/const/auth.const";
import { PrismaModule } from "@/prisma/prisma.module";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '3 days' },
    }),
    PrismaModule,
    JwtModule,
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService]
})
export class AuthModule {}
