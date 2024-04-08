import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
