import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PublicUserInfoResponseDto } from '../users/dto/public-user-info.response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserWithEmailAndPassword(email: string, password: string) {
    return await this.usersService.getUserByEmailAndPassword(email, password);
  }

  async login(user: PublicUserInfoResponseDto) {
    const payload = { email: user.email };
    console.log('PAYLOAD ', payload);
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerRequest: RegisterRequestDto) {
    return await this.usersService.addNewUser(registerRequest);
  }
}
