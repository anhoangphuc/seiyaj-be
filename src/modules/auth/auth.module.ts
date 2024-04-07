import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
