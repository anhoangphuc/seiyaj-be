import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, JwtModule.register({ secretOrPrivateKey: 'secret' })],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
