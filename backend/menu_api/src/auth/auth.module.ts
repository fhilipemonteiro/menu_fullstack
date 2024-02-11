import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthService } from './services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: process.env.EXPIRE_JWT },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService],
})
export class AuthModule {}
