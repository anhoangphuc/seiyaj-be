import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUserWithEmailAndPassword(email: string, password: string) {
    return await this.usersService.getUserByEmailAndPassword(email, password);
  }
}
