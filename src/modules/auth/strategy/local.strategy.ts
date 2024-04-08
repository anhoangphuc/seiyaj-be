import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PublicUserInfoResponseDto } from '../../users/dto/public-user-info.response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<PublicUserInfoResponseDto> {
    const user = await this.authService.validateUserWithEmailAndPassword(email, password);
    if (!user) throw new Error(`Username and password not correct`);
    return { email };
  }
}
