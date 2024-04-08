import { AuthService } from './auth.service';
import { DynamicModule } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

describe('Auth Service', () => {
  let service: AuthService;
  const UsersModuleTest: DynamicModule = {
    module: UsersModule,
    providers: [UsersService],
    exports: [UsersService],
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModuleTest, JwtModule.register({ secret: 'secret' })],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it(`Should be defined`, () => {
    expect(service).toBeDefined();
  });

  it('User login', async () => {
    const res = await service.login({ email: 'john@email.com' });
    expect(res).toBeDefined();
    expect(res.accessToken).toBeDefined();
  });
});
